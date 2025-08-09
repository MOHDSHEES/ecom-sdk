import { uploadImagesService } from "../../services/products/addImagesService";

export const uploadImages = async ({
  files,
  productId,
  maxImages = 15,
  maxSizeMB = 2,
  maxWidthOrHeight = 1920,
  onProgress = () => {},
  onMessage = () => {},
}) => {
  const { data, error } = await uploadImagesService({
    files,
    productId,
    maxImages,
    maxSizeMB,
    maxWidthOrHeight,
    onProgress,
    onMessage,
  });

  if (error) {
    throw new Error(error || "Failed to add images");
  }

  return data;
};
