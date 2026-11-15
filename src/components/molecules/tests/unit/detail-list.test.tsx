import { render, screen, within } from '@testing-library/react';
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

  it('collapses the overflow items behind a details toggle', () => {
    const { container } = render(
      <DetailList
        items={['One', 'Two', 'Three', 'Four', 'Five', 'Six']}
        visibleCount={3}
        moreLabel="More"
      />,
    );

    const details = container.querySelector('details') as HTMLElement;

    expect(details).not.toBeNull();
    expect(details.querySelector('summary')).toHaveTextContent('More');
    expect(details.querySelector('summary')).toHaveClass(
      'text-primary',
      'cursor-pointer',
    );
    expect(within(details).getAllByRole('listitem')).toHaveLength(3);

    for (const label of ['One', 'Two', 'Three']) {
      expect(details).not.toContainElement(screen.getByText(label));
    }

    for (const label of ['Four', 'Five', 'Six']) {
      expect(within(details).getByText(label)).toBeInTheDocument();
    }
  });

  it('keeps every item visible when the list fits the visible count', () => {
    const { container } = render(
      <DetailList
        items={['One', 'Two', 'Three']}
        visibleCount={3}
        moreLabel="More"
      />,
    );

    expect(container.querySelector('details')).toBeNull();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders every item when no visible count is given', () => {
    const { container } = render(
      <DetailList items={['One', 'Two', 'Three', 'Four']} moreLabel="More" />,
    );

    expect(container.querySelector('details')).toBeNull();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
