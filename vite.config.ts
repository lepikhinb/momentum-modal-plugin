import { defineConfig } from "vite"
const path = require("path")

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Momentum Modal",
      fileName: `momentum-modal`,
    },
    rollupOptions: {
      external: ["vue", "@inertiajs/inertia", "@inertiajs/inertia-vue3", "axios"],
    },
  },
})
