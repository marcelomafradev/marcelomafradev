import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from '@/components/ui/meter';

describe('Meter', () => {
  it('renders the meter composition with label and value', () => {
    render(
      <Meter value={40} min={0} max={100}>
        <MeterLabel>Progress</MeterLabel>
        <MeterValue />
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>,
    );

    expect(screen.getByText('Progress')).toHaveAttribute(
      'data-slot',
      'meter-label',
    );
    expect(document.querySelector('[data-slot="meter"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="meter-track"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="meter-indicator"]'),
    ).toBeInTheDocument();
  });
});
