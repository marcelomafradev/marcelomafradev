import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea', () => {
  it('renders with the textarea data-slot', () => {
    render(<Textarea aria-label="Message" />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute(
      'data-slot',
      'textarea',
    );
  });

  it('updates value on change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Textarea aria-label="Bio" onChange={onChange} />);

    const field = screen.getByRole('textbox', { name: 'Bio' });
    await user.type(field, 'Hello');

    expect(onChange).toHaveBeenCalled();
    expect(field).toHaveValue('Hello');
  });

  it('is disabled when the disabled prop is set', () => {
    render(<Textarea disabled aria-label="Notes" />);

    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeDisabled();
  });
});
