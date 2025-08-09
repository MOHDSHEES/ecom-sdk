import { BASE_URL } from "../../../env";

export const removeImageServices = async ({ imageUrl, id }) => {
  try {
    // console.log(imageUrl);
    // console.log(id);

    const res = await fetch(`${BASE_URL}/api/products/removeImage`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, id }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err || "Network/server error" };
  }
};
