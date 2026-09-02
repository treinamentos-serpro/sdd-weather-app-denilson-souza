import { type KeyboardEvent, useRef } from 'react';
import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

const units: Array<{ value: Unit; label: string }> = [
  { value: 'celsius', label: '°C' },
  { value: 'fahrenheit', label: '°F' },
];

function UnitToggle({ unit, onChange }: UnitToggleProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = {
      ArrowRight: Math.min(index + 1, units.length - 1),
      ArrowDown: Math.min(index + 1, units.length - 1),
      ArrowLeft: Math.max(index - 1, 0),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: units.length - 1,
    }[event.key];

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      aria-label="Unidade de temperatura"
      className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-md"
      role="group"
    >
      {units.map(({ value, label }, index) => {
        const isActive = unit === value;

        return (
          <button
            aria-label={value === 'celsius' ? 'Celsius' : 'Fahrenheit'}
            aria-pressed={isActive}
            className={`min-h-10 min-w-12 rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-night-900 ${isActive ? 'bg-accent-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            key={value}
            onClick={() => onChange(value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(button) => {
              buttonRefs.current[index] = button;
            }}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export type { UnitToggleProps };
export default UnitToggle;
