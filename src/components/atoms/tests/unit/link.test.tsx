import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Link } from '@/components/atoms/link';

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
  locales: ['en', 'pt-br', 'es'],
  localePrefix: 'as-needed',
  Link: ({
    href,
    children,
    locale,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
    locale?: string;
  }) => (
    <a href={href} data-locale={locale} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('Link', () => {
  it('renders an external link with target blank and safe rel', () => {
    render(
      <Link type="external" href="https://example.com">
        External
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an internal link through the navigation Link', () => {
    render(<Link href="/about">About</Link>);

    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('target');
  });

  it('forwards locale on internal links', () => {
    render(
      <Link href="/" locale="en">
        Home EN
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Home EN' })).toHaveAttribute(
      'data-locale',
      'en',
    );
  });
});
