import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

describe('Sheet', () => {
  it('opens the sheet when the trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigation panel</SheetDescription>
          </SheetHeader>
          <SheetFooter>Actions</SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.queryByText('Menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open sheet' }));

    expect(
      await screen.findByRole('heading', { name: 'Menu' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Navigation panel')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('applies side variant class and can hide the close button', () => {
    render(
      <Sheet open>
        <SheetContent side="left" showCloseButton={false}>
          <SheetTitle>Left panel</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    const content = document.querySelector('[data-slot="sheet-content"]');
    expect(content).toBeInTheDocument();
    expect(content?.className).toContain('left-0');
    expect(content?.className).toContain('border-r');
    expect(screen.queryByText('Fechar')).not.toBeInTheDocument();
  });
});
