import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandMark } from '@/components/atoms/brand-mark';

describe('BrandMark', () => {
  it('renders an image role with the default accessible name', () => {
    render(<BrandMark />);

    expect(
      screen.getByRole('img', { name: 'marcelomafradev' }),
    ).toBeInTheDocument();
  });

  it('uses a custom title as the accessible name', () => {
    render(<BrandMark title="Marcelo Mafra" />);

    expect(
      screen.getByRole('img', { name: 'Marcelo Mafra' }),
    ).toBeInTheDocument();
  });

  it('merges a custom className with the default size', () => {
    const { container } = render(<BrandMark className="custom-mark size-11" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('size-11');
    expect(svg).toHaveClass('custom-mark');
  });

  it('renders a default size when no className is given', () => {
    const { container } = render(<BrandMark />);

    expect(container.querySelector('svg')).toHaveClass('size-10');
  });

  it('paints the tile and the glyph with the theme tokens', () => {
    const { container } = render(<BrandMark />);

    const svg = container.querySelector('svg');
    const tile = svg?.querySelector(':scope > rect');
    const strokes = svg?.querySelectorAll('g path');
    const dot = svg?.querySelector('g > rect');

    expect(tile).toHaveClass('fill-primary');
    expect(strokes).toHaveLength(2);
    strokes?.forEach((stroke) => {
      expect(stroke).toHaveClass('stroke-primary-foreground');
    });
    expect(dot).toHaveClass('fill-primary-foreground');
  });
});
