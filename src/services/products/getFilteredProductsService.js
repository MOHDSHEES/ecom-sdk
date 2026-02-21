// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";
export const getFilteredProductsServices = async (page, limit, filters) => {
  // console.log(productId);
  const { baseUrl: BASE_URL } = getGlobalConfig();
  if (!BASE_URL) {
    return {
      error:
        "Base URL is not defined. Please provide NEXT_PUBLIC_API_URL for configuration",
    };
  }
  try {
    const res = await fetch(`${BASE_URL}/api/products/getFilteredProducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, limit, filters }),
    });
    // console.log(res);

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }
    const data = await res.json();

    return { data };
  } catch (err) {
    return { error: err };
  }
};
