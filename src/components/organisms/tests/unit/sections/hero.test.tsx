import { screen, within } from '@testing-library/react';
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

  it('renders the services call to action as a text link with an arrow', () => {
    renderWithProviders(<Hero />);

    const servicesLink = screen.getByRole('link', { name: /Ver serviços/i });

    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(servicesLink.querySelector('svg')).not.toBeNull();
  });

  it('keeps the location beside the name in the photo column', () => {
    renderWithProviders(<Hero />);

    const nameElement = screen.getByText(PERSONAL_INFO.name);
    const identityContainer = nameElement.closest('div') as HTMLElement;

    expect(
      within(identityContainer).getByText('Florianópolis, SC · Remoto'),
    ).toBeInTheDocument();
  });

  it('keeps the headline at the wide-screen size that fits three lines', () => {
    renderWithProviders(<Hero />);

    const headline = screen.getByRole('heading', { level: 1 });

    expect(headline).toHaveClass('xl:text-[3.5rem]');
    expect(headline).not.toHaveClass('lg:text-6xl');
  });

  it('gives the headline column the wide share of the grid', () => {
    const { container } = renderWithProviders(<Hero />);

    const gridContainer = container.querySelector('section')?.firstElementChild;

    expect(gridContainer).toHaveClass('lg:grid-cols-[minmax(0,1fr)_15rem]');
  });

  describe('recent companies strip', () => {
    it('shows the label above the company list', () => {
      renderWithProviders(<Hero />);

      expect(screen.getByText('Atuação recente')).toBeInTheDocument();
    });

    it('lists the five most recent companies in order', () => {
      renderWithProviders(<Hero />);

      const strip = screen.getByText('Atuação recente').closest('div');
      const companies = within(strip as HTMLElement)
        .getAllByRole('listitem')
        .map((item) => item.textContent?.trim());

      expect(companies).toEqual([
        'Onilearning',
        'SP Capital',
        'Comvanilla',
        'Ritmar',
        'Postpay',
      ]);
    });

    it('renders a company without a site as plain text over a dark logo tile', () => {
      renderWithProviders(<Hero />);

      const strip = screen.getByText('Atuação recente').closest('div');
      const [spCapital] = within(strip as HTMLElement)
        .getAllByRole('listitem')
        .filter((item) => item.textContent?.includes('SP Capital'));

      expect(within(spCapital).queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getByAltText('SP Capital logo').closest('div')).toHaveClass(
        'bg-neutral-900',
      );
    });

    it('links a company that has a site to its external page', () => {
      renderWithProviders(<Hero />);

      const onilearningLink = screen.getByRole('link', {
        name: /Onilearning/i,
      });

      expect(onilearningLink).toHaveAttribute(
        'href',
        'https://onilearning.com.br/',
      );
      expect(onilearningLink).toHaveAttribute('target', '_blank');
    });
  });
});
