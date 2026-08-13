import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

describe('Dialog', () => {
  it('opens content when the trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText('Confirm action')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(
      await screen.findByRole('heading', { name: 'Confirm action' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('renders controlled open content and can hide the close button', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Always open</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(
      screen.getByRole('heading', { name: 'Always open' }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="dialog-content"]'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Fechar')).not.toBeInTheDocument();
  });
});
