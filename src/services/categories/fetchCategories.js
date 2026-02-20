// src/services/productServices.js
// import { BASE_URL } from "../../../env";
import { getGlobalConfig } from "../../config/sdkConfig";
export const fetchCategoriesService = async ({
  p_parent_id = null,
  p_max_depth = 1,
}) => {
  // console.log(productId);
  const { baseUrl } = getGlobalConfig();
  //   console.log(baseUrl);

  if (!baseUrl) {
    return {
      error:
        "Base URL is not defined. Please provide NEXT_PUBLIC_API_URL for configuration",
    };
  }
  try {
    const res = await fetch(`${baseUrl}/api/categories/getCategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p_parent_id, p_max_depth }),
    });
    // console.log(res);

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message };
    }
    const data = await res.json();

    return { data };
  } catch (err) {
    console.log(err);

    return { error: err };
  }
};

// // src/services/productServices.js
// // import { BASE_URL } from "../../../env";
// import { getGlobalConfig } from "../../config/sdkConfig";

// export const fetchCategoriesService = async () => {
//   try {
//     const { baseUrl: BASE_URL } = getGlobalConfig();
//     if (!BASE_URL) {
//       return {
//         error:
//           "Base URL is not defined. Please provide it in the SDK configuration.",
//       };
//     }
//     // console.log("in getProductServices", { page, limit, filters });

//     const res = await fetch(`${BASE_URL}/api/products/fetch-categories`);

//     if (!res.ok) {
//       const error = await res.json();
//       return { error: error.message };
//     }

//     const data = await res.json(); // Should include: products, total, page, pages
//     // console.log(data);

//     return { data };
//   } catch (err) {
//     return { error: err };
//   }
// };
