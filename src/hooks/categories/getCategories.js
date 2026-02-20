// src/server/products/getProductById.ts

import { fetchCategoriesService } from "../../services/categories/fetchCategories";

export const fetchCategories = async ({
  p_parent_id = null,
  p_max_depth = 1,
}) => {
  const { data, error } = await fetchCategoriesService({
    p_parent_id,
    p_max_depth,
  });

  if (error || !data?.categories) {
    throw new Error(error || "Failed to fetch categories");
  }

  const flatList = data.categories;

  // --- NESTING LOGIC (The "Formatter") ---
  const map = {};
  const tree = [];

  // 1. Initialize the map with copies of the items and an empty children array
  flatList.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // 2. Link children to parents or push to the root of the tree
  flatList.forEach((item) => {
    const node = map[item.id];

    // Logic: If it has a parent_id AND that parent exists in our current result set
    if (item.parent_id && map[item.parent_id]) {
      map[item.parent_id].children.push(node);
    } else {
      // If it has no parent_id (Top Level) OR its parent wasn't part of this fetch
      tree.push(node);
    }
  });

  return tree;
};
