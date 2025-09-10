// src/context/EcomProvider.js
"use client";

import { OrdersProvider } from "./orderContext";
import { ProductsProvider } from "./productContext";

export const EcomProvider = ({ children }) => {
  return (
    // <AuthProvider>
    // <UserProvider>
    // <CartProvider>
    <OrdersProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </OrdersProvider>
    // </CartProvider>
    // </UserProvider>
    // </AuthProvider>
  );
};
