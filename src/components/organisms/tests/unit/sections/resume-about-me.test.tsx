import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResumeAboutMe } from '@/components/organisms/sections/resume-about-me';
import { renderWithProviders } from '@/tests/utils/render';
import ptBr from '../../../../../../messages/pt-br.json';

const resumeAboutMe = ptBr.homepage['resume-about-me'];

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
      screen.getByRole('heading', { name: resumeAboutMe.title }),
    ).toBeInTheDocument();
  });

  it('renders the about me description from translations', () => {
    renderWithProviders(<ResumeAboutMe />);

    expect(screen.getByText(resumeAboutMe.description)).toBeInTheDocument();
  });
});
