const plugins = [];

export const registerPlugin = (plugin) => {
  plugins.push(plugin);
};

export const runHook = async (hook, data) => {
  let result = data;
  for (const plugin of plugins) {
    if (typeof plugin[hook] === "function") {
      result = await plugin[hook](result);
    }
  }
  return result;
};
