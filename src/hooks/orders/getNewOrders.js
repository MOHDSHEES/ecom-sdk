// src/server/products/getProductById.ts

import { getNewOrdersServices } from "../../services/orders/getNewOrdersServices";

// import { addOrderItemsServices } from "../../services/orders/addOrderItemServices";

// import { getOrderServices } from "../../services/orders/getOrderServices";

export const getNewOrders = async ({
  page = 1,
  limit = 10,
  filters = {},
} = {}) => {
  //   console.log("in");

  const { data, error } = await getNewOrdersServices({
    page,
    limit,
    filters,
  });

  if (error) {
    throw new Error(error || "Failed to get Orders");
  }

  return { data };
};
