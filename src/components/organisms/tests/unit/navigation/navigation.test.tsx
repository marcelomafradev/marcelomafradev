import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Navigation } from '@/components/organisms/navigation/navigation';
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

describe('Navigation', () => {
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

  it('renders children and footer landmark', () => {
    renderWithProviders(
      <Navigation>
        <main>
          <h1>Page content</h1>
        </main>
      </Navigation>,
    );

    expect(
      screen.getByRole('heading', { name: 'Page content' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByText('Início')).toHaveLength(2);
    expect(
      screen.getByRole('navigation', { name: 'Navegação principal' }),
    ).toBeInTheDocument();
  });

  it('lets the document scroll on mobile and keeps the inner scroller on desktop', () => {
    const { container } = renderWithProviders(
      <Navigation>
        <p>Page content</p>
      </Navigation>,
    );

    const scroller = container.querySelector('main');

    expect(scroller).not.toBeNull();
    expect(scroller).toHaveClass('lg:overflow-y-auto');
    expect(scroller).toHaveClass('lg:max-h-svh');
    expect(scroller?.className).not.toMatch(/(^|\s)overflow-y-auto($|\s)/);
    expect(scroller?.className).not.toMatch(/(^|\s)max-h-svh($|\s)/);

    const wrapper = scroller?.firstElementChild;

    expect(wrapper).toHaveClass('min-h-[calc(100svh-4rem)]');
    expect(wrapper).toHaveClass('lg:min-h-full');
  });
});
