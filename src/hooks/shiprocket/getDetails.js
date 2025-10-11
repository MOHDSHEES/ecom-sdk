import { getDetailsServices } from "../../services/shiprocket/getDetailsServices";

export const getDetails = async ({ id, type }) => {
  //   if (!data.pickup_postcode || !data.delivery_postcode || !data.weight) {
  //     throw new Error(
  //       "pickup_postcode, delivery_postcode and weight are required"
  //     );
  //   }
  const { data: da, error } = await getDetailsServices({
    id,
    type,
  });

  if (error) {
    throw new Error(error || "Failed to fetch order details");
  }

  return da;
};
