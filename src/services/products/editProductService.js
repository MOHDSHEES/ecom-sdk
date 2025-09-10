import { BASE_URL } from "../../../env";

export const editProductService = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products/update/${formData.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }

    const data = await res.json();
    // console.log(data);

    return { data };
  } catch (err) {
    return { error: err };
    // return { error: "Network/server error" };
  }
};
