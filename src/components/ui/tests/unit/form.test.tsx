import { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormValues = { email: string };

function EmailForm({
  onSubmit = vi.fn(),
  defaultValues = { email: '' },
  forceError = false,
}: {
  onSubmit?: (values: FormValues) => void;
  defaultValues?: FormValues;
  forceError?: boolean;
}) {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (forceError) {
      form.setError('email', { type: 'manual', message: 'Email is required' });
    }
  }, [forceError, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('renders form item, label, control, and description', () => {
    render(<EmailForm />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByText('We never share your email.')).toBeInTheDocument();
  });

  it('submits values through react-hook-form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<EmailForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText('you@example.com'),
      'dev@example.com',
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { email: 'dev@example.com' },
        expect.anything(),
      );
    });
  });

  it('shows a field error message', async () => {
    render(<EmailForm forceError />);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
