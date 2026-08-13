import { render, screen } from '@testing-library/react';
import { Star } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { ProjectMedia } from '@/components/molecules/project-media';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={typeof src === 'string' ? src : ''} />
  ),
}));

// ProjectMedia imports Image from the atoms barrel, which loads Link → navigation.
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

describe('ProjectMedia', () => {
  it('renders the project title and logo when provided', () => {
    render(<ProjectMedia title="Portfolio" logo="/logos/portfolio.svg" />);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByAltText('Portfolio logo')).toHaveAttribute(
      'src',
      '/logos/portfolio.svg',
    );
  });

  it('renders a fallback icon when logo is missing', () => {
    const { container } = render(
      <ProjectMedia title="Side Project" icon={Star} />,
    );

    expect(screen.getByText('Side Project')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies a dark logo background when logoOnDark is true', () => {
    const { container } = render(
      <ProjectMedia title="Dark Logo" logo="/logos/dark.svg" logoOnDark />,
    );

    const logoFrame = container.querySelector('.bg-neutral-900');
    expect(logoFrame).toBeInTheDocument();
  });
});
