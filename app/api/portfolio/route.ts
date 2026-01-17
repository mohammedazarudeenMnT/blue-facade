import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Portfolio from "@/config/utils/admin/portfolio/portfolioSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Fetch active portfolio projects for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build query for active portfolio projects only
    const query: any = {
      status: "active",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    };

    const skip = (page - 1) * limit;

    // Get portfolios and total count
    const [portfolios, totalPortfolios] = await Promise.all([
      Portfolio.find(query)
        .select("-isDeleted -__v")
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Portfolio.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalPortfolios / limit);

    return NextResponse.json({
      success: true,
      data: portfolios,
      pagination: {
        currentPage: page,
        totalPages,
        totalPortfolios,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: "Portfolios fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch portfolios",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
