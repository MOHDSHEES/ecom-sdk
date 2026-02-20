// src/services/productServices.js

import { getGlobalConfig } from "../../config/sdkConfig";

export const saveCategoryService = async (categoryData, id = null) => {
  const { baseUrl } = getGlobalConfig();

  if (!baseUrl) {
    return {
      error:
        "Base URL is not defined. Please provide NEXT_PUBLIC_API_URL configuration",
    };
  }

  try {
    // We use a POST request to your save endpoint.
    // If id exists, the backend logic should treat it as an update.
    const res = await fetch(`${baseUrl}/api/categories/saveCategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...categoryData, id }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Failed to save category" };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("Save Category Error:", err);
    return { error: err.message || err };
  }
};
