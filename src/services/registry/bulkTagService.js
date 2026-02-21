// src/services/tags/bulkTagService.js
import { getGlobalConfig } from "../../config/sdkConfig";

export const bulkTagService = async (tagId, filters) => {
  try {
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return { error: "Base URL is not defined." };
    }

    const res = await fetch(`${BASE_URL}/api/registry/bulkTag`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagId, filters }),
    });

    const result = await res.json();

    if (!res.ok) {
      return { error: result.message || "Failed to execute bulk assignment" };
    }

    return { data: result.count }; // Returns count of affected products
  } catch (err) {
    return { error: err.message || "Network error" };
  }
};
