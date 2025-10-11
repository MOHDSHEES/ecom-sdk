import { updateOrderServices } from "../../services/orders/updateOrderServices";

export const updateOrder = async ({ order_id, updated_data } = {}) => {
  if (!order_id) {
    throw new Error("order id is required");
  }
  const { data, error } = await updateOrderServices({
    order_id,
    updated_data,
  });
  //   console.log(data);
  // console.log(error);

  if (error) {
    throw new Error(error || "Failed to update order");
  }

  return { data };
};
