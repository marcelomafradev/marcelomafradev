import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from '@/components/ui/label';

describe('Label', () => {
  it('renders label text with the label data-slot', () => {
    render(<Label htmlFor="name">Name</Label>);

    const label = screen.getByText('Name');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('data-slot', 'label');
    expect(label).toHaveAttribute('for', 'name');
  });

  it('merges a custom className', () => {
    render(<Label className="extra-label">Email</Label>);

    expect(screen.getByText('Email').className).toContain('extra-label');
  });
});
