import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { describe, expect, it } from 'vitest';
import NextIntlProvider from '@/providers/next-intl-provider';
import ptBr from '../../../../messages/pt-br.json';

function TranslatedChild() {
  const t = useTranslations('navigation.items');
  return <span>{t('home')}</span>;
}

function PersonalInfoChild() {
  const t = useTranslations('personalInfo');
  return <span data-testid="personal-info-key">{String(Boolean(t))}</span>;
}

describe('NextIntlProvider', () => {
  it('renders a child that uses useTranslations with a known string', () => {
    render(
      <NextIntlProvider locale="pt-br" messages={ptBr}>
        <TranslatedChild />
      </NextIntlProvider>,
    );

    expect(screen.getByText('Início')).toBeInTheDocument();
  });

  it('exposes homepage.personal-info as personalInfo on the client messages', () => {
    render(
      <NextIntlProvider locale="pt-br" messages={ptBr}>
        <PersonalInfoChild />
      </NextIntlProvider>,
    );

    expect(screen.getByTestId('personal-info-key')).toBeInTheDocument();
  });

  it('falls back to an empty personalInfo when homepage messages are absent', () => {
    const messagesWithoutHomepage = {
      navigation: ptBr.navigation,
    };

    render(
      <NextIntlProvider locale="pt-br" messages={messagesWithoutHomepage}>
        <TranslatedChild />
      </NextIntlProvider>,
    );

    expect(screen.getByText('Início')).toBeInTheDocument();
  });

});
