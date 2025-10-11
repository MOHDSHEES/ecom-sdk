import { getCouriersServices } from "../../services/shiprocket/getCouriersServices";

export const getCouriers = async ({ data } = {}) => {
  if (!data.pickup_postcode || !data.delivery_postcode || !data.weight) {
    throw new Error(
      "pickup_postcode, delivery_postcode and weight are required"
    );
  }
  const { data: da, error } = await getCouriersServices({
    data,
  });

  if (error) {
    throw new Error(error || "Failed to fetch couriers");
  }

  return da;
};
