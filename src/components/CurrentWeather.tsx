import { formatTemperature } from '../lib/temperature';
import { getWeatherIcon } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherData, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherData;
  unit: Unit;
}

function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  return (
    <section
      aria-labelledby="current-weather-title"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-md sm:p-8"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-accent-400">Agora em</p>
          <h1
            className="mt-2 break-words text-2xl font-semibold text-white"
            id="current-weather-title"
          >
            {city.name}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            {[city.region, city.country].filter(Boolean).join(', ')}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <span aria-hidden="true" className="shrink-0 text-5xl leading-none sm:text-6xl">
            {getWeatherIcon(current.conditionCode)}
          </span>
          <div>
            <p className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              {formatTemperature(current.temperatureCelsius, unit)}
            </p>
            <p className="mt-2 text-base text-white/80">{current.conditionLabel}</p>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
        <div className="rounded-lg bg-night-800/60 p-3">
          <dt className="text-xs text-white/60">Umidade</dt>
          <dd className="mt-1 text-lg font-semibold text-white">{current.humidity}%</dd>
        </div>
        <div className="rounded-lg bg-night-800/60 p-3">
          <dt className="text-xs text-white/60">Vento</dt>
          <dd className="mt-1 text-lg font-semibold text-white">{current.windSpeedKmh} km/h</dd>
        </div>
        <div className="rounded-lg bg-night-800/60 p-3">
          <dt className="text-xs text-white/60">Precipitação</dt>
          <dd className="mt-1 text-lg font-semibold text-white">{current.precipitationMm} mm</dd>
        </div>
        <div className="rounded-lg bg-night-800/60 p-3">
          <dt className="text-xs text-white/60">Pressão</dt>
          <dd className="mt-1 text-lg font-semibold text-white">{current.pressureHpa} hPa</dd>
        </div>
      </dl>
    </section>
  );
}

export type { CurrentWeatherProps };
export default CurrentWeather;
