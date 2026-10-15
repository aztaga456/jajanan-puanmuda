"use client";

import React from "react";
import { AppProvider } from "@/context/AppContext";
import { CartProvider } from "@/context/CartContext";

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppProvider>
      <CartProvider>{children}</CartProvider>
    </AppProvider>
  );
};
