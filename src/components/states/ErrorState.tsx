interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

function ErrorState({
  onRetry,
  message = 'Não foi possível carregar a previsão do tempo.',
}: ErrorStateProps) {
  return (
    <div
      aria-labelledby="weather-error-title"
      className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-red-300/20 bg-red-950/20 p-6 text-center backdrop-blur-md"
      role="alert"
    >
      <h2 className="text-lg font-semibold text-white" id="weather-error-title">
        Algo deu errado
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/75">{message}</p>
      <button
        className="mt-5 min-h-11 rounded-lg bg-accent-500 px-5 py-2 font-semibold text-white transition hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-night-900"
        onClick={onRetry}
        type="button"
      >
        Tentar novamente
      </button>
    </div>
  );
}

export type { ErrorStateProps };
export default ErrorState;
