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

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    locale,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
    locale?: string;
  }) => (
    <a href={href} data-locale={locale} {...rest}>
      {children}
    </a>
  ),
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

  it('renders language links with locale targets', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DropdownSettings />);

    await user.click(screen.getByRole('button', { name: 'Tema' }));

    const english = await screen.findByText('Inglês');
    const englishLink = english.closest('a');
    expect(englishLink).toHaveAttribute('href', '/');
    expect(englishLink).toHaveAttribute('data-locale', 'en');

    const portuguese = screen.getByText('Português').closest('a');
    expect(portuguese).toHaveAttribute('data-locale', 'pt-br');

    const spanish = screen.getByText('Espanhol').closest('a');
    expect(spanish).toHaveAttribute('data-locale', 'es');
  });
});
