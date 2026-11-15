import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatValue } from '@/components/atoms/stat-value';

describe('StatValue', () => {
  it('renders the numeric value', () => {
    render(<StatValue value="42" />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders an optional accent suffix', () => {
    render(<StatValue value="99" accent="%" />);

    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('aligns the accent suffix on the number baseline', () => {
    render(<StatValue value="21" accent="+" />);

    const accent = screen.getByText('+');

    expect(accent).toHaveClass('align-baseline');
    expect(accent).not.toHaveClass('align-super');
  });

  it('omits the accent when not provided', () => {
    const { container } = render(<StatValue value="10" />);

    expect(container.querySelector('.text-primary')).not.toBeInTheDocument();
  });

  it('merges a custom className', () => {
    render(<StatValue value="7" className="custom-stat" />);

    expect(screen.getByText('7').className).toContain('custom-stat');
  });
});
