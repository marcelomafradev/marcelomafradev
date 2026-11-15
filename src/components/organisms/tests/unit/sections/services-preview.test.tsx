import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ServicesPreview } from '@/components/organisms/sections/services-preview';
import { SERVICE_OFFERINGS } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';

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

describe('ServicesPreview', () => {
  it('renders the section heading from translations', () => {
    renderWithProviders(<ServicesPreview />);

    expect(
      screen.getByRole('heading', { name: 'Como posso ajudar' }),
    ).toBeInTheDocument();
    expect(document.getElementById('services')).toBeTruthy();
  });

  it('renders one title per service offering', () => {
    renderWithProviders(<ServicesPreview />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      SERVICE_OFFERINGS.length,
    );
    expect(
      screen.getByRole('heading', { name: 'Arquitetura e liderança técnica' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Produtos sob encomenda' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Modernização e plataformas' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Engenharia com IA' }),
    ).toBeInTheDocument();
  });

  it('links to the services page with the call to action', () => {
    renderWithProviders(<ServicesPreview />);

    expect(screen.getByRole('link', { name: /Ver serviços/i })).toHaveAttribute(
      'href',
      '/services',
    );
  });
});
