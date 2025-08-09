import imageCompression from "browser-image-compression";
import { BASE_URL } from "../../../env";

export async function uploadImagesService({
  files,
  productId,
  maxImages,
  maxSizeMB,
  maxWidthOrHeight,
  onProgress,
  onMessage,
}) {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload");
  }
  //   console.log(productId);

  if (files.length > maxImages) {
    throw new Error(`Max ${maxImages} images can be uploaded`);
  }

  onMessage("Preparing images...");
  let totalSizeMB = 0;

  // Convert blobs/URLs to files and compress
  const filePromises = files.map(async (fileOrBlobUrl, index) => {
    let file;

    // Convert blob URL to File if necessary
    if (typeof fileOrBlobUrl === "string") {
      const response = await fetch(fileOrBlobUrl);
      const blob = await response.blob();
      file = new File([blob], `image_${index}.jpg`, { type: blob.type });
    } else {
      file = fileOrBlobUrl; // Already a File
    }

    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType: "image/webp",
    };

    const compressedFile = await imageCompression(file, options);
    totalSizeMB += compressedFile.size / (1024 * 1024);
    return compressedFile;
  });

  const compressedFiles = await Promise.all(filePromises);
  const formData = new FormData();
  compressedFiles.forEach((file) => formData.append("images", file));

  onMessage("Uploading images...");
  formData.append("productId", productId);
  // Upload with progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/api/products/uploadImages`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progressPercent = Math.min(
          Math.round((event.loaded / event.total) * 100),
          100
        );
        onProgress(progressPercent);

        if (progressPercent === 100) {
          onMessage("Processing... please wait");
        }
      }
    };

    xhr.onload = () => {
      try {
        const responseData = JSON.parse(xhr.response);

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(responseData); // ✅ Full backend data on success
        } else {
          reject(responseData); // ❌ Full backend error object on failure
        }
      } catch (err) {
        reject({ success: false, error: "Invalid JSON response from server" });
      }
    };

    xhr.onerror = () =>
      reject({ success: false, error: "Network error during upload" });

    xhr.send(formData);
  });
}
