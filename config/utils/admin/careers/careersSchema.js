import mongoose from "mongoose";

const careersSchema = new mongoose.Schema(
  {
    // Page Content
    pageTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      default: "Join Our Team",
    },
    pageDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
      default: "Be part of a dynamic team that's transforming skylines across India. We're looking for passionate professionals who share our commitment to excellence in facade engineering.",
    },
    
    
    // Optional Additional Content
    sectionTitle: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "Why Work With Us",
    },
    sectionDescription: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "At Blufacade, we foster innovation, encourage professional growth, and celebrate achievements. Join us to work on iconic projects that shape the architectural landscape.",
    },
  },
  {
    timestamps: true,
  }
);

// Create index for better performance
careersSchema.index({ createdAt: -1 });

const Careers =
  mongoose.models.Careers ||
  mongoose.model("Careers", careersSchema, "careersschemas");

export default Careers;
