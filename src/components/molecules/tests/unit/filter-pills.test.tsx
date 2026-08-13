import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FilterPills } from '@/components/molecules/filter-pills';

const items = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
];

describe('FilterPills', () => {
  it('renders a tablist with the provided aria label', () => {
    render(
      <FilterPills
        items={items}
        value="all"
        onChange={vi.fn()}
        ariaLabel="Project filters"
      />,
    );

    expect(
      screen.getByRole('tablist', { name: 'Project filters' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks the active pill as selected', () => {
    render(
      <FilterPills
        items={items}
        value="web"
        onChange={vi.fn()}
        ariaLabel="Project filters"
      />,
    );

    expect(screen.getByRole('tab', { name: 'Web' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('calls onChange with the selected key when a pill is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FilterPills
        items={items}
        value="all"
        onChange={onChange}
        ariaLabel="Project filters"
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Mobile' }));

    expect(onChange).toHaveBeenCalledWith('mobile');
  });
});
