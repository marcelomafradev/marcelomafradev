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
  it('floats as a rounded glass bar with a safe-area aware bottom offset', () => {
    renderWithProviders(<BottomTabs />);

    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    const classes = nav.className.split(/\s+/);

    expect(classes).toEqual(
      expect.arrayContaining([
        'fixed',
        'inset-x-3',
        'rounded-3xl',
        'border',
        'backdrop-blur-xl',
        'mx-auto',
        'max-w-md',
      ]),
    );
    expect(classes).not.toContain('inset-x-0');
    expect(classes).not.toContain('border-t');
    expect(classes).not.toContain('bottom-0');
    expect(classes.some((name) => name.startsWith('bottom-[calc('))).toBe(
      false,
    );
    expect(classes).toContain(
      'bottom-[max(0.75rem,env(safe-area-inset-bottom))]',
    );
  });

  it('rounds each tab link inside the floating bar', () => {
    renderWithProviders(<BottomTabs />);

    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    const list = within(nav).getByRole('list');
    const links = within(list).getAllByRole('link');

    expect(list).toHaveClass('h-14');
    expect(links).toHaveLength(6);
    links.forEach((link) => {
      expect(link.className.split(/\s+/)).toContain('rounded-2xl');
    });
  });

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
