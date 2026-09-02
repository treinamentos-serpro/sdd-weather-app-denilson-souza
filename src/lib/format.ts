function formatDayLabel(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    weekday: 'short',
  })
    .format(localDate)
    .replace('.', '')
    .replace(',', ' -');
}

export { formatDayLabel };
