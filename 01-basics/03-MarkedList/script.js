import { createApp } from './vendor/vue.esm-browser.js';

// From https://jsonplaceholder.typicode.com/comments
const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

createApp({
  data() {
    return {
      items: emails,
      current: '',
    };
  },

  computed: {
    matches() {
      return this.items.map((item) =>
        item.toLowerCase().includes(this.current.toLowerCase()) && this.current
          ? { mail: item, marked: true }
          : { mail: item },
      );
    },
  },

  template: `
      <div class="container">
        <div class="form-group">
          <input type="search" v-model="current"/>
        </div>
        <ul>
          <li v-for="(item, index) in matches" :class="{marked: matches[index].marked}">{{ item.mail }}</li>
        </ul>
      </div>`,
}).mount('#app');

// Требуется создать Vue приложение
