// src/services/productServices.js
import { BASE_URL } from "../../../env";

export const getProductServices = async ({
  page = 1,
  limit = 10,
  filters = {},
} = {}) => {
  try {
    // console.log("in getProductServices", { page, limit, filters });

    const res = await fetch(`${BASE_URL}/api/products/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        limit,
        filters, // send any filter/sort if needed
      }),
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
