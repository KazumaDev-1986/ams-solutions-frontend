import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@presentation": path.resolve(__dirname, "./src/presentation"),
      "@business": path.resolve(__dirname, "./src/business"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
