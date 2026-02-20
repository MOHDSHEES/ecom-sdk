"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchCategories as getFormattedCategories } from "../hooks/categories";

export function useCategories({ p_parent_id = null, p_max_depth = 1 }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Extract the fetching logic into a reusable function
  // We use useCallback to ensure the function reference stays stable
  const loadCategories = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const nestedCategories = await getFormattedCategories({
          p_parent_id,
          p_max_depth,
        });
        setCategories(nestedCategories);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [p_parent_id, p_max_depth]
  );

  // 2. Run the fetch on initial mount or when params change
  useEffect(() => {
    loadCategories(true);
  }, [loadCategories]);

  // 3. Define the refresh logic
  const refresh = () => loadCategories(true);

  return { categories, loading, error, refresh };
}
// "use client";
// import { useEffect, useState } from "react";
// import { fetchCategories as getFormattedCategories } from "../hooks/categories";

// export function useCategories({ p_parent_id = null, p_max_depth = 1 }) {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       setLoading(true);
//       try {
//         const nestedCategories = await getFormattedCategories({
//           p_parent_id,
//           p_max_depth,
//         });
//         setCategories(nestedCategories);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [p_parent_id, p_max_depth]);

//   return { categories, loading, error };
// }
