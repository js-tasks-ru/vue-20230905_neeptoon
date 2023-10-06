<template>
    <div class="toasts">
    <Toast
      v-for="(toast, index) in toasts"
      :key="index"
      :toast="toast"
      @destroy="destroyHandler"
    />
  </div>

</template>
<script>
import Toast from './Toast.vue';

export default {
  components: { Toast },

  emits: ['delete'],

  props: {
    toasts: {
      requierd: true,
      type: Array
    }
  },

  methods: {
    destroyHandler(toast) {
      this.$emit('delete', toast)
    }
  }
}
</script>
<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
