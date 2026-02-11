import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Careers from "@/config/utils/admin/careers/careersSchema";

// GET - Fetch careers information
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get the careers information (there should only be one record)
    let careersInfo = await Careers.findOne();

    // If no careers info exists, create default data
    if (!careersInfo) {
      const defaultCareersInfo = {
        pageTitle: "Join Our Team",
        pageDescription: "Be part of a dynamic team that's transforming skylines across India. We're looking for passionate professionals who share our commitment to excellence in facade engineering.",
        sectionTitle: "Why Work With Us",
        sectionDescription: "At Blufacade, we foster innovation, encourage professional growth, and celebrate achievements. Join us to work on iconic projects that shape the architectural landscape.",
      };

      careersInfo = new Careers(defaultCareersInfo);
      await careersInfo.save();
    }

    return NextResponse.json({
      success: true,
      data: careersInfo,
      message: "Careers information fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching careers information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch careers information",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update careers information
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['pageTitle', 'pageDescription'];
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

    // Find and update the careers info (there should only be one record)
    const careersInfo = await Careers.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      data: careersInfo,
      message: "Careers information updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating careers information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update careers information",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
