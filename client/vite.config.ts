// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   globals: true,
//   environment: "jsdom",
//   setupFiles: "./setup.js",
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup.js",
  },
});
