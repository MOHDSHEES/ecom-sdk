// src/services/productServices.js
import { BASE_URL } from "../../../env";

export const getNewOrdersServices = async ({
  page = 1,
  limit = 10,
  filters = {},
} = {}) => {
  //   console.log(userId);
  try {
    const res = await fetch(`${BASE_URL}/api/order/getNewOrders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        limit,
        filters,
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
