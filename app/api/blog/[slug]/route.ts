import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Blog from "@/config/utils/admin/blog/blogSchema";

// GET: Fetch single blog by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const blog = await Blog.findOne({ 
      slug: slug,
      published: true 
    }).select("-__v");

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    // Get related blogs (same category, exclude current)
    const relatedBlogs = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      published: true,
    })
      .limit(3)
      .select("title slug excerpt image category createdAt readTime")
      .lean();

    return NextResponse.json({
      success: true,
      blog,
      relatedBlogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
