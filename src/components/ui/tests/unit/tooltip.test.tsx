import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

describe('Tooltip', () => {
  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole('button', { name: 'Hover me' }));

    expect(await screen.findByText('Helpful tip')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tooltip-content"]'),
    ).toBeInTheDocument();
  });

  it('renders controlled open tooltip content', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Info</TooltipTrigger>
          <TooltipContent>Open tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText('Open tip')).toBeInTheDocument();
  });
});
