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
    .replace(/(^-|-$)/g, "");
}

// PUT - Update portfolio project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();
    const { id } = await params;

    const portfolio = await Portfolio.findOne({ _id: id, isDeleted: false });
    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio project not found" },
        { status: 404 }
      );
    }

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
    const existingImage = formData.get("existingImage") as string;
    const galleryFiles = formData.getAll("galleryImages") as File[];
    
    // Get existing gallery URLs from form data
    const existingGallery: string[] = [];
    let index = 0;
    while (formData.has(`existingGallery[${index}]`)) {
      const url = formData.get(`existingGallery[${index}]`) as string;
      if (url) existingGallery.push(url);
      index++;
    }

    // Validate required fields
    if (!projectName || !description) {
      return NextResponse.json(
        { success: false, message: "Project name and description are required" },
        { status: 400 }
      );
    }

    // Check if order already exists (excluding current item)
    const existingOrder = await Portfolio.findOne({
      order,
      _id: { $ne: id },
      isDeleted: false
    });
    if (existingOrder) {
      return NextResponse.json(
        { success: false, message: `A portfolio project with order ${order} already exists` },
        { status: 400 }
      );
    }

    // Generate new slug if project name changed
    const newSlug = generateSlug(projectName);
    if (newSlug !== portfolio.slug) {
      const existingProject = await Portfolio.findOne({
        slug: newSlug,
        _id: { $ne: id },
        isDeleted: false,
      });
      if (existingProject) {
        return NextResponse.json(
          { success: false, message: "A portfolio project with this name already exists" },
          { status: 400 }
        );
      }
    }

    // Handle image upload
    let imageUrl = existingImage || portfolio.image;
    if (imageFile && imageFile.size > 0) {
      const imageBytes = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imageResult = await uploadToCloudinary(
        imageBuffer,
        `portfolio/${newSlug}/main`
      );
      imageUrl = imageResult.secure_url;
    }

    // Handle gallery images
    const galleryUrls: string[] = [...existingGallery];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await uploadToCloudinary(
            buffer,
            `portfolio/${newSlug}/gallery-${Date.now()}-${i + 1}`
          );
          galleryUrls.push(result.secure_url);
        }
      }
    }

    // Update portfolio project
    portfolio.projectName = projectName;
    portfolio.client = client;
    portfolio.location = location;
    portfolio.category = category;
    portfolio.serviceType = serviceType;
    portfolio.projectArea = projectArea;
    portfolio.completionDate = completionDate;
    portfolio.duration = duration;
    portfolio.budget = budget;
    portfolio.shortDescription = shortDescription;
    portfolio.description = description;
    portfolio.image = imageUrl;
    portfolio.gallery = galleryUrls;
    portfolio.features = features;
    portfolio.slug = newSlug;
    portfolio.status = status;
    portfolio.order = order;
    portfolio.seoTitle = seoTitle;
    portfolio.seoDescription = seoDescription;
    portfolio.seoKeywords = seoKeywords;

    await portfolio.save();

    return NextResponse.json({
      success: true,
      data: portfolio,
      message: "Portfolio project updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating portfolio project:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update portfolio project",
      },
      { status: 500 }
    );
  }
}

// DELETE - Hard delete portfolio project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();
    const { id } = await params;

    const portfolio = await Portfolio.findOne({ _id: id, isDeleted: false });
    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio project not found" },
        { status: 404 }
      );
    }

    // Hard delete
    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Portfolio project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete portfolio project" },
      { status: 500 }
    );
  }
}
