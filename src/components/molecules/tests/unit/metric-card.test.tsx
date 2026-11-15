import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MetricCard } from '@/components/molecules/metric-card';

// MetricCard imports StatValue from the atoms barrel, which loads Link → navigation.
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
}));

describe('MetricCard', () => {
  it('renders value, label, and description', () => {
    render(
      <MetricCard
        value="12"
        label="Projects"
        description="Shipped this year"
      />,
    );

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Shipped this year')).toBeInTheDocument();
  });

  it('renders an optional accent on the value', () => {
    render(
      <MetricCard
        value="99"
        accent="%"
        label="Uptime"
        description="Last quarter"
      />,
    );

    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('keeps the card compact on small screens', () => {
    render(
      <MetricCard
        value="21"
        label="Projects"
        description="Shipped this year"
      />,
    );

    const content = screen.getByText('Projects').parentElement;

    expect(content).toHaveClass('space-y-2');
    expect(content).toHaveClass('p-4');
    expect(content).toHaveClass('pt-5');
    expect(content).toHaveClass('sm:space-y-2.5');
    expect(content).toHaveClass('sm:p-5');
    expect(content).toHaveClass('sm:pt-6');
  });

  it('uses tighter text rhythm for the label and description', () => {
    render(
      <MetricCard
        value="21"
        label="Projects"
        description="Shipped this year"
      />,
    );

    expect(screen.getByText('Projects')).toHaveClass(
      'text-sm',
      'font-medium',
      'leading-snug',
    );
    expect(screen.getByText('Shipped this year')).toHaveClass(
      'text-xs',
      'leading-snug',
      'sm:leading-relaxed',
    );
  });

  it('marks the card with a decorative accent line', () => {
    const { container } = render(
      <MetricCard
        value="21"
        accent="+"
        label="Projects"
        description="Shipped this year"
      />,
    );

    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'bg-primary/70',
    );
  });
});
