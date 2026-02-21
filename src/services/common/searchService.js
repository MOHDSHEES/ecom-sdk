// src/services/productServices.js
import { getGlobalConfig } from "../../config/sdkConfig";

/**
 * Generic Search Service to handle Vendors, Categories, etc.
 * @param {string} endpoint - The API endpoint (e.g., 'vendors' or 'categories')
 * @param {string} query - The search string from the user
 */
export async function performSearchService(endpoint, query) {
  try {
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return { error: "Base URL is not defined in SDK configuration." };
    }

    const res = await fetch(`${BASE_URL}/api/${endpoint}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: query }), // Passing the search term
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || `Failed to search ${endpoint}` };
    }

    const data = await res.json();
    return { data: data.results || [] }; // Standardizing the response key
  } catch (err) {
    return { error: err.message || "Network error occurred" };
  }
}
