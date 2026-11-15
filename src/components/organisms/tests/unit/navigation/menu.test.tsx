import { createRef } from 'react';
import { act, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Menu } from '@/components/organisms/navigation/menu';
import { renderWithProviders } from '@/tests/utils/render';

vi.mock('@/hooks/use-chess-com', () => ({
  useChessCom: () => ({ data: null, loading: true }),
}));

vi.mock('@/hooks', () => ({
  useNowPlaying: () => ({ is_playing: false }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'system', setTheme: vi.fn() }),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
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
  usePathname: () => '/',
}));

function setWindowScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value,
  });
}

describe('Menu', () => {
  beforeEach(() => {
    setWindowScrollY(0);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('opens the sheet and shows navigation labels from messages', async () => {
    const user = userEvent.setup();
    const scrollableDivRef = createRef<HTMLDivElement>();

    renderWithProviders(<Menu scrollableDivRef={scrollableDivRef} />);

    expect(screen.getByText('Nada tocando agora')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    expect(await screen.findByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Tecnologias')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(
      screen.getByText('Navegue entre as páginas, troque o tema e o idioma.'),
    ).toBeInTheDocument();
  });

  it('renders a home link with the brand mark in the top bar', () => {
    const scrollableDivRef = createRef<HTMLDivElement>();

    renderWithProviders(<Menu scrollableDivRef={scrollableDivRef} />);

    const homeLink = screen.getByRole('link', { name: 'Marcelo Mafra' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(
      within(homeLink).getByRole('img', { name: 'marcelomafradev' }),
    ).toBeInTheDocument();
  });

  it('hides the fixed trigger bar after deep scroll on the page container', () => {
    const node = document.createElement('div');
    Object.defineProperty(node, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0,
    });
    const scrollableDivRef = { current: node };

    const { container } = renderWithProviders(
      <Menu scrollableDivRef={scrollableDivRef} />,
    );

    const topBar = container.querySelector('.fixed.inset-x-0.top-0');
    expect(topBar?.className).not.toContain('hidden');

    act(() => {
      node.scrollTop = 900;
      fireEvent.scroll(node);
    });

    expect(topBar?.className).toContain('hidden');
  });

  it('hides the fixed trigger bar after deep scroll of the document on mobile', () => {
    const node = document.createElement('div');
    Object.defineProperty(node, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0,
    });
    const scrollableDivRef = { current: node };

    const { container } = renderWithProviders(
      <Menu scrollableDivRef={scrollableDivRef} />,
    );

    const topBar = container.querySelector('.fixed.inset-x-0.top-0');
    expect(topBar?.className).not.toContain('hidden');

    act(() => {
      setWindowScrollY(900);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(topBar?.className).toContain('hidden');
  });
});
