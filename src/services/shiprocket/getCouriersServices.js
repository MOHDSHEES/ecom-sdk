// src/services/productServices.js
import { BASE_URL } from "../../../env";

export const getCouriersServices = async ({ data: da }) => {
  //   console.log(userId);
  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/getCouriers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(da),
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
