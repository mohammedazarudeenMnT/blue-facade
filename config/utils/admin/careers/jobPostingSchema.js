import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    driveLink: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for better performance and sorting
jobPostingSchema.index({ order: 1, createdAt: -1 });

const JobPosting =
  mongoose.models.JobPosting ||
  mongoose.model("JobPosting", jobPostingSchema, "jobpostings");

export default JobPosting;
