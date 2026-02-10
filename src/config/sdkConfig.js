// src/config/sdkConfig.js
let globalConfig = {
  baseUrl: "",
};

export const setGlobalConfig = (config) => {
  globalConfig = { ...globalConfig, ...config };
};

export const getGlobalConfig = () => globalConfig;
