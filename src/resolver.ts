import { ref } from "vue"

const resolveCallback = ref<CallableFunction>()

export default {
  setCallback: (callback: CallableFunction) => {
    resolveCallback.value = callback
  },
  resolve: (name: string) => resolveCallback.value!(name),
}
