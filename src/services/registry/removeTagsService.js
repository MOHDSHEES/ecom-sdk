// src/services/productServices.js
import { getGlobalConfig } from "../../config/sdkConfig";

export const removeTagService = async (tagId, productIds) => {
  try {
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return {
        error:
          "Base URL is not defined. Please provide it in the SDK configuration.",
      };
    }

    const res = await fetch(`${BASE_URL}/api/registry/removeTagBulk`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // Wrap variables in an object so they are sent as valid JSON
      body: JSON.stringify({ tagId, productIds }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Failed to remove tags" };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message || err };
  }
};
