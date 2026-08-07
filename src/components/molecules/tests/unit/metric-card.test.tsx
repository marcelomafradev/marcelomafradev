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
});
