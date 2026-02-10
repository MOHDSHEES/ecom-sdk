// src/context/ProductsContext.js
"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { getVendorsServices } from "../services/vendors/getVendorsService";
// import { getVendorServices } from "../services/vendors/getVendorsService";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = useCallback(
    async ({ page = 1, limit = 10, filters = {} }) => {
      //   console.log("in fetchVendors");
      setLoading(true);
      const { data, error } = await getVendorsServices({
        page,
        limit,
        filters,
      });

      if (data) {
        setVendors(data.vendors);
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
  const addVendor = (newVendor) => {
    setVendors((prev) => [newVendor, ...prev]);
    setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
  };
  const editVendor = (updatedVendor) => {
    setVendors((prev) =>
      prev.map((p) => (p.id === updatedVendor.id ? updatedVendor : p))
    );
  };

  // Delete a product by id and decrement total count
  const deleteVendor = (vendorId) => {
    setVendors((prev) => prev.filter((p) => p.id !== vendorId));
    setPagination((prev) => ({ ...prev, total: Math.max(prev.total - 1, 0) }));
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        pagination,
        loading,
        error,
        addVendor,
        deleteVendor,
        editVendor,
        fetchVendors,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendorContext = () => useContext(VendorContext);
