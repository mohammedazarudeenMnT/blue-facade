import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Blog from "@/config/utils/admin/blog/blogSchema";

// GET: Fetch single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
