export function round(value, decimalPlaces = 2) {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  
  }