import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';
import { NextIntlClientProvider } from 'next-intl';

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

describe('ServicesTemplate', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'services',
      });
    });
  });

  it('renders the services heading', async () => {
    const { ServicesTemplate } =
      await import('@/components/templates/services-template');

    const ui = await ServicesTemplate();
    render(
      <NextIntlClientProvider
        locale="pt-br"
        messages={ptBr}
        timeZone="America/Sao_Paulo"
      >
        {ui}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Trabalhe comigo' }),
    ).toBeInTheDocument();
  });

  it('renders every offering title', async () => {
    const { ServicesTemplate } =
      await import('@/components/templates/services-template');

    const ui = await ServicesTemplate();
    render(
      <NextIntlClientProvider
        locale="pt-br"
        messages={ptBr}
        timeZone="America/Sao_Paulo"
      >
        {ui}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Arquitetura e liderança técnica',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Produtos sob encomenda',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Modernização e plataformas',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Engenharia com IA' }),
    ).toBeInTheDocument();
  });

  it('renders every process step title', async () => {
    const { ServicesTemplate } =
      await import('@/components/templates/services-template');

    const ui = await ServicesTemplate();
    render(
      <NextIntlClientProvider
        locale="pt-br"
        messages={ptBr}
        timeZone="America/Sao_Paulo"
      >
        {ui}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 3, name: 'Entendimento' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Arquitetura e plano' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Entrega contínua' }),
    ).toBeInTheDocument();
  });

  it('renders the company legal data', async () => {
    const { ServicesTemplate } =
      await import('@/components/templates/services-template');

    const ui = await ServicesTemplate();
    render(
      <NextIntlClientProvider
        locale="pt-br"
        messages={ptBr}
        timeZone="America/Sao_Paulo"
      >
        {ui}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByText('Mafradev Desenvolvimento de Software LTDA'),
    ).toBeInTheDocument();
    expect(screen.getByText('69.635.734/0001-43')).toBeInTheDocument();
  });

  it('links to the contact page and to the resume', async () => {
    const { ServicesTemplate } =
      await import('@/components/templates/services-template');

    const ui = await ServicesTemplate();
    render(
      <NextIntlClientProvider
        locale="pt-br"
        messages={ptBr}
        timeZone="America/Sao_Paulo"
      >
        {ui}
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('link', { name: /Falar comigo/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(
      screen.getByRole('link', { name: /Baixar currículo/i }),
    ).toHaveAttribute('href', '/documents/marcelomafradev-cv-br.pdf');
  });
});
