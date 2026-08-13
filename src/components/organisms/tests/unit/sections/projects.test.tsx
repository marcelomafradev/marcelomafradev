import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Projects } from '@/components/organisms/sections/projects';
import { renderWithProviders } from '@/tests/utils/render';

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
  ),
}));

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

describe('Projects', () => {
  it('renders the projects section heading from translations', () => {
    renderWithProviders(<Projects />);

    expect(
      screen.getByRole('heading', { name: 'Projetos' }),
    ).toBeInTheDocument();
  });
});
