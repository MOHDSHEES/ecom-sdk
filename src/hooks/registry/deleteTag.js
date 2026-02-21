// src/server/categories/deleteCategory.ts

// import { deleteCategoryService } from "../../services/categories/deleteCategoryService";
import { deleteTagService } from "../../services/registry/deleteTagService";

/**
 * Handles deleting a category.
 * Typically includes a check to see if it has children or products.
 */
export const deleteTag = async (id) => {
  if (!id) throw new Error("Tag ID is required for deletion");

  const { data, error } = await deleteTagService(id);

  if (error) {
    throw new Error(error.message || "Failed to delete tag");
  }

  return data;
};
