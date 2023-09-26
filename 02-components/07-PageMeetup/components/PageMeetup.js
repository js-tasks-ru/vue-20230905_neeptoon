import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      currentMeetup: this.meetupId,
      loading: true,
      error: false,
      errorMessage: undefined,
    };
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  methods: {
    async getCurrentMeetup(id) {
      try {
        this.loading = true;
        this.error = false;
        this.currentMeetup = await fetchMeetupById(id);
        this.loading = false;
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;
      }
    },
  },

  watch: {
    meetupId: {
      handler(newId) {
        this.getCurrentMeetup(newId);
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="!loading" :meetup="currentMeetup"/>


      <UiContainer v-if="loading  && !error">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert :text="errorMessage"/>
      </UiContainer>
    </div>`,
});
