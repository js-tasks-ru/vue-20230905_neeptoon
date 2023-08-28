import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      firstOperand: 0,
      seconcOperand: 0,
      toggled: '',
    };
  },

  computed: {
    result() {
      return {
        sum: this.firstOperand + this.seconcOperand,
        subtract: this.firstOperand - this.seconcOperand,
        multiply: this.firstOperand * this.seconcOperand,
        divide: this.firstOperand / this.seconcOperand,
      };
    },
  },

  template: `
  <div class="row">
    <div class="col">
      <input type="number" v-model="firstOperand"/>
    </div>

    <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
      <label><input type="radio" name="operator" value="sum"  v-model="toggled"/> ➕</label>
      <label><input type="radio" name="operator" value="subtract"  v-model="toggled"/> ➖</label>
      <label><input type="radio" name="operator" value="multiply"  v-model="toggled"/> ✖</label>
      <label><input type="radio" name="operator" value="divide" v-model="toggled"/> ➗</label>
    </div>

    <div class="col">
      <input type="number" v-model="seconcOperand"/>
    </div>

    <div class="col">=</div>

    <output class="col">{{ result[toggled] ?? 0 }}</output>
  </div>
  `,
}).mount('#app');

// Создайте Vue приложение
