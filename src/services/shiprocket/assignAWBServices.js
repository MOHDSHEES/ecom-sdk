// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const assignAWBServices = async ({ shipment_id, courier_id }) => {
  const { baseUrl: BASE_URL } = getGlobalConfig();
  if (!BASE_URL) {
    return {
      error:
        "Base URL is not defined. Please provide it in the SDK configuration.",
    };
  }
  if (!shipment_id || !courier_id) {
    return { error: "shipment_id and courier_id are required" };
  }
  //   console.log(userId);
  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/assignCourier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shipment_id, courier_id }),
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
