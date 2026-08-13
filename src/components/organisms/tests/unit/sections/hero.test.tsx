import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from '@/components/organisms/sections/hero';
import { PERSONAL_INFO } from '@/constants';
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

describe('Hero', () => {
  it('renders the hero heading and CTAs from translations', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('heading', {
        name: /Construo plataformas inteiras, não só telas\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(PERSONAL_INFO.name)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Ver case studies/i }),
    ).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: /Falar comigo/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
