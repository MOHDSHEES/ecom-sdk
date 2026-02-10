// src/context/EcomProvider.js
"use client";

import { OrdersProvider } from "./orderContext";
import { ProductsProvider } from "./productContext";
import { VendorProvider } from "./vendorContext";

export const EcomProvider = ({ children }) => {
  return (
    // <AuthProvider>
    // <UserProvider>
    // <CartProvider>
    <OrdersProvider>
      <ProductsProvider>
        <VendorProvider>{children}</VendorProvider>
      </ProductsProvider>
    </OrdersProvider>
    // </CartProvider>
    // </UserProvider>
    // </AuthProvider>
  );
};
