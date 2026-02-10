// src/services/productServices.js

// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const getProductByIdService = async (id) => {
  try {
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return {
        error:
          "Base URL is not defined. Please provide it in the SDK configuration.",
      };
    }

    const res = await fetch(`${BASE_URL}/api/products/getById/${id}`);
    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }
    const data = await res.json();
    // console.log(data);

    return { data };
  } catch (err) {
    return { error: err };
  }
};
