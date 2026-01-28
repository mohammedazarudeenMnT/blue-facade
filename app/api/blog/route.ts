import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Blog from "@/config/utils/admin/blog/blogSchema";

// GET: Fetch published blogs (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const skip = (page - 1) * limit;

    // Build query - only published blogs
    const query: any = { published: true };
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")
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
