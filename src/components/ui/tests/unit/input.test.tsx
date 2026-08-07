import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('renders a textbox with the input data-slot', () => {
    render(<Input placeholder="Email" />);

    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('data-slot', 'input');
    expect(input.tagName).toBe('INPUT');
  });

  it('forwards type and calls onChange with typed value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input type="email" onChange={onChange} aria-label="Email" />);

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('type', 'email');

    await user.type(input, 'a@b.com');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('a@b.com');
  });

  it('is not editable when disabled', () => {
    render(<Input disabled aria-label="Name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
  });
});
