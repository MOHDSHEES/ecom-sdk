// src/services/shiprocket/fullFlowServices.js
import { BASE_URL } from "../../../env";

export const createFullFlowOrderService = async ({ data, pickup_date }) => {
  if (!data) {
    return { error: "Order data is required" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/fullShipRocketFlow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, pickup_date }),
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
