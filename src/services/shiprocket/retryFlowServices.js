// src/services/shiprocket/fullFlowServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const retryFullFlowOrderService = async ({
  order_id,
  courier_id,
  pickup_date,
}) => {
  const { baseUrl: BASE_URL } = getGlobalConfig();
  if (!BASE_URL) {
    return {
      error:
        "Base URL is not defined. Please provide it in the SDK configuration.",
    };
  }
  if (!order_id) {
    return { error: "Order id is required" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/retryFlow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, courier_id, pickup_date }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Full flow API failed" };
    }

    const result = await res.json();
    if (!result.success) {
      return { error: result.message || "Full flow API returned failure" };
    }

    return { data: result.data };
  } catch (err) {
    return { error: err.message || "Full flow API request failed" };
  }
};
