import { formatDayLabel } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherIcon } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  unit: Unit;
}

function ForecastCard({ day, unit }: ForecastCardProps) {
  return (
    <article className="flex min-h-52 min-w-0 flex-col rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-accent-400/50 hover:bg-white/10">
      <h3 className="break-words text-sm font-semibold capitalize text-white">
        {formatDayLabel(day.date)}
      </h3>
      <span aria-hidden="true" className="my-5 text-center text-5xl leading-none">
        {getWeatherIcon(day.conditionCode)}
      </span>
      <p className="break-words text-center text-sm text-white/70">{day.conditionLabel}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-5">
        <div>
          <p className="text-xs text-white/60">Máx.</p>
          <p className="text-lg font-semibold text-white">
            {formatTemperature(day.maxTemperatureCelsius, unit)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">Mín.</p>
          <p className="text-lg font-semibold text-white/80">
            {formatTemperature(day.minTemperatureCelsius, unit)}
          </p>
        </div>
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 text-center text-xs text-white/70">
        Chuva: {day.precipitationProbability}%
      </p>
    </article>
  );
}

export type { ForecastCardProps };
export default ForecastCard;
