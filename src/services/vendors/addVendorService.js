// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";

export const addVendorToDBServices = async (formData) => {
  try {
    const { baseUrl: BASE_URL } = getGlobalConfig();
    if (!BASE_URL) {
      return {
        error:
          "Base URL is not defined. Please provide it in the SDK configuration.",
      };
    }
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
