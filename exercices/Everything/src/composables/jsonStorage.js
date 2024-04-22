import { ref, watch } from 'vue';
import { setItem, getItem } from '../utils/jsonStorage.js';

export function useJsonStorage(key, defaultValue = null) {
  const data = ref();

  data.value = getItem(key, defaultValue);

  watch(data, () => setItem(key, data.value));

  return { data };
}