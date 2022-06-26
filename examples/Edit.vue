<script lang="ts" setup>
import { useForm } from "@inertiajs/inertia-vue3"
import Modal from "./Modal.vue"

const props = defineProps<{ contact: Record<string, any>; organizations: any[] }>()
const form = useForm({
  first_name: props.contact.first_name,
  last_name: props.contact.last_name,
})

const update = () => form.put(`/contacts/${props.contact.id}`)
</script>

<template>
  <Modal>
    <template #title> Edit Contact </template>
    <form class="mt-6" @submit.prevent="update">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8">
        <text-input v-model="form.first_name" :error="form.errors.first_name" label="First name" />
        <text-input v-model="form.last_name" :error="form.errors.last_name" label="Last name" />
      </div>
      <div class="mt-6 flex justify-between">
        <loading-button :loading="form.processing" class="btn-indigo ml-auto" type="submit">Update Contact</loading-button>
      </div>
    </form>
  </Modal>
</template>
