import { createApp, h } from "vue"
import { createInertiaApp } from "@inertiajs/vue3"
import { modal, ModalPluginOptions } from "momentum-modal"

function resolvePageComponent(name: string, pages: Record<string, any>) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path]
    }
  }

  throw new Error(`Page not found: ${name}`)
}

createInertiaApp({
  progress: false,
  resolve: (name) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(modal, {
        resolve: (name: string) => resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
      } as ModalPluginOptions)
      .use(plugin)
      .mount(el)
  },
})
