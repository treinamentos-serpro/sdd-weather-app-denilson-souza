interface EmptyStateProps {
  title?: string;
  tip?: string;
}

function EmptyState({
  title = 'Nenhuma cidade encontrada',
  tip = 'Confira a grafia e tente buscar novamente.',
}: EmptyStateProps) {
  return (
    <div
      aria-labelledby="empty-state-title"
      className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
      role="region"
    >
      <h2 className="text-lg font-semibold text-white" id="empty-state-title">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/70">{tip}</p>
    </div>
  );
}

export type { EmptyStateProps };
export default EmptyState;
