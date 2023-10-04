<template>
  <TheToastList :toasts="toasts" @deleteToast="deleteToast"/>
</template>

<script>
import TheToast from './TheToast.vue';
import TheToastList from './TheToastList.vue';

export default {
  name: 'TheToaster',

  components: { TheToast, TheToastList },

  data() {
    return {
      toasts: []
    }
  },

  watch: {
    toasts(newToastsList) {
      if (newToastsList.length) {
        setTimeout(() => {
          this.toasts.splice(0, 1)
        }, 5000)
      }
    }
  },

  methods: {
    success(message) {
      this.toasts = [...this.toasts, {type: 'success', message, id: Date.now()}]
    },

    error(message) {
      this.toasts = [...this.toasts, {type: 'error', message, id: Date.now()}]
    },

    deleteToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    }
  }
};
</script>
