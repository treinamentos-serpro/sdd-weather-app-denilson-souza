import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import type { Unit } from './types/weather';
import { mockWeatherData } from './types/weather';

type AppStatus = 'idle' | 'loading' | 'empty' | 'error' | 'success';

function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const [status, setStatus] = useState<AppStatus>('idle');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

      if (normalizedQuery === 'erro') {
        setStatus('error');
        return;
      }

      if (!normalizedQuery.includes('são paulo') && !normalizedQuery.includes('sao paulo')) {
        setStatus('empty');
        return;
      }

      setStatus('success');
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [query, status]);

  function handleSearch(city: string) {
    setQuery(city);
    setStatus('loading');
  }

  function handleRetry() {
    setStatus('loading');
  }

  function renderContent() {
    switch (status) {
      case 'loading':
        return <LoadingState />;
      case 'empty':
        return <EmptyState />;
      case 'error':
        return (
          <ErrorState message="Não foi possível consultar os dados agora." onRetry={handleRetry} />
        );
      case 'success':
        return (
          <>
            <CurrentWeather
              city={mockWeatherData.city}
              current={mockWeatherData.current}
              unit={unit}
            />
            <ForecastList forecast={mockWeatherData.forecast} unit={unit} />
          </>
        );
      case 'idle':
        return (
          <section
            aria-labelledby="welcome-title"
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
          >
            <h1 className="text-2xl font-semibold text-white" id="welcome-title">
              Consulte o tempo da sua cidade
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-white/70">
              Busque uma cidade para acompanhar as condições atuais e a previsão dos próximos dias.
            </p>
          </section>
        );
    }
  }

  return (
    <div className="min-h-screen bg-night-900 text-white">
      <header className="border-b border-white/10 bg-night-800/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center">
          <a className="shrink-0 text-xl font-bold tracking-tight text-white" href="/">
            Clima<span className="text-accent-400">.</span>
          </a>
          <div className="min-w-0 flex-1">
            <SearchBar disabled={status === 'loading'} onSearch={handleSearch} />
          </div>
          <UnitToggle onChange={setUnit} unit={unit} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-12">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
