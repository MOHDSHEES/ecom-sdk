// src/services/productServices.js
import { BASE_URL } from "../../../env";

export const fetchCategoriesService = async () => {
  try {
    // console.log("in getProductServices", { page, limit, filters });

    const res = await fetch(`${BASE_URL}/api/products/fetch-categories`);

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
