import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DropdownSettings } from '@/components/molecules/dropdown-settings';
import { renderWithProviders } from '@/tests/utils/render';

const setTheme = vi.fn();
const useThemeMock = vi.fn(() => ({
  theme: 'system' as string | undefined,
  setTheme,
}));

vi.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

describe('DropdownSettings', () => {
  beforeEach(() => {
    setTheme.mockClear();
    useThemeMock.mockReturnValue({ theme: 'system', setTheme });
  });

  it('opens the settings menu with theme and language options', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DropdownSettings />);

    await user.click(screen.getByRole('button', { name: 'Tema' }));

    expect(await screen.findByText('Tema')).toBeInTheDocument();
    expect(screen.getByText('Claro')).toBeInTheDocument();
    expect(screen.getByText('Escuro')).toBeInTheDocument();
    expect(screen.getByText('Sistema')).toBeInTheDocument();
    expect(screen.getByText('Idioma')).toBeInTheDocument();
    expect(screen.getByText('Inglês')).toBeInTheDocument();
    expect(screen.getByText('Português')).toBeInTheDocument();
    expect(screen.getByText('Espanhol')).toBeInTheDocument();
  });

  it('calls setTheme when a theme option is selected', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DropdownSettings />);

    await user.click(screen.getByRole('button', { name: 'Tema' }));
    await user.click(await screen.findByText('Escuro'));

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('renders language links as locale-prefixed document navigations', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DropdownSettings />);

    await user.click(screen.getByRole('button', { name: 'Tema' }));

    const english = (await screen.findByText('Inglês')).closest('a');
    expect(english).toHaveAttribute('href', '/en');
    expect(english).toHaveAttribute('hreflang', 'en');

    const spanish = screen.getByText('Espanhol').closest('a');
    expect(spanish).toHaveAttribute('href', '/es');
    expect(spanish).toHaveAttribute('hreflang', 'es');
  });

  it('keeps the prefix on the default locale so the locale cookie is rewritten', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DropdownSettings />);

    await user.click(screen.getByRole('button', { name: 'Tema' }));

    const portuguese = (await screen.findByText('Português')).closest('a');

    expect(portuguese).toHaveAttribute('href', '/pt-br');
    expect(portuguese).toHaveAttribute('hreflang', 'pt-br');
  });
});
