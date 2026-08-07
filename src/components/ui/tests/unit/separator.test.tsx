import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Separator } from '@/components/ui/separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-slot', 'separator');
    expect(separator.className).toContain('h-px');
    expect(separator.className).toContain('w-full');
  });

  it('renders a vertical separator when orientation is vertical', () => {
    render(<Separator orientation="vertical" data-testid="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator.className).toContain('h-full');
    expect(separator.className).toContain('w-px');
  });
});
