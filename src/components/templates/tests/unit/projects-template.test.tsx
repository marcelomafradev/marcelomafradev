import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProjectsTemplate } from '@/components/templates/projects-template';
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

vi.mock('@/helpers', async () => {
  const actual = await vi.importActual<typeof import('@/helpers')>('@/helpers');
  return {
    ...actual,
    filterProjectsByCategory: (
      projects: Parameters<typeof actual.filterProjectsByCategory>[0],
      filter: Parameters<typeof actual.filterProjectsByCategory>[1],
    ) => {
      if (filter === 'mobile') {
        return [];
      }
      return actual.filterProjectsByCategory(projects, filter);
    },
  };
});

describe('ProjectsTemplate', () => {
  it('renders the projects gallery heading from translations', () => {
    renderWithProviders(<ProjectsTemplate />);

    expect(
      screen.getByRole('heading', { name: 'Galeria de projetos' }),
    ).toBeInTheDocument();
  });

  it('shows the empty state when a filter yields no projects', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsTemplate />);

    await user.click(screen.getByRole('tab', { name: 'Mobile' }));

    expect(
      await screen.findByText('Nenhum projeto neste filtro.'),
    ).toBeInTheDocument();
  });
});
