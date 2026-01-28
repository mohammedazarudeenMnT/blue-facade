import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Category from "@/config/utils/admin/category/categorySchema";

// GET: Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("activeOnly") === "true";

    const query = activeOnly ? { } : {};

    const categories = await Category.find(query)
      .sort({ name: 1 })
      .select("-__v")
      .lean();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new category
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category with this name already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create({ name });

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
