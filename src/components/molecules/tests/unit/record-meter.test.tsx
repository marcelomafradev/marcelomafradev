import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RecordMeter } from '@/components/molecules/record-meter';

const entries = [
  {
    id: 'wins',
    label: 'Wins',
    value: 12,
    swatchClassName: 'bg-green-500',
  },
  {
    id: 'losses',
    label: 'Losses',
    value: 4,
    swatchClassName: 'bg-red-500',
  },
];

describe('RecordMeter', () => {
  it('renders label, summary, and entry values', () => {
    render(
      <RecordMeter
        label="Record"
        summary="12W · 4L"
        percent={75}
        entries={entries}
      />,
    );

    expect(screen.getByText('Record')).toBeInTheDocument();
    expect(screen.getByText('12W · 4L')).toBeInTheDocument();
    expect(screen.getByText('Wins')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Losses')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('exposes the summary via aria-valuetext on the meter', () => {
    render(
      <RecordMeter
        label="Record"
        summary="75% win rate"
        percent={75}
        entries={entries}
      />,
    );

    const meter = document.querySelector('[data-slot="meter"]');
    expect(meter).toHaveAttribute('aria-valuetext', '75% win rate');
  });
});
