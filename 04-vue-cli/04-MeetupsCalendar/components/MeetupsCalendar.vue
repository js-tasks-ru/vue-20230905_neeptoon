<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="increaseDate"></button>
        <div class="calendar-view__date">{{ viewDate }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="decreaseDate"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <template v-if="previousMonth.visibleDays !== 0">
        <div
          v-for="day in previousMonth.visibleDays"
          :key="day"
          class="calendar-view__cell calendar-view__cell_inactive"
          tabindex="0">
          <div class="calendar-view__cell-day">{{ day }}</div>
          <div class="calendar-view__cell-content"></div>
        </div>
      </template>


      <div
        v-for="(day, idx) in visibleMonth.amountDays"
        :key="day"
        class="calendar-view__cell"
        tabindex="0" >
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div v-if="visibleMonth.existMeetups[idx].length" class="calendar-view__cell-content">
          <a
            v-for="meetup in visibleMonth.existMeetups[idx]"
            :key="meetup.id"
            :href="`/meetups/${meetup.id}`"
            class="calendar-event"
          >
            {{ meetup.title }}
          </a>
        </div>
      </div>

      <template v-if="nextMonth.visibleDays !== 7">
        <div
          v-for="day in nextMonth.visibleDays"
          :key="day"
          class="calendar-view__cell calendar-view__cell_inactive"
          tabindex="0">
          <div class="calendar-view__cell-day">{{ day }}</div>
          <div class="calendar-view__cell-content"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
    const DATA = {
      MILLISECONDS_OF_DAY: 86400000,
      LAST_DAY_OF_WEEK_INDEX: 6,
      FIRST_DAY_OF_WEEK_INDEX: 0,
      AMOUNT_DAYS_OF_WEEK: 7,
    };

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    }
  },

  methods: {
    increaseDate() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1, 1))
    },

    decreaseDate() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1, 1))
    },
  },


  computed: {
    viewDate() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',

      })
    },
    selectedYear() {
      return this.date.getFullYear()
    },
    selectedMonth() {
      return this.date.getMonth()
    },
    visibleMonth() {
      const amountDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
      const firstDayNumber = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
      const lastDayNumber = new Date(this.selectedYear, this.selectedMonth, amountDays).getDay();
      const timestamps = new Array(amountDays).fill().map((item, idx) => {
        return new Date(this.selectedYear, this.selectedMonth, idx + 1).getTime()
      });
      const existMeetups = timestamps.map(timestamp => {
        return this.meetups.filter(meetup => {
          return meetup.date >= timestamp && meetup.date <= (timestamp + DATA.MILLISECONDS_OF_DAY)
        })
      } )
      return {amountDays, firstDayNumber, lastDayNumber, timestamps, existMeetups}
    },
    previousMonth() {
      const amountDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      const amountVisibleDays = this.visibleMonth.firstDayNumber !== DATA.FIRST_DAY_OF_WEEK_INDEX
        ? this.visibleMonth.firstDayNumber - 1
        : DATA.LAST_DAY_OF_WEEK_INDEX;
      const startsVisibleData = amountDays - amountVisibleDays + 1;
      const visibleDays = new Array(amountVisibleDays).fill(startsVisibleData).map((item, idx) => item += idx );
      return {amountDays, startsVisibleData, amountVisibleDays, visibleDays}
    },
    nextMonth() {
      const visibleDays =  DATA.AMOUNT_DAYS_OF_WEEK - this.visibleMonth.lastDayNumber;
      return {visibleDays}
    }
  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
