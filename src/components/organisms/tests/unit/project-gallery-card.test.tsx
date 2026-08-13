import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProjectGalleryCard } from '@/components/organisms/project-gallery-card';
import type { ProjectProps } from '@/constants';

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

const project: ProjectProps = {
  id: 'demo',
  i18nKey: 'demo',
  title: 'Demo Project',
  logo: '/companies/demo.svg',
  href: 'https://example.com',
  technologies: ['TypeScript', 'React', 'Next.js', 'Node', 'Postgres'],
  categories: ['web'],
  featured: true,
  confidential: true,
};

const labels = {
  visit: 'Visitar',
  details: 'Detalhes',
  stack: 'Stack',
  role: 'Papel',
  confidential: 'Confidencial',
  source: 'Código',
  download: 'Baixar',
};

describe('ProjectGalleryCard', () => {
  it('renders project title, role, and confidential badge', () => {
    render(
      <ProjectGalleryCard
        project={project}
        description="Short project summary"
        roleDescription="Lead engineer"
        index={1}
        {...labels}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Demo Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Short project summary')).toBeInTheDocument();
    expect(screen.getByText('Lead engineer')).toBeInTheDocument();
    expect(screen.getByText('Confidencial')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('opens the details dialog when details is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ProjectGalleryCard
        project={project}
        description="Short project summary"
        roleDescription="Lead engineer"
        {...labels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Detalhes' }));

    expect(
      await screen.findByRole('heading', { name: 'Demo Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Postgres')).toBeInTheDocument();
  });

  it('renders a source CTA when only a repo is available', () => {
    const repoProject: ProjectProps = {
      ...project,
      href: undefined,
      stores: undefined,
      repo: 'https://github.com/example/demo',
      confidential: false,
      technologies: ['TypeScript'],
    };

    render(
      <ProjectGalleryCard
        project={repoProject}
        description="Repo only"
        roleDescription="Contributor"
        {...labels}
      />,
    );

    const source = screen.getByRole('link', { name: /Código/i });
    expect(source).toHaveAttribute('href', 'https://github.com/example/demo');
  });

  it('renders store download CTA and opens dialog with App Store / Play links', async () => {
    const user = userEvent.setup();
    const storeProject: ProjectProps = {
      ...project,
      href: undefined,
      repo: undefined,
      confidential: false,
      stores: {
        ios: 'https://apps.apple.com/app/demo',
        android: 'https://play.google.com/store/apps/details?id=demo',
      },
      technologies: ['React Native'],
    };

    render(
      <ProjectGalleryCard
        project={storeProject}
        description="Mobile app"
        roleDescription="Mobile lead"
        {...labels}
      />,
    );

    expect(screen.getByRole('link', { name: /Baixar/i })).toHaveAttribute(
      'href',
      'https://apps.apple.com/app/demo',
    );

    await user.click(screen.getByRole('button', { name: 'Detalhes' }));
    expect(await screen.findByRole('link', { name: /App Store/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Google Play/i })).toBeInTheDocument();
  });

  it('omits the primary external CTA when no href, store, or repo exists', () => {
    const bare: ProjectProps = {
      ...project,
      href: undefined,
      repo: undefined,
      stores: undefined,
      confidential: false,
      technologies: ['Go'],
    };

    render(
      <ProjectGalleryCard
        project={bare}
        description="Internal"
        roleDescription="Engineer"
        {...labels}
      />,
    );

    expect(screen.queryByRole('link', { name: /Visitar|Baixar|Código/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Detalhes' })).toBeInTheDocument();
  });


  it('opens details from the media button and shows dialog visit link', async () => {
    const user = userEvent.setup();

    render(
      <ProjectGalleryCard
        project={project}
        description="Short project summary"
        roleDescription="Lead engineer"
        index={2}
        {...labels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Demo Project' }));
    expect(
      await screen.findByRole('heading', { name: 'Demo Project' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Visitar/i })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

});
