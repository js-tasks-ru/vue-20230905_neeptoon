import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

createApp({
  data() {
    return {
      currentMeetupId: '',
      meetup: '',
    };
  },

  watch: {
    async currentMeetupId(value) {
      this.meetup = await fetchMeetupById(value);
    },
  },

  template: `
  <div>
    <label><input type="radio" name="meetupId" value="1" v-model="currentMeetupId"/> 1</label>
    <label><input type="radio" name="meetupId" value="2" v-model="currentMeetupId"/> 2</label>
    <label><input type="radio" name="meetupId" value="3" v-model="currentMeetupId"/> 3</label>
    <label><input type="radio" name="meetupId" value="4" v-model="currentMeetupId"/> 4</label>
    <label><input type="radio" name="meetupId" value="5" v-model="currentMeetupId"/> 5</label>

    <hr />

    <h3>{{ meetup.title }}</h3>
  </div>`,
}).mount('#app');

// Требуется создать Vue приложение
