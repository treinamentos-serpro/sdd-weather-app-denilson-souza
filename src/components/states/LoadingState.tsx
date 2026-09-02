function LoadingState() {
  return (
    <div
      aria-label="Carregando previsão do tempo"
      className="flex min-h-40 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-md"
      role="status"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-accent-400"
        />
        <span>Carregando previsão do tempo...</span>
      </div>
    </div>
  );
}

export default LoadingState;
