<script setup>
import { ref, computed } from 'vue';
import scheduleData from './mock/schedule.json';
import BaseConfirm from './components/BaseConfirm.vue';
import { useJsonStorage } from './composables/jsonStorage.js';
import { useKeyboard } from './composables/keyboard.js';
//import { toggleFavorite } from './stores/bookmarks.js';

const schedule = ref(scheduleData);

const scheduleOrderByDate = computed(() => {
  return schedule.value.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
});

const { data: showHistory } = useJsonStorage('SCHEDULE_history', false);
const { data: selectedCourse } = useJsonStorage('SCHEDULE_selectedCourse', 'Tous');


const scheduleFiltered = computed(() => {
  if (showHistory.value) {
    return scheduleOrderByDate.value;
  }
  return scheduleOrderByDate.value.filter((item) => {
    return new Date(item.start) > new Date();
  });
});

const showConfirm = ref(false);
let currentItem = null;

function confirmAsk(item) {
  currentItem = item;
  showConfirm.value = true;
}

function confirmDelete() {
  showConfirm.value = false;
  schedule.value = schedule.value.filter((item) => {
    return item !== currentItem;
  });

}

const { keyboard } = useKeyboard();

keyboard.onKey('h', () => {
  console.log('h');
  showHistory.value = !showHistory.value;
});

keyboard.onKeys(['Control', 's'], () => {
  console.log('save to ...');
});

</script>

<template>
  <div>
    <h1>App Schedule</h1>

    <BaseConfirm v-if="showConfirm" @cancel="showConfirm = false" @confirm="confirmDelete()">
      Sure bro?
    </BaseConfirm>

    <button @click="showHistory = !showHistory">
      {{ showHistory ? 'Hide' : 'Show' }} History
    </button>
    <ul>
      <li v-for="item in scheduleFiltered" :key="item.id">
        {{ item.start }} {{ item.label }}
        <button @click="confirmAsk(item)">delete</button>
      </li>
    </ul>
  </div>

  <button @click="toggleFavorite">
    {{ isFavorited ? '★' : '☆' }}
  </button>

</template>

<style scoped>

</style>