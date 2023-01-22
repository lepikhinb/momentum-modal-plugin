import "@inertiajs/vue3"
import { Page } from "@inertiajs/core"

interface Modal {
  component: string
  baseURL: string
  redirectURL: string | null
  props: Record<string, any>
  key: string
  nonce: string
}

declare module "@inertiajs/vue3" {
  export declare function usePage(): Page<{ modal: Modal }>
}

export {}
