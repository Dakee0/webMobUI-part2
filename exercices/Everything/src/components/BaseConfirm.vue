<script setup>
  const emit = defineEmits(['cancel', 'confirm']);

  function cancel() {
    emit('cancel');
  }

  function confirm() {
    emit('confirm');
  }

</script>

<template>
  <div>
    <slot>Are you sure ?</slot>
    <button @click="confirm()">confirm</button>
    <button @click="cancel()">cancel</button>
  </div>
</template>

<style scoped>
  /* modal */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>