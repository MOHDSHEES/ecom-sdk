// import { removeImageServices } from "../../services/products/removeImageService";
import { fetchAllRegistryServices } from "../../services/registry/fetchAllRegistryService";

export const fetchAllRegistry = async () => {
  //   console.log(imageUrl);
  //   console.log(id);

  const { data, error } = await fetchAllRegistryServices();

  if (error) {
    throw new Error(error || "Failed to fetch registry");
  }

  return data;
};
