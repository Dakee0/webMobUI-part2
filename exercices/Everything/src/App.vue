<script setup>
  import { ref, watch, computed } from 'vue';
  import TheHeader from './components/TheHeader.vue';
  import TheNav from './components/TheNav.vue';
  import AppSchedule from './AppSchedule.vue';

  const routes = {
    '#schedule': AppSchedule
  }

  const currentPath = ref(window.location.hash)
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })

  const currentView = computed(() => {
    return routes[currentPath.value]  || AppSchedule;
  })
</script>

<template>
  <TheHeader>IM - WebMobUi</TheHeader>
  <TheNav />
  <component :is="currentView" />
</template>

<style>
  ul {
    list-style-type: none; /* Enlève les puces */
    padding: 0;
  }
  * {
    margin: 0;
  }
</style>
