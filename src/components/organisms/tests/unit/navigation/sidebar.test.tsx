import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from '@/components/organisms/navigation/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PERSONAL_INFO } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';

vi.mock('@/hooks/use-chess-com', () => ({
  useChessCom: () => ({ data: null, loading: true }),
}));

vi.mock('@/hooks', () => ({
  useNowPlaying: () => ({ is_playing: false }),
  useIsMobile: () => false,
}));

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
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

describe('Sidebar', () => {
  beforeEach(() => {
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

  it('renders profile info and navigation labels from messages', () => {
    renderWithProviders(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>,
    );

    expect(screen.getByText(PERSONAL_INFO.name)).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Tecnologias')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('Nada tocando agora')).toBeInTheDocument();
  });
});
