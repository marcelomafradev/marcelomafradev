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

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
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

describe('ContactTemplate', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'contact',
      });
    });
  });

  it('renders the contact heading and form card title', async () => {
    const { ContactTemplate } =
      await import('@/components/templates/contact-template');

    const ui = await ContactTemplate();
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
      screen.getByRole('heading', { name: 'Vamos conversar' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Enviar mensagem' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Enviar mensagem/i }),
    ).toBeInTheDocument();
  });
});
