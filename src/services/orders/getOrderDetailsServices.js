// src/services/productServices.js
import { BASE_URL } from "../../../env";
export const getOrderDetailServices = async ({ order_id }) => {
  //   console.log(userId);

  try {
    if (!order_id) {
      return { error: " Order Id is required" };
    }
    const res = await fetch(`${BASE_URL}/api/order/getOrderDetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id,
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
