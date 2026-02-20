// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const fetchAllRegistryServices = async () => {
  try {
    // console.log("in getProductServices", { page, limit, filters });
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return {
        error:
          "Base URL is not defined. Please provide it in the SDK configuration.",
      };
    }
    const res = await fetch(`${BASE_URL}/api/registry/fetchAll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }

    const data = await res.json(); // Should include: products, total, page, pages
    // console.log(data);

    return { data };
  } catch (err) {
    return { error: err };
  }
};
