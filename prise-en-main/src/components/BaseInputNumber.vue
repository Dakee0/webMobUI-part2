<script setup>
  import { round } from '../utils/math.js';

  defineOptions({
    inheritAttrs: false
  })


  const props = defineProps({
    unit: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    decimalPlaces: {
      type: Number,
      required: false,
      default: 2,
    },
  });

  const model = defineModel({
    get() {
      return round(props.modelValue, props.decimalPlaces);
    },
  });
</script>

<template>
  <div>
    <input
      v-model="model"
      type="number"
      v-bind="$attrs"
    >
    <span> {{ unit }}</span>
  </div>
</template>

<style scoped>
  input {
    display: inline-block;
    margin: 0.5rem 1rem;
  }
</style>