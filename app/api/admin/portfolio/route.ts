import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Portfolio from "@/config/utils/admin/portfolio/portfolioSchema";
import { uploadToCloudinary } from "@/config/utils/cloudinary";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// Helper function to verify admin token
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "Authorization header required" },
        { status: 401 }
      ),
    };
  }
  if (!process.env.JWT_SECRET) {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "JWT_SECRET not configured" },
        { status: 500 }
      ),
    };
  }
  try {
    const token = authHeader.substring(7);
    jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    return { ok: true as const };
  } catch {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      ),
    };
  }
}

// Helper function to generate slug
function generateSlug(projectName: string): string {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""); // Remove leading/trailing dashes
}

// GET - Fetch all portfolio projects with pagination
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const query: any = { isDeleted: false };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [portfolios, total] = await Promise.all([
      Portfolio.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Portfolio.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: portfolios,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio projects" },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio project
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const formData = await request.formData();
    const projectName = formData.get("projectName") as string;
    const client = formData.get("client") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const serviceType = formData.get("serviceType") as string;
    const projectArea = formData.get("projectArea") as string;
    const completionDate = formData.get("completionDate") as string;
    const duration = formData.get("duration") as string;
    const budget = formData.get("budget") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const order = Number.parseInt(formData.get("order") as string) || 0;
    const features = JSON.parse(formData.get("features") as string || "[]");
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;
    const imageFile = formData.get("image") as File | null;
    const galleryFiles = formData.getAll("galleryImages") as File[];

    // Validate required fields
    if (!projectName || !description) {
      return NextResponse.json(
        { success: false, message: "Project name and description are required" },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Project image is required" },
        { status: 400 }
      );
    }

    // Check if order already exists
    const existingOrder = await Portfolio.findOne({ order, isDeleted: false });
    if (existingOrder) {
      return NextResponse.json(
        { success: false, message: `A portfolio project with order ${order} already exists` },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(projectName);

    // Check if slug already exists
    const existingProject = await Portfolio.findOne({ slug, isDeleted: false });
    if (existingProject) {
      return NextResponse.json(
        { success: false, message: "A portfolio project with this name already exists" },
        { status: 400 }
      );
    }

    // Upload image
    const imageBytes = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageResult = await uploadToCloudinary(
      imageBuffer,
      `portfolio/${slug}/main`
    );

    // Upload gallery images
    const galleryUrls: string[] = [];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await uploadToCloudinary(
            buffer,
            `portfolio/${slug}/gallery-${i + 1}`
          );
          galleryUrls.push(result.secure_url);
        }
      }
    }

    // Create portfolio project
    const portfolio = new Portfolio({
      projectName,
      client,
      location,
      category,
      serviceType,
      projectArea,
      completionDate,
      duration,
      budget,
      shortDescription,
      description,
      image: imageResult.secure_url,
      gallery: galleryUrls,
      features,
      slug,
      status,
      order,
      seoTitle,
      seoDescription,
      seoKeywords,
    });

    await portfolio.save();

    return NextResponse.json({
      success: true,
      data: portfolio,
      message: "Portfolio project created successfully",
    });
  } catch (error: any) {
    console.error("Error creating portfolio project:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create portfolio project",
      },
      { status: 500 }
    );
  }
}
