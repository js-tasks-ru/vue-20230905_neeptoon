<template>
  <TheToastList :toasts="toasts" @deleteToast="deleteToast" @delete="deleteToast"/>
</template>

<script>
import { nanoid } from 'nanoid'
import TheToastList from './TheToastList.vue';

export default {
  name: 'TheToaster',

  components: { TheToastList },

  data() {
    return {
      toasts: []
    }
  },

  methods: {
    success(message, time = 5000) {
      this.toasts.push({type: 'success', message, time, id: nanoid()})
    },

    error(message, time = 5000) {
      this.toasts.push({type: 'error', message, time, id: nanoid()})
    },

    deleteToast(toast) {
      this.toasts = this.toasts.filter((item) => item.id !== toast.id)
    }
  }
};
</script>
