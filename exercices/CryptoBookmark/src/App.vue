<script setup>
import { ref, computed, onMounted } from 'vue';
import FavoriteButton from './bookmark/FavoriteButton.vue';

const coins = ref([]);

// État pour afficher uniquement les favoris
const showOnlyFavorites = ref(false);

const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);

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

//Filre les coins favoris
const filteredCoins = computed(() => {
  if (showOnlyFavorites.value) {
    return coins.value.filter(coin => favorites.value.includes(coin.id));
  }
  return coins.value;
});

// Mets à jour les favoris
const handleFavoritesUpdate = (updatedFavorites) => {
  favorites.value = updatedFavorites;
};

fetchCoins();

</script>

<template>
  <div>
    <h1>Crypto-currencies</h1>
    <button @click="showOnlyFavorites = !showOnlyFavorites">
      {{ showOnlyFavorites ? 'Voir Tous' : 'Voir Favoris' }}
    </button>
    <ul>
      <li v-for="coin in filteredCoins" :key="coin.id">
        <img :src="coin.image" :alt="coin.name" style="width: 20px; height: 20px;">
        {{ coin.name }} ({{ coin.symbol.toUpperCase() }}) - ${{ coin.current_price }}
        <FavoriteButton :coinId="coin.id" @updateFavorites="handleFavoritesUpdate" />
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
