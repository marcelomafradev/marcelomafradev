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
      'Jan 2024 – Fev 2024 · Remoto (EUA)',
      'Ago 2023 – Set 2023 · Remoto',
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

  it('collapses the older experiences behind a details toggle', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    const detailsElement = document.querySelector('details');

    expect(detailsElement).not.toBeNull();

    const collapsible = within(detailsElement as HTMLElement);

    expect(collapsible.getByText('Ver mais experiências')).toBeInTheDocument();

    for (const title of ['Postpay', 'Griebler Remodeling', 'Mince Joias']) {
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
});
