import { App } from "vue"
import resolver from "./resolver"

export type ModalPluginOptions = {
  resolve: CallableFunction
}

export const plugin = {
  install(app: App, options: ModalPluginOptions) {
    resolver.setResolveCallback(options.resolve)
  },
}
