<script setup>
import { ref, onMounted } from 'vue';

const coins = ref([]);
const searchQuery = ref('');

// Requête de la liste de tous les coins à l'api
const fetchCoins = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    coins.value = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
};


fetchCoins();

</script>

<template>
  <div>
    <h1>Crypto-currencies</h1>
    <ul>
      <li v-for="coin in coins" :key="coin.id">
        <img :src="coin.image" :alt="coin.name" style="width: 20px; height: 20px;">
        {{ coin.name }} ({{ coin.symbol.toUpperCase() }}) - ${{ coin.current_price }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  ul {
    list-style-type: none; /* Enlève les puces */
    padding: 0;
  }
  li {
    margin-bottom: 10px; /* Espacement entre les items */
  }
</style>
