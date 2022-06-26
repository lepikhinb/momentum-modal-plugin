import { createApp, h } from "vue"
import { createInertiaApp } from "@inertiajs/inertia-vue3"
import { modal } from "momentum-modal"

createInertiaApp({
  resolve: (name) => require(`./Pages/${name}`),
  title: (title) => (title ? `${title} - Ping CRM` : "Ping CRM"),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(modal, (name) => import(`./Pages/${name}`))
      .use(plugin)
      .mount(el)
  },
})
