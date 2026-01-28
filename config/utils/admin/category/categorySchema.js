import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

// Default categories data
const defaultCategories = [
  { name: "Facade Design" },
  { name: "Construction Tips" },
  { name: "Industry News" },
  { name: "Case Studies" },
  { name: "Technology" },
  { name: "Sustainability" },
  { name: "General" },
];

// Auto-seed function
const autoSeedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(defaultCategories);
      console.log("✅ Categories database auto-seeded with default data");
    }
  } catch (error) {
    console.error("❌ Error auto-seeding categories data:", error);
  }
};

// Auto-seed when model is first loaded
if (mongoose.connection.readyState === 1) {
  autoSeedCategories();
} else {
  mongoose.connection.once("open", autoSeedCategories);
}

export default Category;
