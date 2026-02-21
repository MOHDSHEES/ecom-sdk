// src/server/products/getProductById.ts

import { getFilteredProductsServices } from "../../services/products/getFilteredProductsService";
// import { getProductsServices } from "../../services/products/getProductsServices";

export const getFilteredProducts = async (page, limit, filters) => {
  const { data, error } = await getFilteredProductsServices(
    page,
    limit,
    filters
  );

  if (error) {
    throw new Error("Failed to fetch products");
  }

  return data;
};
