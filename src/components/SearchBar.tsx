import { type FormEvent, useId, useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled: boolean;
}

function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [city, setCity] = useState('');
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCity = city.trim();
    if (!trimmedCity || disabled) {
      return;
    }

    onSearch(trimmedCity);
  }

  return (
    <form
      aria-label="Buscar cidade"
      aria-busy={disabled}
      className="flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row"
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <label className="text-sm font-medium text-white" htmlFor={inputId}>
          Cidade
        </label>
        <input
          aria-describedby={`${inputId}-hint`}
          className="min-h-11 w-full rounded-lg border border-white/10 bg-night-800/80 px-4 text-white outline-none transition placeholder:text-white/60 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
          id={inputId}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Digite o nome da cidade"
          type="search"
          value={city}
        />
        <span className="text-xs text-white/70" id={`${inputId}-hint`}>
          Informe uma cidade para consultar a previsão.
        </span>
      </div>
      <button
        className="min-h-11 rounded-lg bg-accent-500 px-5 py-2 font-semibold text-white transition hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-night-900 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export type { SearchBarProps };
export default SearchBar;
