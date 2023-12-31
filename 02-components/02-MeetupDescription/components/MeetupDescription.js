import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: {
      require: false,
    },
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
});
