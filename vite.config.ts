import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
  ],
});
