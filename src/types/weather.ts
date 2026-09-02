export type Unit = 'celsius' | 'fahrenheit';

export interface City {
  id: number | string;
  name: string;
  country: string;
  countryCode?: string;
  region?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface CurrentWeather {
  observedAt: string;
  temperatureCelsius: number;
  conditionCode: number;
  conditionLabel: string;
  humidity: number;
  windSpeedKmh: number;
  precipitationMm: number;
  pressureHpa: number;
  timezone?: string;
}

export interface ForecastDay {
  date: string;
  minTemperatureCelsius: number;
  maxTemperatureCelsius: number;
  precipitationProbability: number;
  conditionCode: number;
  conditionLabel: string;
}

export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: ForecastDay[];
  fetchedAt: string;
}

export const mockWeatherData: WeatherData = {
  city: {
    id: 3448439,
    name: 'Sao Paulo',
    country: 'Brasil',
    countryCode: 'BR',
    region: 'Sudeste',
    admin1: 'Sao Paulo',
    latitude: -23.5475,
    longitude: -46.6361,
    timezone: 'America/Sao_Paulo',
  },
  current: {
    observedAt: '2026-09-02T10:00:00-03:00',
    temperatureCelsius: 22,
    conditionCode: 2,
    conditionLabel: 'Parcialmente nublado',
    humidity: 68,
    windSpeedKmh: 14,
    precipitationMm: 0,
    pressureHpa: 1014,
    timezone: 'America/Sao_Paulo',
  },
  forecast: [
    {
      date: '2026-09-02',
      minTemperatureCelsius: 17,
      maxTemperatureCelsius: 24,
      precipitationProbability: 20,
      conditionCode: 2,
      conditionLabel: 'Parcialmente nublado',
    },
    {
      date: '2026-09-03',
      minTemperatureCelsius: 16,
      maxTemperatureCelsius: 25,
      precipitationProbability: 5,
      conditionCode: 0,
      conditionLabel: 'Ceu limpo',
    },
    {
      date: '2026-09-04',
      minTemperatureCelsius: 18,
      maxTemperatureCelsius: 26,
      precipitationProbability: 65,
      conditionCode: 61,
      conditionLabel: 'Chuva fraca',
    },
    {
      date: '2026-09-05',
      minTemperatureCelsius: 17,
      maxTemperatureCelsius: 23,
      precipitationProbability: 40,
      conditionCode: 3,
      conditionLabel: 'Nublado',
    },
    {
      date: '2026-09-06',
      minTemperatureCelsius: 15,
      maxTemperatureCelsius: 22,
      precipitationProbability: 15,
      conditionCode: 1,
      conditionLabel: 'Predominantemente limpo',
    },
  ],
  fetchedAt: '2026-09-02T10:00:05-03:00',
};
