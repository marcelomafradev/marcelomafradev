import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Hero } from '@/components/organisms/sections/hero';
import { PERSONAL_INFO } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';
import ptBr from '../../../../../../messages/pt-br.json';

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const headlinePattern = new RegExp(
  `${escapeRegExp(ptBr.homepage.hero.headline)}.*${escapeRegExp(
    ptBr.homepage.hero['headline-highlight'],
  )}`,
  'i',
);

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
  it('renders the hero heading from translations', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('heading', {
        name: headlinePattern,
      }),
    ).toBeInTheDocument();
  });

  it('renders the leaner headline about multi-tenant SaaS platforms with AI in the workflow', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('heading', {
        name: 'Plataformas SaaS multi-tenant, do banco ao app, com IA no fluxo.',
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Tech Lead em arquitetura/)).toBeNull();
  });

  it('renders the availability badge', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByText(ptBr.homepage.hero.availability),
    ).toBeInTheDocument();
  });

  it('renders exactly two calls to action', () => {
    renderWithProviders(<Hero />);

    const contactCta = screen.getByRole('link', {
      name: new RegExp(escapeRegExp(ptBr.homepage.hero['cta-secondary']), 'i'),
    });
    const ctaRow = contactCta.parentElement as HTMLElement;

    expect(contactCta).toHaveAttribute('href', '/contact');
    expect(within(ctaRow).getAllByRole('link')).toHaveLength(2);
    expect(
      within(ctaRow).getByRole('link', {
        name: new RegExp(escapeRegExp(ptBr.homepage.hero['cta-primary']), 'i'),
      }),
    ).toHaveAttribute('href', '#case-studies');
  });

  it('does not link to the services or technologies pages', () => {
    const { container } = renderWithProviders(<Hero />);
    const hero = container.querySelector('section') as HTMLElement;
    const hrefs = within(hero)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));

    expect(hrefs).not.toContain('/services');
    expect(hrefs).not.toContain('/technologies');
  });

  it('drops the stack chips', () => {
    const { container } = renderWithProviders(<Hero />);
    const hero = container.querySelector('section') as HTMLElement;

    expect(within(hero).queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    expect(screen.queryByText('NestJS')).not.toBeInTheDocument();
  });

  it('renders the localized role once beside the name', () => {
    renderWithProviders(<Hero />);

    const nameElement = screen.getByText(PERSONAL_INFO.name);
    const identityContainer = nameElement.closest('div') as HTMLElement;

    expect(
      within(identityContainer).getByText(ptBr.homepage.hero.role),
    ).toBeInTheDocument();
    expect(screen.getAllByText(ptBr.homepage.hero.role)).toHaveLength(1);
    expect(screen.queryByText(PERSONAL_INFO.title)).not.toBeInTheDocument();
  });

  it('shows only the name and the role under the photo', () => {
    renderWithProviders(<Hero />);

    const nameElement = screen.getByText(PERSONAL_INFO.name);
    const identityContainer = nameElement.closest('div') as HTMLElement;

    expect(
      within(identityContainer).queryByText(ptBr.homepage.hero.location),
    ).not.toBeInTheDocument();
  });

  describe('photo', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'Image',
        class LoadedImage {
          complete = true;
          naturalWidth = 1;
          onload: (() => void) | null = null;
          onerror: (() => void) | null = null;
          src = '';
          srcset = '';
          sizes = '';
          referrerPolicy = '';
          crossOrigin: string | null = null;
        },
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('renders the photo with the name as alternative text', () => {
      renderWithProviders(<Hero />);

      expect(screen.getByAltText(PERSONAL_INFO.name)).toHaveAttribute(
        'src',
        PERSONAL_INFO.image,
      );
    });
  });

  it('keeps the headline at the wide-screen size that fits two lines', () => {
    renderWithProviders(<Hero />);

    const headline = screen.getByRole('heading', { level: 1 });

    expect(headline).toHaveClass('xl:text-5xl');
    expect(headline).not.toHaveClass('xl:text-[3.5rem]');
    expect(headline).not.toHaveClass('lg:text-6xl');
  });

  it('gives the headline column the wide share of the grid', () => {
    const { container } = renderWithProviders(<Hero />);

    const gridContainer = container.querySelector('section')?.firstElementChild;

    expect(gridContainer).toHaveClass('lg:grid-cols-[minmax(0,1fr)_15rem]');
  });
});
