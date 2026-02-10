"use client";
import React, { createContext, useContext } from "react";
import { setGlobalConfig } from "../config/sdkConfig";

const ConfigContext = createContext(undefined);

export const ConfigProvider = ({ children, baseUrl }) => {
  // You can add default fallbacks here if needed
  const value = {
    // || "http://localhost:8080",
    baseUrl: baseUrl,
  };
  if (baseUrl) {
    setGlobalConfig({ baseUrl });
  }
  //   console.log("ConfigProvider initialized with baseUrl:", value.baseUrl);

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useSDKConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error(
      "SDK Hooks must be used within a ConfigProvider or EcomProvider"
    );
  }
  return context;
};
