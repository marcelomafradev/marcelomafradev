import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

describe('Popover', () => {
  it('shows popover content after the trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open popover' }));

    expect(await screen.findByText('Popover body')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="popover-content"]'),
    ).toBeInTheDocument();
  });

  it('renders controlled open content', () => {
    render(
      <Popover open>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Always visible</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText('Always visible')).toBeInTheDocument();
  });
});
