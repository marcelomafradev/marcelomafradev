import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Education } from '@/components/organisms/sections/education';
import { renderWithProviders } from '@/tests/utils/render';

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
  usePathname: () => '/',
}));

describe('Education', () => {
  it('renders the education heading from translations', () => {
    renderWithProviders(<Education />);

    expect(
      screen.getByRole('heading', { name: 'Formação e cursos' }),
    ).toBeInTheDocument();
  });
});
