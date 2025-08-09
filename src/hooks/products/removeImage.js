import { removeImageServices } from "../../services/products/removeImageService";

export const removeImages = async ({ imageUrl, id }) => {
  //   console.log(imageUrl);
  //   console.log(id);

  const { data, error } = await removeImageServices({
    imageUrl,
    id,
  });

  if (error) {
    throw new Error(error || "Failed to remove image");
  }

  return data;
};
