import type { Unit } from '../types/weather';

function convertTemperature(temperatureCelsius: number, unit: Unit): number {
  if (unit === 'celsius') {
    return temperatureCelsius;
  }

  return (temperatureCelsius * 9) / 5 + 32;
}

function formatTemperature(temperatureCelsius: number, unit: Unit): string {
  const temperature = convertTemperature(temperatureCelsius, unit);
  const suffix = unit === 'celsius' ? '°C' : '°F';

  return `${Math.round(temperature)}${suffix}`;
}

export { convertTemperature, formatTemperature };
