import { render, screen } from '@testing-library/react';
import { Mail } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { ContactChannel } from '@/components/molecules/contact-channel';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('ContactChannel', () => {
  it('renders label and value without a link when href is omitted', () => {
    render(
      <ContactChannel icon={Mail} label="Email" value="hello@example.com" />,
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hello@example.com')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders as an external link when href is provided', () => {
    render(
      <ContactChannel
        icon={Mail}
        label="Email"
        value="hello@example.com"
        href="mailto:hello@example.com"
      />,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:hello@example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
