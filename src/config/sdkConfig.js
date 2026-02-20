// // src/config/sdkConfig.js
// let globalConfig = {
//   baseUrl: "",
// };

// export const setGlobalConfig = (config) => {
//   globalConfig = { ...globalConfig, ...config };
// };

// export const getGlobalConfig = () => globalConfig;
const defaultBaseUrl =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";
// console.log(defaultBaseUrl);

let globalConfig = {
  baseUrl: defaultBaseUrl,
};

export const setGlobalConfig = (config) => {
  globalConfig = { ...globalConfig, ...config };
};

export const getGlobalConfig = () => globalConfig;
