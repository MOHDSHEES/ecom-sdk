import { performSearchService } from "../../services/common/searchService";
// Exported Service for Vendors
export const searchVendor = (query) => performSearchService("vendors", query);

// Exported Service for Categories
export const searchCategory = (query) =>
  performSearchService("categories", query);
