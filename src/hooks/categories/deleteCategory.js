// src/server/categories/deleteCategory.ts

import { deleteCategoryService } from "../../services/categories/deleteCategoryService";

/**
 * Handles deleting a category.
 * Typically includes a check to see if it has children or products.
 */
export const deleteCategory = async (id, hasChildren = false) => {
  if (!id) throw new Error("Category ID is required for deletion");

  // Prevent accidental deletion of a parent node
  if (hasChildren) {
    throw new Error(
      "Cannot delete a category that has sub-categories. Move or delete them first."
    );
  }

  const { data, error } = await deleteCategoryService(id);

  if (error) {
    throw new Error(error.message || "Failed to delete category");
  }

  return data;
};
