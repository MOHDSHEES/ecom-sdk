// src/services/productServices.js

import { BASE_URL } from "../../../env";

export const getProductByIdService = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products/getById/${id}`);
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
