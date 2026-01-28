"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { categories, isLoading, mutate } = useCategories(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "" });
    setManageDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name });
    setManageDialogOpen(true);
  };

  const handleSaveCategory = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      if (!categoryForm.name.trim()) {
        toast.error("Category name is required");
        return;
      }

      if (editingCategory) {
        // Update existing category
        await axios.put(
          `/api/admin/categories/${editingCategory._id}`,
          categoryForm,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Category updated successfully");
      } else {
        // Create new category
        await axios.post("/api/admin/categories", categoryForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category created successfully");
      }

      mutate();
      setManageDialogOpen(false);
      setCategoryForm({ name: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      await axios.delete(`/api/admin/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Category deleted successfully");
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <>
      <div className="flex gap-2 items-start">
        <div className="flex-1 min-w-0">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <div className="flex items-center justify-center p-4 text-sm text-gray-500">
                  No categories found. Click + to add one.
                </div>
              ) : (
                <>
                  {categories.length > 10 && (
                    <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50 sticky top-0">
                      {categories.length} categories available - scroll to see more
                    </div>
                  )}
                  {categories.map((cat: any) => (
                    <SelectItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddCategory}
          title="Manage Categories"
          className="flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Category Name *</Label>
              <Input
                id="cat-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ name: e.target.value })}
                placeholder="e.g., Facade Design"
              />
            </div>

            {!editingCategory && (
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Existing Categories</h3>
                  <span className="text-sm text-gray-500">
                    {categories.length} total
                  </span>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No categories yet.</p>
                      <p className="text-sm">Create your first category above.</p>
                    </div>
                  ) : (
                    categories.map((cat: any) => (
                      <div
                        key={cat._id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{cat.name}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCategory(cat)}
                            title="Edit category"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(cat._id)}
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setManageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveCategory}
              disabled={submitting}
              className="bg-[#014a74] hover:bg-[#014a74]/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Category"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
