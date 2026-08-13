import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '@/components/atoms/progress-bar';

describe('ProgressBar', () => {
  it('renders a progressbar role', () => {
    render(<ProgressBar isActive progress={2} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('expands fully when active and applies transition duration from progress', () => {
    render(<ProgressBar isActive progress={3.5} />);

    const bar = screen.getByRole('progressbar');
    expect(bar.className).toContain('w-full');
    expect(bar).toHaveStyle({ transitionDuration: '3.5s' });
  });

  it('collapses and zeroes duration when inactive', () => {
    render(<ProgressBar isActive={false} progress={4} />);

    const bar = screen.getByRole('progressbar');
    expect(bar.className).toContain('w-0');
    expect(bar).toHaveStyle({ transitionDuration: '0s' });
  });
});
