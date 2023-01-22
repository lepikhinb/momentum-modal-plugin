import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Momentum Modal",
      fileName: `momentum-modal`,
    },
    rollupOptions: {
      external: ["vue", "@inertiajs/vue3", "axios"],
    },
  },
})
