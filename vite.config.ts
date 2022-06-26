import { defineConfig } from "vite";
const path = require("path");

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Momentum Modal",
      fileName: `momentum-modal`,
    },
    rollupOptions: {
      external: ["vue", "@inertiajs/inertia-vue3", "axios"],
      output: {
        globals: {
          vue: "Vue",
          "@inertiajs/inertia-vue3": "Inertia",
          axios: "axios",
        },
      },
    },
  },
});
