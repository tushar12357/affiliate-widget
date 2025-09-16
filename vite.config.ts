import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget.tsx"),
      name: "ReactWidget",
      fileName: "react-widget-affiliate",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        // No globals needed since dependencies are bundled
      },
    },
  },
});