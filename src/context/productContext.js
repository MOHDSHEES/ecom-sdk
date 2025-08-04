// src/context/ProductsContext.js
"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { getProductServices } from "../services/products/getProductsService";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async ({ page = 1, limit = 10, filters = {} }) => {
      setLoading(true);
      const { data, error } = await getProductServices({
        page,
        limit,
        filters,
      });

      if (data) {
        setProducts(data.products);
        setPagination({
          page,
          pages: data.pages,
          total: data.total,
        });
        setError(null);
      } else {
        setError(error);
      }
      setLoading(false);
    },
    []
  );
  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
  };
  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Delete a product by id and decrement total count
  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setPagination((prev) => ({ ...prev, total: Math.max(prev.total - 1, 0) }));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        pagination,
        loading,
        error,
        addProduct,
        deleteProduct,
        editProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
