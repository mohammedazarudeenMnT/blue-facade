import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    client: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    serviceType: {
      type: String,
      trim: true,
    },
    projectArea: {
      type: String,
      trim: true,
    },
    completionDate: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    seoKeywords: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
portfolioSchema.index({ status: 1, order: 1 });
portfolioSchema.index({ projectName: "text", description: "text", location: "text" });
portfolioSchema.index({ category: 1, status: 1 });

// Instance method to increment views
portfolioSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Static method to get active portfolio projects with pagination
portfolioSchema.statics.getActive = function (page = 1, limit = 6) {
  const query = { status: "active", isDeleted: false };

  const skip = (page - 1) * limit;

  return {
    portfolios: this.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    total: this.countDocuments(query),
  };
};

const Portfolio =
  mongoose.models.Portfolio ||
  mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
