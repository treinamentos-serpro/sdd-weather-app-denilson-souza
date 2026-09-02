import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';

afterEach(() => {
  vi.useRealTimers();
});

describe('App', () => {
  it('exibe a busca no estado inicial', () => {
    render(<App />);

    expect(screen.getByRole('search', { name: 'Buscar cidade' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Consulte o tempo da sua cidade' }),
    ).toBeInTheDocument();
  });

  it('exibe o relatório mockado após buscar uma cidade', () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.change(screen.getByRole('searchbox', { name: 'Cidade' }), {
      target: { value: 'São Paulo' },
    });
    fireEvent.submit(screen.getByRole('search', { name: 'Buscar cidade' }));

    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.getByRole('heading', { name: 'Sao Paulo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Previsão para 5 dias' })).toBeInTheDocument();
    expect(screen.getAllByText(/Chuva:/)).toHaveLength(5);
  });
});
