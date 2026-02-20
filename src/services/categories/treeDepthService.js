// src/services/categories/levelCheckService.js

/**
 * Get the max depth from ENV or default to 3
 */
const MAX_LIMIT = parseInt(
  process.env.NEXT_PUBLIC_MAX_CATEGORY_LIMIT || "3",
  10
);

/**
 * Finds the depth of a specific ID within the tree structure
 */
const findDepthById = (items, id, currentDepth = 1) => {
  for (const item of items) {
    if (item.id === id) return currentDepth;
    if (item.children && item.children.length > 0) {
      const depth = findDepthById(item.children, id, currentDepth + 1);
      if (depth) return depth;
    }
  }
  return 0;
};

/**
 * Calculates the height of the subtree (how many levels are below this node)
 */
const getSubtreeHeight = (node) => {
  if (!node || !node.children || node.children.length === 0) return 0;
  return 1 + Math.max(...node.children.map(getSubtreeHeight));
};

/**
 * MAIN SERVICE FUNCTION
 * Checks if the proposed move/add is within the allowed level limit
 */
export const checkLevelAllowed = (tree, parentId, editingItem = null) => {
  // 1. Determine depth of the parent where we want to place the category
  const parentDepth = parentId ? findDepthById(tree, parentId) : 0;
  const newLevel = parentDepth + 1;

  // 2. If editing, determine the height of the current category's branch
  const branchHeight = editingItem ? getSubtreeHeight(editingItem) : 0;

  const finalTotalDepth = newLevel + branchHeight;

  return {
    isAllowed: finalTotalDepth <= MAX_LIMIT,
    max: MAX_LIMIT,
    current: finalTotalDepth,
  };
};
