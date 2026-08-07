import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies the default variant styles', () => {
    render(<Badge>Default</Badge>);

    expect(screen.getByText('Default').className).toContain('bg-primary');
  });

  it('applies the outline variant styles', () => {
    render(<Badge variant="outline">Outline</Badge>);

    const badge = screen.getByText('Outline');
    expect(badge.className).toContain('text-foreground');
    expect(badge.className).not.toContain('bg-primary');
  });

  it('merges a custom className', () => {
    render(<Badge className="custom-badge">Tagged</Badge>);

    expect(screen.getByText('Tagged').className).toContain('custom-badge');
  });
});
