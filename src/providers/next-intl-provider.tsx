'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const TIME_ZONE = 'America/Sao_Paulo';

const NextIntlProvider = ({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}) => {
  const homepage = messages.homepage as AbstractIntlMessages | undefined;
  const personalInfo =
    (homepage?.['personal-info'] as AbstractIntlMessages | undefined) ?? {};

  const clientMessages: AbstractIntlMessages = {
    ...messages,
    personalInfo,
  };

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={clientMessages}
      timeZone={TIME_ZONE}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
