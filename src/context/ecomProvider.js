// src/context/EcomProvider.js
"use client";

// import { ConfigProvider } from "./configProvider";
import { OrdersProvider } from "./orderContext";
import { ProductsProvider } from "./productContext";
import { RegistryProvider } from "./registryProvider";
import { VendorProvider } from "./vendorContext";

// export const EcomProvider = ({ children }) => {
//   return (
export const EcomProvider = ({ children }) => {
  return (
    // <ConfigProvider baseUrl={baseUrl}>
    <OrdersProvider>
      <ProductsProvider>
        <RegistryProvider>
          <VendorProvider>{children}</VendorProvider>
        </RegistryProvider>
      </ProductsProvider>
    </OrdersProvider>
    // </ConfigProvider>
  );
};
