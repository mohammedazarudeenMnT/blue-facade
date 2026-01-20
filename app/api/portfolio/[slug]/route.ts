import { NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Portfolio from "@/config/utils/admin/portfolio/portfolioSchema";

// GET - Fetch single support model by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;

    // Find portfolio by slug
    const portfolio = await Portfolio.findOne({
      slug,
      status: "active",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    })
      .select("-isDeleted -__v")
      .lean();

    if (!portfolio) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio not found",
        },
        { status: 404 },
      );
    }

    // Increment view count
    await Portfolio.findByIdAndUpdate(portfolio._id, {
      $inc: { views: 1 },
    });

    return NextResponse.json({
      success: true,
      data: portfolio,
      message: "Portfolio fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch portfolio",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
