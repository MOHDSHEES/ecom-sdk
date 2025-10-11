import { getSavedAddressServices } from "../../services/shiprocket/getSavedAddressServices";

export const getSavedAddress = async () => {
  const { data: da, error } = await getSavedAddressServices();

  if (error) {
    throw new Error(error || "Failed to fetch address");
  }

  return da;
};
