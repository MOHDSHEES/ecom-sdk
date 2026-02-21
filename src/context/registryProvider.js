"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAllRegistryServices } from "../services/registry/fetchAllRegistryService";
import { manageTagService } from "../services/registry/manageTagService";
import { deleteTagService } from "../services/registry/deleteTagService";

const RegistryContext = createContext();

export const RegistryProvider = ({ children }) => {
  const [registry, setRegistry] = useState({
    tags: [],
    productTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Load/Refresh Logic
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

  // 2. Manage Tag Logic (Create/Update)
  const manageTag = async ({ id = null, name }) => {
    try {
      const { data, error: apiError } = await manageTagService({ id, name });

      if (apiError) throw new Error(apiError);

      // Update the local context state immediately
      setRegistry((prev) => {
        const isUpdate = prev.tags.find((t) => t.id === data.tag.id);

        let updatedTags;
        if (isUpdate) {
          // Replace existing tag in the list
          updatedTags = prev.tags.map((t) =>
            t.id === data.tag.id ? data.tag : t
          );
        } else {
          // Add new tag to the list
          updatedTags = [...prev.tags, data.tag];
        }

        return {
          ...prev,
          tags: updatedTags,
        };
      });

      return { result: data.tag, error: null };
    } catch (err) {
      console.error("Error managing tag in context:", err);
      return { result: null, error: err.message };
    }
  };
  // 3. Delete tag
  const deleteTag = async (tagId) => {
    try {
      // 1. Call your delete service (ensure this service is created in your SDK/services)
      const { error: apiError } = await deleteTagService(tagId);

      if (apiError) throw new Error(apiError);

      // 2. Update local context state reactively
      setRegistry((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t.id !== tagId),
      }));

      return { success: true, error: null };
    } catch (err) {
      console.error("Error deleting tag in context:", err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  return (
    <RegistryContext.Provider
      value={{
        ...registry,
        loading,
        error,
        refresh: loadRegistry, // Renamed to 'refresh' for cleaner access
        manageTag,
        deleteTag,
      }}
    >
      {children}
    </RegistryContext.Provider>
  );
};

export const useRegistry = () => {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error("useRegistry must be used within a RegistryProvider");
  }
  return context;
};
// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { fetchAllRegistryServices } from "../services/registry/fetchAllRegistryService";
// // import { fetchAllRegistryServices } from "../services/productServices";

// const RegistryContext = createContext();

// export const RegistryProvider = ({ children }) => {
//   const [registry, setRegistry] = useState({
//     tags: [],
//     productTypes: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadRegistry = async () => {
//     setLoading(true);
//     try {
//       const { data, error: fetchError } = await fetchAllRegistryServices();

//       if (fetchError) throw new Error(fetchError);

//       setRegistry({
//         tags: data.tags || [],
//         productTypes: data.productTypes || [],
//       });
//     } catch (err) {
//       console.error("Failed to load store registry:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRegistry();
//   }, []);

//   // We provide a 'refreshRegistry' function in case you add a tag
//   // and want the UI to update without a page reload.
//   return (
//     <RegistryContext.Provider
//       value={{ ...registry, loading, error, refreshRegistry: loadRegistry }}
//     >
//       {children}
//     </RegistryContext.Provider>
//   );
// };

// // Custom hook for easy access
// export const useRegistry = () => {
//   const context = useContext(RegistryContext);
//   if (!context) {
//     throw new Error("useRegistry must be used within a RegistryProvider");
//   }
//   return context;
// };
