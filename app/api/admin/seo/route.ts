import { NextRequest, NextResponse } from "next/server";
import SEO from "@/config/utils/admin/seo/seoSchema";
import connectDB from "@/config/models/connectDB";

// GET - Fetch all SEO data
export async function GET() {
  try {
    await connectDB();
    
    // Check if SEO data exists, if not create default data
    let seoData = await SEO.find({}).sort({ lastUpdated: -1 });
    
    if (seoData.length === 0) {
      // Create default SEO data for Blufacade
      const defaultSEOData = [
        {
          id: "home",
          pageName: "Home Page",
          title: "Blufacade - Premium Facade Construction & Cladding Solutions",
          description: "Blufacade offers premium facade construction services including ACP cladding, structural glazing, aluminium doors & windows, and modern architectural solutions in Chennai, India.",
          keywords: "facade construction, ACP cladding, structural glazing, aluminium windows, facade contractor Chennai, building facade, modern architecture, HPL cladding, spider glazing",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "about",
          pageName: "About Us",
          title: "About Blufacade - Leading Facade Construction Company in Chennai",
          description: "Learn about Blufacade, a trusted facade construction company with 15+ years of experience. We specialize in innovative architectural solutions and premium cladding services.",
          keywords: "about blufacade, facade company Chennai, experienced facade contractor, architectural solutions, premium cladding services, building exterior specialists",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "services",
          pageName: "Services Page",
          title: "Facade Services - ACP, Glazing, Aluminium & HPL Solutions",
          description: "Explore our comprehensive facade services including ACP cladding, structural glazing, aluminium doors & windows, HPL panels, spider glazing, and glass partition systems.",
          keywords: "facade services, ACP cladding services, structural glazing, aluminium fabrication, HPL panels, spider glazing, glass partition, DGU unitised, canopy work",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "portfolio",
          pageName: "Portfolio",
          title: "Blufacade Portfolio - Our Completed Facade Projects",
          description: "View our portfolio of completed facade projects showcasing modern architecture, innovative designs, and quality craftsmanship across residential and commercial buildings.",
          keywords: "facade portfolio, completed projects, facade gallery, architectural projects, building facades, construction portfolio, modern facades, commercial facades",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "contact",
          pageName: "Contact Us",
          title: "Contact Blufacade - Get Expert Facade Solutions Today",
          description: "Contact Blufacade for premium facade construction services in Chennai, Madurai, and Dindigul. Call 9994162996 or email blufacadein@gmail.com for consultation.",
          keywords: "contact blufacade, facade inquiry, Chennai facade contractor, facade consultation, building exterior services, ACP cladding quote, glazing services Chennai",
          lastUpdated: new Date(),
          isActive: true,
        },
      ];

      // Use bulkWrite with upsert to prevent duplicates
      const bulkOps = defaultSEOData.map(item => ({
        updateOne: {
          filter: { id: item.id },
          update: { $setOnInsert: item },
          upsert: true
        }
      }));

      await SEO.bulkWrite(bulkOps);
      seoData = await SEO.find({}).sort({ lastUpdated: -1 });
      console.log("✅ SEO data initialized for Blufacade");
    }
    
    return NextResponse.json({
      success: true,
      data: seoData,
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch SEO data" },
      { status: 500 }
    );
  }
}

// PUT - Update SEO data
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, title, description, keywords } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedSEO = await SEO.findOneAndUpdate(
      { id },
      {
        title,
        description,
        keywords: keywords || "",
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedSEO) {
      return NextResponse.json(
        { success: false, error: "SEO page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSEO,
      message: "SEO data updated successfully",
    });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update SEO data" },
      { status: 500 }
    );
  }
}
