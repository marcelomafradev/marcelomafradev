import { screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BottomTabs } from '@/components/organisms/navigation/bottom-tabs';
import { renderWithProviders } from '@/tests/utils/render';

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
  usePathname: () => '/projects',
}));

describe('BottomTabs', () => {
  it('renders only internal pages as tabs with label and href', () => {
    renderWithProviders(<BottomTabs />);

    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/about',
      '/projects',
      '/technologies',
      '/services',
      '/contact',
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      'Início',
      'Sobre',
      'Projetos',
      'Tecnologias',
      'Serviços',
      'Contato',
    ]);
  });

  it('marks the tab matching the current pathname as the current page', () => {
    renderWithProviders(<BottomTabs />);

    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Início' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
