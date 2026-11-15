import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';
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
      screen.getByRole('heading', { name: 'Escala do que já entreguei' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Case studies de engenharia' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Projetos' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: ptBr.homepage.services.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Experiências' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Formação e cursos' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sobre mim' }),
    ).toBeInTheDocument();
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
