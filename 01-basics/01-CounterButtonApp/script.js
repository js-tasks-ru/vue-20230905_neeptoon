import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increment() {
      this.count++;
    },
  },

  template: `
    <button @click='increment'>
     {{count}}
    </button>
  `,
}).mount('#app');

// Создайте Vue приложение
