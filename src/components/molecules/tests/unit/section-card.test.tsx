import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SectionCard } from '@/components/molecules/section-card';

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
    <a href={href} data-internal="true" {...rest}>
      {children}
    </a>
  ),
}));

describe('SectionCard', () => {
  it('renders title, description, and children without a link', () => {
    render(
      <SectionCard title="Experience" description="Recent roles">
        <p>Content body</p>
      </SectionCard>,
    );

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Recent roles')).toBeInTheDocument();
    expect(screen.getByText('Content body')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders an external action link when href is external', () => {
    render(
      <SectionCard
        title="GitHub"
        href="https://github.com/marcelomafradev"
        linkTitle="View profile"
      >
        <p>Repos</p>
      </SectionCard>,
    );

    const link = screen.getByRole('link', { name: /View profile/i });
    expect(link).toHaveAttribute('href', 'https://github.com/marcelomafradev');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders an internal action link when href is internal', () => {
    render(
      <SectionCard title="Projects" href="/projects" linkTitle="See all">
        <p>List</p>
      </SectionCard>,
    );

    const link = screen.getByRole('link', { name: /See all/i });
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveAttribute('data-internal', 'true');
  });
});
