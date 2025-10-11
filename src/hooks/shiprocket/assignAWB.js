import { assignAWBServices } from "../../services/shiprocket/assignAWBServices";

export const assignAWB = async ({ shipment_id, courier_id }) => {
  if (!shipment_id || !courier_id) {
    throw new Error("shipment_id and courier_id are required");
  }
  const { data: da, error } = await assignAWBServices({
    shipment_id,
    courier_id,
  });

  if (error) {
    throw new Error(error || "Failed to create assign awb");
  }

  return da;
};
