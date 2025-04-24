import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/setupTests.js", ".eslintrc.test.js"],
    },
    exclude: ["**/node_modules/**", "**/dist/**", ".eslintrc.test.js"],
  },
});
