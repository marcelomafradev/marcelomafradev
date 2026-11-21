import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { COMPANY, CONTACT_EMAIL } from '@/constants';
import en from '../../../../../messages/en.json';
import es from '../../../../../messages/es.json';
import ptBr from '../../../../../messages/pt-br.json';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
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

const catalogs = { 'pt-br': ptBr, en, es } as const;

const renderLegalTemplate = async (
  locale: keyof typeof catalogs,
  namespace: 'terms' | 'privacy',
) => {
  getTranslationsMock.mockImplementation(async (requested: string) =>
    createTranslator({
      locale,
      messages: catalogs[locale],
      namespace: requested as 'terms',
    }),
  );

  const { LegalTemplate } =
    await import('@/components/templates/legal-template');
  const ui = await LegalTemplate({ namespace });

  render(
    <NextIntlClientProvider
      locale={locale}
      messages={catalogs[locale]}
      timeZone="America/Sao_Paulo"
    >
      {ui}
    </NextIntlClientProvider>,
  );
};

describe('LegalTemplate', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
  });

  describe.each(['terms', 'privacy'] as const)('%s namespace', (namespace) => {
    describe.each(['pt-br', 'en', 'es'] as const)('%s locale', (locale) => {
      it('renders the page title as the level one heading', async () => {
        await renderLegalTemplate(locale, namespace);

        expect(
          screen.getByRole('heading', {
            level: 1,
            name: catalogs[locale][namespace].title,
          }),
        ).toBeInTheDocument();
      });

      it('renders the last updated line', async () => {
        await renderLegalTemplate(locale, namespace);

        expect(
          screen.getByText(catalogs[locale][namespace].updated),
        ).toBeInTheDocument();
      });

      it('renders every section heading in order inside an ordered list', async () => {
        await renderLegalTemplate(locale, namespace);

        const { sections } = catalogs[locale][namespace];
        const items = screen.getAllByRole('listitem');

        expect(screen.getByRole('list').tagName).toBe('OL');
        expect(items).toHaveLength(sections.length);

        sections.forEach(({ heading }, position) => {
          expect(
            screen.getByRole('heading', { level: 2, name: heading }),
          ).toBeInTheDocument();
          expect(items[position]).toHaveTextContent(heading);
        });
      });

      it('renders every paragraph of every section', async () => {
        await renderLegalTemplate(locale, namespace);

        const paragraphCount = catalogs[locale][namespace].sections.reduce(
          (total, { paragraphs }) => total + paragraphs.length,
          0,
        );

        expect(
          screen
            .getAllByRole('listitem')
            .flatMap((item) => Array.from(item.querySelectorAll('p'))),
        ).toHaveLength(paragraphCount);
      });
    });
  });

  it('fills the company and contact placeholders from the constants', async () => {
    await renderLegalTemplate('pt-br', 'privacy');

    expect(
      screen.getAllByText(new RegExp(COMPANY.legalName)).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(new RegExp(CONTACT_EMAIL)).length,
    ).toBeGreaterThan(0);
    expect(document.body.textContent).not.toMatch(/\{[a-zA-Z]+\}/);
  });
});
