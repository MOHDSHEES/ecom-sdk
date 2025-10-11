import { createOrderServices } from "../../services/shiprocket/createOrderServices";

export const createOrder = async ({ data } = {}) => {
  const { data: da, error } = await createOrderServices({
    data,
  });

  if (error) {
    throw new Error(error || "Failed to create shiprocket order");
  }

  return da;
};
