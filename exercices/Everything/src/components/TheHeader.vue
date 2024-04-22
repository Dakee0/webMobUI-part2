<script setup>

</script>

<template>
    <header>
      <h1><slot></slot></h1>
    </header>
</template>

<style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    margin: 0;
  }
</style>