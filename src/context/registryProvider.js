"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAllRegistryServices } from "../services/registry/fetchAllRegistryService";
// import { fetchAllRegistryServices } from "../services/productServices";

const RegistryContext = createContext();

export const RegistryProvider = ({ children }) => {
  const [registry, setRegistry] = useState({
    tags: [],
    productTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRegistry = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await fetchAllRegistryServices();

      if (fetchError) throw new Error(fetchError);

      setRegistry({
        tags: data.tags || [],
        productTypes: data.productTypes || [],
      });
    } catch (err) {
      console.error("Failed to load store registry:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  // We provide a 'refreshRegistry' function in case you add a tag
  // and want the UI to update without a page reload.
  return (
    <RegistryContext.Provider
      value={{ ...registry, loading, error, refreshRegistry: loadRegistry }}
    >
      {children}
    </RegistryContext.Provider>
  );
};

// Custom hook for easy access
export const useRegistry = () => {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error("useRegistry must be used within a RegistryProvider");
  }
  return context;
};
