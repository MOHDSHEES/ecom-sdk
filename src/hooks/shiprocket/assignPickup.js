import { assignPickupServices } from "../../services/shiprocket/assignPickupServices";

export const assignPickup = async ({
  shipment_id,
  pickup_date,
  pickup_time,
}) => {
  if (!shipment_id) {
    throw new Error("shipment_id is required");
  }

  const { data: da, error } = await assignPickupServices({
    shipment_id,
    pickup_date,
    pickup_time,
  });

  if (error) {
    throw new Error(error || "Failed to assign pickup");
  }

  return da;
};
