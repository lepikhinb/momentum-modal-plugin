import { usePage } from "@inertiajs/inertia-vue3"
import { Inertia } from "@inertiajs/inertia"
import { defineAsyncComponent, h, nextTick, watch, computed, ref, shallowRef } from "vue"
import axios from "axios"
import deepmerge from "deepmerge" // This is also a dependency of inertia
import resolver from "./resolver"

interface Modal {
  component: string
  baseURL: string
  redirectURL: string | null
  props: Record<string, any>
  key: string
  nonce: string
}

const response = usePage<{ modal: Modal }>().props
const modal = computed(() => response.value?.modal)
const props = computed(() => modal.value?.props)
const key = computed(() => modal.value?.key)

const componentName = ref()
const component = shallowRef()
const show = ref(false)
const vnode = ref()
const nonce = ref()

const setHeaders = (values: Record<string, string | null>) => {
  Object.entries(values).forEach(([key, value]) =>
    ["post", "put", "patch", "delete"].forEach((method) => {
      /** @ts-ignore */
      axios.defaults.headers[method][key] = value
    })
  )
}

const resetHeaders = () => {
  const headers = ["X-Inertia-Modal-Key", "X-Inertia-Modal-Redirect"]

  headers.forEach(([key, value]) =>
    ["get", "post", "put", "patch", "delete"].forEach((method) => {
      /** @ts-ignore */
      delete axios.defaults.headers[method][key]
    })
  )
}

const updateHeaders = () => {
  setHeaders({
    "X-Inertia-Modal-Key": key.value,
    "X-Inertia-Modal-Redirect": modal.value?.redirectURL,
  })

  axios.defaults.headers.get["X-Inertia-Modal-Redirect"] = modal.value?.redirectURL ?? ""
}

const close = () => {
  show.value = false

  resetHeaders()
}

const resolveComponent = () => {
  if (nonce.value == modal.value?.nonce || !modal.value?.component) {
    return close()
  }

  if (componentName.value != modal.value?.component) {
    componentName.value = modal.value.component

    if (componentName.value) {
      component.value = defineAsyncComponent(() => resolver.resolve(componentName.value))
    } else {
      component.value = false
    }
  }

  nonce.value = modal.value?.nonce
  vnode.value = component.value
    ? h(component.value, {
        key: key.value,
        ...props.value,
      })
    : ""

  nextTick(() => (show.value = true))
}

resolveComponent()

if (typeof window !== "undefined") {
  window.addEventListener("popstate", (event: PopStateEvent) => {
    nonce.value = null
  })
}

// Adds support for inertia deep partial updates
axios.interceptors.response.use((response) => {
  if (response.config.headers["X-Inertia-Partial-Data"]) {
    const overwriteMerge = (_destinationArray: Array<unknown>, sourceArray: Array<unknown>) => sourceArray;

    response.data.props = deepmerge(JSON.parse(JSON.stringify(usePage().props.value)), response.data.props, { arrayMerge: overwriteMerge });
  }
  return response
})

watch(
  () => modal.value,
  () => {
    if (modal.value?.nonce !== nonce.value) {
      resolveComponent()
    }
  },
  { deep: true }
)
watch(() => key.value, updateHeaders)

const redirect = () => {
  var redirectURL = modal.value?.redirectURL ?? modal.value?.baseURL

  vnode.value = false

  if (!redirectURL) {
    return
  }

  return Inertia.visit(redirectURL, {
    preserveScroll: true,
    preserveState: true,
  })
}

export const useModal = () => {
  return {
    show,
    vnode,
    close,
    redirect,
    props,
  }
}
