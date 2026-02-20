import { getGlobalConfig } from "../../config/sdkConfig";

export const deleteCategoryService = async (id) => {
  const { baseUrl } = getGlobalConfig();
  if (!baseUrl) {
    return {
      error:
        "Base URL is not defined. Please provide NEXT_PUBLIC_API_URL for configuration",
    };
  }
  try {
    const res = await fetch(`${baseUrl}/api/categories/deleteCategory`, {
      method: "DELETE", // Use DELETE method
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }

    return { data: await res.json() };
  } catch (err) {
    return { error: err.message };
  }
};
