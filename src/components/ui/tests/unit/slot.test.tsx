import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Slot } from '@/components/ui/slot';

describe('Slot', () => {
  it('returns null when children is not a valid element', () => {
    const { container } = render(<Slot>plain text</Slot>);

    expect(container).toBeEmptyDOMElement();
  });

  it('merges props onto the child element', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Slot className="from-slot" data-testid="slotted" onClick={onClick}>
        <button type="button" className="from-child">
          Press
        </button>
      </Slot>,
    );

    const button = screen.getByRole('button', { name: 'Press' });
    expect(button).toHaveAttribute('data-testid', 'slotted');
    expect(button.className).toContain('from-slot');
    expect(button.className).toContain('from-child');

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
