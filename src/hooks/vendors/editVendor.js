// src/hooks/useEditProduct.js
"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { getProductByIdService } from "../../services/products/getProductByIdService";
// import { editProductService } from "../../services/products/editProductService";
// import { useProductsContext } from "../../context/productContext";
import { useVendorContext } from "../../context";
import { getVendorByIdService } from "../../services/vendors/getVendorByIdService";
import { editVendorService } from "../../services/vendors/editVendorService";

export const editVendor = (vendorId) => {
  //   const { editProduct: editProductContext } = useProductsContext();
  const { editVendor: editVendorContext } = useVendorContext();
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const methods = useForm({ mode: "onSubmit", defaultValues: {} });

  // Fetch product data on mount
  useEffect(() => {
    const fetchVendor = async () => {
      //   console.log(vendorId);

      setLoading(true);
      const { data, error } = await getVendorByIdService(vendorId);
      if (data) {
        // console.log(data.product);

        setVendorData(data.vendor);

        methods.reset(data.vendor); // populate form
      } else {
        setFetchError(error || "Failed to fetch product");
      }
      setLoading(false);
    };

    if (vendorId) fetchVendor();
  }, [vendorId]);

  const onSubmit = async (formData) => {
    // const modifiedData = await runHook("onBeforeProductEdit", formData);
    const { data: result, error } = await editVendorService(formData);
    if (result?.success) editVendorContext(result.vendor);
    // await runHook("onAfterProductEdit", result);
    return { result, error };
  };
  const customReset = (data) => {
    if (data) {
      // If data is passed, reset with it
      methods.reset(data);
    } else if (vendorData) {
      // If no data passed, reset with stored product data
      methods.reset(vendorData.vendor);
    } else {
      // Otherwise reset with empty object or default
      methods.reset({});
    }
  };

  return {
    ...methods,
    onSubmit,
    Controller,
    reset: customReset,
    loading,
    data: vendorData,
    error: fetchError,
  };
};
