import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton', () => {
  it('renders a pulsing placeholder', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).toContain('bg-muted');
  });

  it('merges a custom className', () => {
    render(<Skeleton className="h-4 w-20" data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.className).toContain('h-4');
    expect(skeleton.className).toContain('w-20');
  });
});
