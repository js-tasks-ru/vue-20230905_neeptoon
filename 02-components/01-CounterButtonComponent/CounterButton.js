import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      default: 0,
    },
  },
  emits: ['update:count'],

  // Компонент должен иметь входной параметр и порождать событие

  template: `<button @click="$emit('update:count', count + 1)" type="button">{{ count }}</button>`,
});
