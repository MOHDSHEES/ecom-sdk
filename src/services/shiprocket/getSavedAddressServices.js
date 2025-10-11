// src/services/productServices.js
import { BASE_URL } from "../../../env";

export const getSavedAddressServices = async () => {
  //   console.log(userId);
  try {
    const res = await fetch(`${BASE_URL}/api/shiprocket/getSavedAddress`, {
      headers: { "Content-Type": "application/json" },
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
