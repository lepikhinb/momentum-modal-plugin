import { defineComponent } from "vue"
import { useModal } from "./use-modal"

export const Modal = defineComponent({
  setup() {
    // Don't resolve the async component on the SSR environment
    if (typeof window === "undefined") {
      return () => {}
    }

    const { vnode } = useModal()

    return () => vnode.value
  },
})
