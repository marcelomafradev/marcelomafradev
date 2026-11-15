import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from '@/components/organisms/sections/hero';
import { HERO_STACK, PERSONAL_INFO } from '@/constants';
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
    expect(screen.getByRole('link', { name: /Falar comigo/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('renders only the focused stack items', () => {
    renderWithProviders(<Hero />);

    for (const item of HERO_STACK) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }

    expect(screen.queryByText('Docker')).not.toBeInTheDocument();
    expect(screen.queryByText('AWS')).not.toBeInTheDocument();
  });

  it('links the stack summary to the technologies page', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('link', { name: /Ver stack completa/i }),
    ).toHaveAttribute('href', '/technologies');
  });

  it('points the case studies call to action at the in-page anchor', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('link', { name: /Ver case studies/i }),
    ).toHaveAttribute('href', '#case-studies');
  });

  it('renders the services call to action', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('link', { name: /Trabalhe comigo/i }),
    ).toHaveAttribute('href', '/services');
  });
});
