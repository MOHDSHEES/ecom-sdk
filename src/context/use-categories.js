// hooks/useProductMeta.js
"use client";
import { useEffect, useState } from "react";
import { fetchCategoriesService } from "../services/categories/fetchCategories";

export function useCategories() {
  const [categories, setCategories] = useState({
    categories: [],
    tags: [],
    productTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await fetchCategoriesService();
        // const res = await fetch(
        //   "http://localhost:8080/api/products/fetch-categories"
        // );

        if (error) throw new Error(error);

        setCategories(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
