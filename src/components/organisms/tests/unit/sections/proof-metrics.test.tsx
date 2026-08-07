import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProofMetrics } from '@/components/organisms/sections/proof-metrics';
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

describe('ProofMetrics', () => {
  it('renders the metrics heading from translations', () => {
    renderWithProviders(<ProofMetrics />);

    expect(
      screen.getByRole('heading', { name: 'Escala do que já entreguei' }),
    ).toBeInTheDocument();
  });
});
