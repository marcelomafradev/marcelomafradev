import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AvailabilityBadge } from '@/components/atoms/availability-badge';

describe('AvailabilityBadge', () => {
  it('renders the availability label', () => {
    render(<AvailabilityBadge label="Open to work" />);

    expect(screen.getByText('Open to work')).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    const { container } = render(
      <AvailabilityBadge label="Available" className="custom-badge" />,
    );

    expect(container.firstChild).toHaveClass('custom-badge');
  });

  it('renders a decorative indicator with aria-hidden', () => {
    const { container } = render(<AvailabilityBadge label="Available" />);

    const indicator = container.querySelector('[aria-hidden]');
    expect(indicator).toBeInTheDocument();
    expect(indicator?.className).toContain('rounded-full');
  });
});
