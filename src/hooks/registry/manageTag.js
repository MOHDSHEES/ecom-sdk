// import { removeImageServices } from "../../services/products/removeImageService";
import { manageTagService } from "../../services/registry/manageTagService";
// import { fetchAllRegistryServices } from "../../services/registry/fetchAllRegistryService";

export const manageTag = async ({ id = null, name }) => {
  //   console.log(imageUrl);
  //   console.log(id);

  const { data, error } = await manageTagService({ id, name });

  if (error) {
    throw new Error(error || "Failed to create tag");
  }

  return data;
};
