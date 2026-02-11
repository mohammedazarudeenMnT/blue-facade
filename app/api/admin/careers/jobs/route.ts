import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import JobPosting from "@/config/utils/admin/careers/jobPostingSchema";

// GET - List all job postings
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Fetch jobs sorted by order (asc) and then creation date (desc)
    const jobs = await JobPosting.find().sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: jobs,
      message: "Job postings fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching job postings:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job postings",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST - Create a new job posting
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'driveLink'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required and cannot be empty`,
          },
          { status: 400 }
        );
      }
    }

    // Get the highest order to append the new job at the end
    const lastJob = await JobPosting.findOne().sort({ order: -1 });
    const newOrder = lastJob && lastJob.order !== undefined ? lastJob.order + 1 : 0;

    const newJob = new JobPosting({
      ...body,
      order: newOrder,
    });

    await newJob.save();

    return NextResponse.json({
      success: true,
      data: newJob,
      message: "Job posting created successfully",
    });
  } catch (error: unknown) {
    console.error("Error creating job posting:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job posting",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
