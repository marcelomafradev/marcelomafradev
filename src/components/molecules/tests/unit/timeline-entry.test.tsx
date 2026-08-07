import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TimelineEntry } from '@/components/molecules/timeline-entry';

describe('TimelineEntry', () => {
  it('renders title, subtitle, meta, and details', () => {
    render(
      <TimelineEntry
        title="Senior Engineer"
        subtitle="Acme Corp"
        meta="2022 — Present"
        details={['Led platform rewrite', 'Mentored juniors']}
      />,
    );

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('2022 — Present')).toBeInTheDocument();
    expect(screen.getByText('Led platform rewrite')).toBeInTheDocument();
    expect(screen.getByText('Mentored juniors')).toBeInTheDocument();
  });

  it('renders an optional leading slot', () => {
    render(
      <TimelineEntry
        title="Role"
        leading={<span data-testid="leading-slot">L</span>}
      />,
    );

    expect(screen.getByTestId('leading-slot')).toBeInTheDocument();
  });

  it('omits the details list when empty', () => {
    render(<TimelineEntry title="Solo title" />);

    expect(screen.getByText('Solo title')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
