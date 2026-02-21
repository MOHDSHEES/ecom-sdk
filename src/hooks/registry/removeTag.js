// import { removeImageServices } from "../../services/products/removeImageService";
// import { manageTagService } from "../../services/registry/manageTagService";
import { removeTagService } from "../../services/registry/removeTagsService";
// import { fetchAllRegistryServices } from "../../services/registry/fetchAllRegistryService";

export const removeTags = async (tagId, productIds) => {
  //   console.log(imageUrl);
  //   console.log(id);

  const { data, error } = await removeTagService(tagId, productIds);

  if (error) {
    throw new Error(error || "Failed to delete tag");
  }

  return data;
};
