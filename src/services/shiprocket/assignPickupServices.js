// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const assignPickupServices = async ({
  shipment_id,
  pickup_date,
  pickup_time,
}) => {
  const { baseUrl: BASE_URL } = getGlobalConfig();
  if (!BASE_URL) {
    return {
      error:
        "Base URL is not defined. Please provide it in the SDK configuration.",
    };
  }
  if (!shipment_id) {
    throw new Error("shipment_id is required");
  }
  //   console.log(userId);
  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/assignPickup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipment_id,
        pickup_date,
        pickup_time,
      }),
    });
    // console.log(res);

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }
    const data = await res.json();

    return { data: data };
  } catch (err) {
    return { error: err };
  }
};
