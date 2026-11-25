import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../../messages/pt-br.json';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

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

describe('Experiences', () => {
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

  it('renders the experiences heading from translations', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Experiências' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Ver currículo completo/i }),
    ).toBeInTheDocument();
  });

  it('renders SP Capital as the second experience without a link or dates', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const experienceTitles = screen
      .getAllByRole('heading', { level: 3 })
      .slice(1);

    expect(experienceTitles[1]).toHaveTextContent('SP Capital');

    const spCapitalLogo = screen.getByAltText('SP Capital logo');

    expect(spCapitalLogo.closest('a')).toBeNull();
    expect(
      screen.queryByRole('link', { name: /SP Capital/ }),
    ).not.toBeInTheDocument();

    const entriesContainer = experienceTitles[1].closest('div.space-y-3');
    const spCapitalCard = Array.from(entriesContainer?.children ?? []).find(
      (child) => child.textContent?.includes('SP Capital'),
    ) as HTMLElement;

    expect(spCapitalCard).toBeDefined();
    expect(spCapitalCard).toHaveTextContent(
      'Engenheiro de Software · FIDC e securitização',
    );

    for (const workingTime of [
      'Jan 2026 – Atual · Remoto',
      'Out 2025 – Atual · Remoto',
      'Abr 2026 – Atual · Remoto',
      'Dez 2022 – Out 2025 · Remoto',
      'Jan 2019 – Atual · Remoto',
    ]) {
      expect(
        within(spCapitalCard).queryByText(workingTime),
      ).not.toBeInTheDocument();
    }

    expect(screen.getByRole('link', { name: 'Onilearning' })).toHaveAttribute(
      'href',
      'https://onilearning.com.br/',
    );
    expect(screen.getByRole('link', { name: 'Comvanilla' })).toHaveAttribute(
      'href',
      'https://comvanilla.com.br/',
    );
    expect(screen.getByRole('link', { name: 'Ritmar' })).toHaveAttribute(
      'href',
      'https://ritmar.com.br/',
    );
  });

  it('renders Mafradev as the founder company and no longer lists Griebler or Mince as experiences', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const headings = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(headings).toContain('Mafradev');
    expect(headings).not.toContain('Griebler Remodeling');
    expect(headings).not.toContain('Mince Joias');

    const heading = screen.getByRole('heading', { name: 'Mafradev' });
    const card = heading.closest('div.space-y-3') as HTMLElement;

    expect(card).toHaveTextContent(
      'Fundador e Engenheiro de Software · Empresa própria',
    );
    expect(
      within(card).getByText('Jan 2019 – Atual · Remoto'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Mafradev' })).toBeNull();
  });

  it('gives every company logo a surface that stays legible in both themes', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const getLogoContainer = (title: string) => {
      const logo = screen.getByAltText(`${title} logo`);

      return logo.closest('div.relative')?.parentElement as HTMLElement;
    };

    for (const title of ['SP Capital']) {
      const container = getLogoContainer(title);

      expect(container).toHaveClass('bg-neutral-900');
      expect(container).not.toHaveClass('bg-background');
      expect(container).toHaveClass('border-border/70', 'rounded-xl', 'border');
    }

    for (const title of [
      'Onilearning',
      'Comvanilla',
      'Ritmar',
      'Mafradev',
      'Postpay',
    ]) {
      const container = getLogoContainer(title);

      expect(container).toHaveClass('bg-white');
      expect(container).not.toHaveClass('bg-background');
      expect(container).toHaveClass('border-border/70', 'rounded-xl', 'border');
    }
  });

  it('collapses the older experiences behind a details toggle', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const detailsElement = screen
      .getByText('Ver mais experiências')
      .closest('details');

    expect(detailsElement).not.toBeNull();

    const collapsible = within(detailsElement as HTMLElement);

    expect(collapsible.getByText('Ver mais experiências')).toBeInTheDocument();

    for (const title of ['Mafradev', 'Postpay']) {
      expect(
        collapsible.getByRole('heading', { name: title }),
      ).toBeInTheDocument();
    }

    for (const title of ['Onilearning', 'SP Capital', 'Comvanilla', 'Ritmar']) {
      expect(
        collapsible.queryByRole('heading', { name: title }),
      ).not.toBeInTheDocument();
    }
  });

  it('collapses the details past the first four behind a per-entry toggle', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const getEntryCard = (name: string) => {
      const heading = screen.getByRole('heading', { name });
      const entries = heading.closest('div.space-y-3') as HTMLElement;
      let card: HTMLElement = heading;

      while (card.parentElement !== entries) {
        card = card.parentElement as HTMLElement;
      }

      return card;
    };

    const spCapitalCard = getEntryCard('SP Capital');
    const spCapitalDetails = spCapitalCard.querySelector(
      'details',
    ) as HTMLElement;

    expect(spCapitalDetails).not.toBeNull();
    expect(spCapitalDetails.querySelector('summary')).toHaveTextContent(
      'Ver todos os detalhes',
    );
    expect(within(spCapitalCard).getAllByRole('listitem')).toHaveLength(7);
    expect(within(spCapitalDetails).getAllByRole('listitem')).toHaveLength(3);

    const spCapitalTranslate = createTranslator({
      locale: 'pt-br',
      messages: ptBr,
      namespace: 'homepage.experiences',
    });

    for (const idx of ['5', '6', '7'] as const) {
      expect(spCapitalDetails).toHaveTextContent(
        spCapitalTranslate(`2.details.${idx}`),
      );
    }

    for (const idx of ['1', '2', '3', '4'] as const) {
      expect(spCapitalDetails).not.toHaveTextContent(
        spCapitalTranslate(`2.details.${idx}`),
      );
    }

    expect(getEntryCard('Ritmar').querySelector('details')).toBeNull();
  });
});
