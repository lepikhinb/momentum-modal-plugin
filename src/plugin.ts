import { App } from "vue"
import resolver from "./resolver"

export const plugin = {
  install(app: App, resolve: CallableFunction) {
    resolver.setCallback(resolve)
  },
}
