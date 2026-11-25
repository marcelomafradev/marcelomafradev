import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';
import { FEATURED_PROJECTS } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const headlinePattern = new RegExp(
  `${escapeRegExp(ptBr.homepage.hero.headline)}.*${escapeRegExp(
    ptBr.homepage.hero['headline-highlight'],
  )}`,
  'i',
);

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}));

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

// Experiences is async; mock it so HomeTemplate stays a sync smoke target.
vi.mock('@/components/organisms/sections/experiences', () => ({
  Experiences: () => (
    <section>
      <h2>Experiências</h2>
    </section>
  ),
}));

describe('HomeTemplate', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'homepage.experiences',
      });
    });
  });

  it('renders stable section headings from translations', async () => {
    const { HomeTemplate } =
      await import('@/components/templates/home-template');

    renderWithProviders(<HomeTemplate />);

    expect(
      screen.getByRole('heading', {
        name: headlinePattern,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: ptBr.homepage.metrics.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: ptBr.homepage['case-studies'].title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: ptBr.homepage.projects.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: ptBr.homepage.services.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Experiências' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: ptBr.homepage.education.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: ptBr.homepage['resume-about-me'].title,
      }),
    ).toBeInTheDocument();
  });

  it('renders the leaner hero headline on the home', async () => {
    const { HomeTemplate } =
      await import('@/components/templates/home-template');

    renderWithProviders(<HomeTemplate />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Plataformas SaaS multi-tenant, do banco ao app, com IA no fluxo.',
      }),
    ).toBeInTheDocument();
  });

  it('renders exactly three case study cards, three AI pillars and four featured projects', async () => {
    const { HomeTemplate } =
      await import('@/components/templates/home-template');

    const { container } = renderWithProviders(<HomeTemplate />);

    expect(container.querySelectorAll('#case-studies .grid > *')).toHaveLength(
      3,
    );
    expect(container.querySelectorAll('#ai-workflow .grid > *')).toHaveLength(
      3,
    );
    expect(FEATURED_PROJECTS.map(({ id }) => id)).toEqual([
      'ritmar',
      'spcapital-credit',
      'oniapp',
      'postpay-platform',
    ]);
  });

  it('places the services heading before experiences and experiences before projects', async () => {
    const { HomeTemplate } =
      await import('@/components/templates/home-template');

    renderWithProviders(<HomeTemplate />);

    const services = screen.getByRole('heading', {
      name: ptBr.homepage.services.title,
    });
    const experiences = screen.getByRole('heading', {
      name: ptBr.homepage.experiences.title,
    });
    const projects = screen.getByRole('heading', {
      name: ptBr.homepage.projects.title,
    });

    expect(services.compareDocumentPosition(experiences)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(experiences.compareDocumentPosition(projects)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
