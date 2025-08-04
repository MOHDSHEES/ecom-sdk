import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"], // keep this if it's the main entry
  outDir: "dist",
  format: ["esm", "cjs"], // export both for compatibility
  dts: true,
  clean: true,
  bundle: false,
  sourcemap: true,
  splitting: false,
  jsx: "preserve", // ✅ leave JSX for Next.js to compile
  loader: {
    ".js": "jsx", // ✅ needed for JSX in .js files (if any remain)
    ".jsx": "jsx", // ✅ needed for JSX in .jsx files
  },
});
