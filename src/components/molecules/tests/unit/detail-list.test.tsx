import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailList } from '@/components/molecules/detail-list';

describe('DetailList', () => {
  it('returns null when there are no items', () => {
    const { container } = render(<DetailList items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders each detail item', () => {
    render(<DetailList items={['Shipped MVP', 'Led design system']} />);

    expect(screen.getByText('Shipped MVP')).toBeInTheDocument();
    expect(screen.getByText('Led design system')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('merges a custom className', () => {
    render(<DetailList items={['One']} className="custom-details" />);

    expect(screen.getByRole('list').className).toContain('custom-details');
  });
});
