<script setup>
import { ref, computed, watch } from 'vue';

const kelvin = ref(273.15);

const kelvinComputed = computed({
  get: () => kelvin.value.toFixed(2),
  set: (value) => {
    kelvin.value = parseFloat(value);
  }
});

const celsius = computed({
  get: () => (kelvin.value - 273.15).toFixed(2),
  set: (newValue) => {
    kelvin.value = parseFloat(newValue) + 273.15;
  },
});

const farenheit = computed({
  get: () => ((kelvin.value - 273.15) * 9 / 5 + 32).toFixed(2),
  set: (newValue) => {
    kelvin.value = (parseFloat(newValue) - 32) * 5 / 9 + 273.15;
  },
});


watch(kelvin, (newValue) => {
  console.log(`Kelvin: ${newValue}, Celsius: ${celsius.value}, Farenheit: ${farenheit.value}`);
});

</script>

<template>
  <div>
    <p>
      Kelvin:
      <input v-model.number="kelvinComputed" type="number" placeholder="Kelvin">
    </p>
    <p>
      Celsius:
      <input v-model.number="celsius" type="number" placeholder="Celsius">
    </p>
    <p>
      Farenheit:
      <input v-model.number="farenheit" type="number" placeholder="Farenheit">
    </p>
    <br>
    <h2>Testings</h2>
    <p>Celsius: {{ celsius }}</p>
    <p>Farenheit: {{ farenheit }}</p>
  </div>

</template>

<style scoped></style>
