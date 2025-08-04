// src/hooks/useEditProduct.js
"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getProductByIdService } from "../../services/products/getProductByIdService";
import { editProductService } from "../../services/products/editProductService";
import { useProductsContext } from "../../context/productContext";

export const editProduct = (productId) => {
  const { editProduct: editProductContext } = useProductsContext();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const methods = useForm({ mode: "onSubmit", defaultValues: {} });

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await getProductByIdService(productId);
      if (data) {
        setProductData(data);
        methods.reset(data.product); // populate form
      } else {
        setFetchError(error || "Failed to fetch product");
      }
      setLoading(false);
    };

    if (productId) fetchProduct();
  }, [productId]);

  const onSubmit = async (formData) => {
    // const modifiedData = await runHook("onBeforeProductEdit", formData);
    const { data: result, error } = await editProductService(formData);
    if (result?.success) editProductContext(result.product);
    // await runHook("onAfterProductEdit", result);
    return { result, error };
  };
  const customReset = (data) => {
    if (data) {
      // If data is passed, reset with it
      methods.reset(data);
    } else if (productData && productData.product) {
      // If no data passed, reset with stored product data
      methods.reset(productData.product);
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
    data: productData,
    error: fetchError,
  };
};
