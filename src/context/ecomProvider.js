// src/context/EcomProvider.js
"use client";

import { ConfigProvider } from "./configProvider";
import { OrdersProvider } from "./orderContext";
import { ProductsProvider } from "./productContext";
import { VendorProvider } from "./vendorContext";

// export const EcomProvider = ({ children }) => {
//   return (
export const EcomProvider = ({ children, baseUrl }) => {
  return (
    <ConfigProvider baseUrl={baseUrl}>
      <OrdersProvider>
        <ProductsProvider>
          <VendorProvider>{children}</VendorProvider>
        </ProductsProvider>
      </OrdersProvider>
    </ConfigProvider>
  );
};
