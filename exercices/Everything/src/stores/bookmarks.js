import { ref, watchEffect } from 'vue';

// Props reçues de App.vue
const props = defineProps({
    coinId: {
        type: String,
        required: true
    }
});

// Événements émis par le composant
const emit = defineEmits(['updateFavorites']);

// Charge et met à jour les favoris localement
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
const isFavorited = ref(favorites.value.includes(props.coinId));

watchEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
    emit('updateFavorites', favorites.value); // Informer le parent des mises à jour
});

const toggleFavorite = () => {
    const index = favorites.value.indexOf(props.coinId);
    if (index === -1) {
        favorites.value.push(props.coinId);
    } else {
        favorites.value.splice(index, 1);
    }
    isFavorited.value = !isFavorited.value;
};

export { toggleFavorite };