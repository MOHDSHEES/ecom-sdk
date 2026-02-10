// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";
export const updateOrderServices = async ({ order_id, updated_data }) => {
  //   console.log(userId);
  const { baseUrl: BASE_URL } = getGlobalConfig();
  if (!BASE_URL) {
    return {
      error:
        "Base URL is not defined. Please provide it in the SDK configuration.",
    };
  }
  try {
    if (!order_id) {
      return { error: " Order Id is required" };
    }
    const res = await fetch(`${BASE_URL}/api/order/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id,
        updated_data,
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
