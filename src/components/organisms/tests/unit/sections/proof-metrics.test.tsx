import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProofMetrics } from '@/components/organisms/sections/proof-metrics';
import { METRICS } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';
import ptBr from '../../../../../../messages/pt-br.json';

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

const metricItems = ptBr.homepage.metrics.items;

describe('ProofMetrics', () => {
  it('renders the metrics heading from translations', () => {
    renderWithProviders(<ProofMetrics />);

    expect(
      screen.getByRole('heading', { name: ptBr.homepage.metrics.title }),
    ).toBeInTheDocument();
  });

  it('renders the eight monorepos delivered in the monorepos metric', () => {
    renderWithProviders(<ProofMetrics />);

    const monorepos = METRICS.find((metric) => metric.id === 'monorepos');

    expect(monorepos?.value).toBe('8');
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText(metricItems.monorepos.label)).toBeInTheDocument();
  });

  it('renders fifty or more back-end services in the services metric', () => {
    renderWithProviders(<ProofMetrics />);

    const services = METRICS.find((metric) => metric.id === 'services');

    expect(services?.value).toBe('50');
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText(metricItems.services.label)).toBeInTheDocument();
  });

  it('lays the metrics out in two columns on small screens', () => {
    const { container } = renderWithProviders(<ProofMetrics />);

    const grid = container.querySelector('section .grid');

    expect(grid).not.toBeNull();
    expect(grid).toHaveClass('grid-cols-2');
    expect(grid).toHaveClass('xl:grid-cols-4');
    expect(grid).not.toHaveClass('sm:grid-cols-2');
  });

  it('renders the label and description of every metrics item', () => {
    renderWithProviders(<ProofMetrics />);

    const items = Object.values(metricItems);

    expect(items).toHaveLength(4);

    for (const item of items as { label: string; description: string }[]) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });
});
