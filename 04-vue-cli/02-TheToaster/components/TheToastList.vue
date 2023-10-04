<template>
    <div class="toasts">
    <TheToast
      v-for="(toast, index) in toasts"
      :key="index"
      :type="toast.type"
      :message="toast.message"
      :id="toast.id"
      @close="closeHandler(toast.id)"
    />
  </div>

</template>
<script>
import TheToast from './TheToast.vue';

export default {
  components: { TheToast },

  emits: ['deleteToast'],

  props: {
    toasts: {
      requierd: true,
      type: Array
    }
  },

  methods: {
    closeHandler(id) {
      this.$emit('deleteToast', id)
    }

  },
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
