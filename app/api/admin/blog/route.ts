import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Blog from "@/config/utils/admin/blog/blogSchema";
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

// GET: Fetch all blogs with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const published = searchParams.get("published");

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";
    if (published !== null && published !== undefined) {
      query.published = published === "true";
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new blog
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";
    const featured = formData.get("featured") === "true";
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const seoTitle = formData.get("seoTitle") as string || "";
    const seoDescription = formData.get("seoDescription") as string || "";
    const seoKeywords = formData.get("seoKeywords") as string || "";
    
    const imageFile = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string | null;

    let imageUrl = existingImage || "";

    // Upload image to Cloudinary if provided
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imageResult = await uploadToCloudinary(
        imageBuffer,
        `blog/${slug}/featured`
      );
      imageUrl = imageResult.secure_url;
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Featured image is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      image: imageUrl,
      category,
      author,
      tags,
      published,
      featured,
      readTime,
      seoTitle,
      seoDescription,
      seoKeywords,
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update blog
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const formData = await request.formData();
    
    const _id = formData.get("_id") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";
    const featured = formData.get("featured") === "true";
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const seoTitle = formData.get("seoTitle") as string || "";
    const seoDescription = formData.get("seoDescription") as string || "";
    const seoKeywords = formData.get("seoKeywords") as string || "";
    
    const imageFile = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string | null;

    let imageUrl = existingImage || "";

    // Upload new image to Cloudinary if provided
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imageResult = await uploadToCloudinary(
        imageBuffer,
        `blog/${slug}/featured`
      );
      imageUrl = imageResult.secure_url;
    }

    const updateData: any = {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      tags,
      published,
      featured,
      readTime,
      seoTitle,
      seoDescription,
      seoKeywords,
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const blog = await Blog.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete blog
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
