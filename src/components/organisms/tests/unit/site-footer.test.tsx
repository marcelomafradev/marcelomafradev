import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SiteFooter } from '@/components/organisms/site-footer';
import { PERSONAL_INFO } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';

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
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/',
}));

describe('SiteFooter', () => {
  it('renders landmark content from translations', () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(PERSONAL_INFO.name)).toBeInTheDocument();
    expect(
      screen.getByText('Arquitetura, produto e entrega.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Falar comigo' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(
      screen.getByText(/Todos os direitos reservados/),
    ).toBeInTheDocument();
  });
});
