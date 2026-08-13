import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResumeAboutMe } from '@/components/organisms/sections/resume-about-me';
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
}));

describe('ResumeAboutMe', () => {
  it('renders the about-me heading from translations', () => {
    renderWithProviders(<ResumeAboutMe />);

    expect(
      screen.getByRole('heading', { name: 'Sobre mim' }),
    ).toBeInTheDocument();
  });
});
