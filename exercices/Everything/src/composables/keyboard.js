import { onUnmounted } from "vue";
import Keyboard from "../utils/Keyboards.js";

export function useKeyboard() {
  const keyboard = new Keyboard({useCode: false});

  onUnmounted(() => {
    keyboard.destroy();
  });

  return { keyboard  };
}