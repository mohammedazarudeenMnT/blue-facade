import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import JobPosting from "@/config/utils/admin/careers/jobPostingSchema";

// GET - Get a single job posting
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const job = await JobPosting.findById(id);

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job posting not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
      message: "Job posting fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching job posting:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job posting",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update a job posting
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    const updatedJob = await JobPosting.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job posting not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedJob,
      message: "Job posting updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating job posting:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job posting",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job posting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const deletedJob = await JobPosting.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job posting not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job posting deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting job posting:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete job posting",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
