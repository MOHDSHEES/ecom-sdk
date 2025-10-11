// src/server/products/getProductById.ts

import { getOrderDetailServices } from "../../services/orders/getOrderDetailsServices";

// import { addOrderItemsServices } from "../../services/orders/addOrderItemServices";

// import { getOrderServices } from "../../services/orders/getOrderServices";

export const getOrderDetails = async ({ order_id } = {}) => {
  //   console.log("in");
  //   console.log(order_id);
  //   console.log(user_id);

  if (!order_id) {
    throw new Error("order id is required");
  }
  const { data, error } = await getOrderDetailServices({
    order_id,
  });
  //   console.log(data);
  // console.log(error);

  if (error) {
    throw new Error(error || "Failed to fetch order details");
  }

  return { data };
};
