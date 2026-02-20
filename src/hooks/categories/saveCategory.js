// src/server/categories/saveCategory.ts
import { saveCategoryService } from "../../services/categories/saveCategoryService";
import { checkLevelAllowed } from "../../services/categories/treeDepthService";

export const saveCategory = async (payload, id = null, currentTree = []) => {
  const { name, parent_id } = payload;

  // Recursive helper to find the full object if we are editing
  const findItem = (list, targetId) => {
    for (const item of list) {
      if (item.id === targetId) return item;
      if (item.children) {
        const found = findItem(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const editingItem = id ? findItem(currentTree, id) : null;

  // --- Level Validation ---
  const validation = checkLevelAllowed(currentTree, parent_id, editingItem);

  if (!validation.isAllowed) {
    throw new Error(
      `Exceeds limit: Current limit is ${validation.max} levels.`
    );
  }

  const categoryData = {
    name,
    parent_id: parent_id || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await saveCategoryService(categoryData, id);
  if (error) throw new Error(error.message || "Failed to save");

  return data;
}; // // src/server/categories/saveCategory.ts

// import { saveCategoryService } from "../../services/categories/saveCategoryService";

// /**
//  * Handles creating or updating a category.
//  * @param {Object} payload - The category data from the form
//  * @param {string} [id] - Optional ID for updates (edit mode)
//  */
// export const saveCategory = async (payload, id = null) => {
//   const { name, parent_id } = payload;

//   if (!name) {
//     throw new Error("Category name is required");
//   }

//   const categoryData = {
//     name,
//     parent_id: parent_id || null, // Ensure empty strings become null for DB
//     updated_at: new Date().toISOString(),
//   };

//   // --- 2. EXECUTE SERVICE ---
//   const { data, error } = await saveCategoryService(categoryData, id);

//   if (error) {
//     // Handle specific DB constraints (like duplicate slugs)
//     if (error.code === "23505") {
//       throw new Error("A category with this name/slug already exists.");
//     }
//     throw new Error(error.message || "Failed to save category");
//   }

//   return data;
// };
