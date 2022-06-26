import { defineComponent } from "vue"
import { useModal } from "./use-modal"

export const Modal = defineComponent({
  setup() {
    const { vnode } = useModal()

    return () => vnode.value
  },
})
