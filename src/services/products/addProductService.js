export const addProductToDBServices = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products/add`, {
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
    return { error: "Network/server error" };
  }
};
