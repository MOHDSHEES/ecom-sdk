import { BASE_URL } from "../../../env";

export const addVendorToDBServices = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/vendors/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err || "Network/server error" };
  }
};
