<template>
    <div class="toast" :class="$options.CLASS[type]" @click="clickHandler(id)">
      <UiIcon class="toast__icon" :icon="$options.ICON[type]" />
      <span>{{ message }}</span>
  </div>

</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToast',

  components: { UiIcon },

  CLASS: {
    success: 'toast_success',
    error: 'toast_error',
  },

  ICON: {
    success: 'check-circle',
    error: 'alert-circle',
  },

  emits: ['close'],

  props: {
    type: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: String,
    }
  },

  methods: {
    clickHandler(id) {
      this.$emit('close', id)
    }
  }

}
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
