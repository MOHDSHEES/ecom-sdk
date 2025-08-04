import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  outDir: "dist",
  format: ["esm"], // Just ES modules — Next.js can handle it
  dts: true,
  clean: true,
  bundle: false, // Do NOT bundle — keep source files as is
  splitting: false,
  jsx: "preserve", // Keep JSX, Next.js will compile it
  sourcemap: true,
  loader: {
    ".js": "jsx", // this tells esbuild to parse .js files as JSX
  },
});
