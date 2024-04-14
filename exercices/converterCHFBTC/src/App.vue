<script setup>
import { ref, computed } from 'vue';
import bitcoin from './assets/bitcoin.png';

const btcAmount = ref(0);
const chfAmount = ref(0);
//const btcToChfRate = ref(58880);

let btcToChfRate = ref(null);

async function fetchBtcRate() {
    try {
        const fetchedAPI = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=CHF`);
        const dataAPI = await fetchedAPI.json();
        btcToChfRate.value = dataAPI.bitcoin.chf;
        console.log("Taux actuel BTC à CHF:", btcToChfRate.value);

    } catch (error) {
      console.error("Erreur lors de la récupération du taux de change:", error);
    }
}

fetchBtcRate();


//Changement de la valeur de BTC
const computedBtc = computed({
  get: () => btcAmount.value,
  set: (val) => {
    btcAmount.value = val;
    if (btcToChfRate.value) {
      chfAmount.value = val * btcToChfRate.value;
    }
  }
});

//Changement de la valeur de CHF
const computedChf = computed({
  get: () => chfAmount.value,
  set: (val) => {
    chfAmount.value = val;
    if (btcToChfRate.value) {
      btcAmount.value = val / btcToChfRate.value;
    }
  }
});


</script>

<template>
  <div id="converter">
    <img :src="bitcoin" alt="Logo BTC" style="max-width: 300px; max-height: 100px;">
    <h1>Convertisseur BTC/CHF</h1>
    <p>
      BTC
      <br>
      <input type="number" v-model="computedBtc" placeholder="Entrez le montant en BTC">
    </p>
    <p>
      CHF
      <br>
      <input type="number" v-model="computedChf" placeholder="Entrez le montant en CHF">
    </p>
  </div>
</template>

<style scoped>

</style>
