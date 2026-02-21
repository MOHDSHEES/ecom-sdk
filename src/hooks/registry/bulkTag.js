import { bulkTagService } from "../../services/registry/bulkTagService";

export const bulkTag = async (tagId, filters) => {
  if (!tagId) throw new Error("Tag ID is required. ");

  const { data, error } = await bulkTagService(tagId, filters);

  if (error) {
    throw new Error(error.message || "Failed to add tags");
  }

  return { data };
};
