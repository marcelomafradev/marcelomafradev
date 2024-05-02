import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from 'next-intl';
import { ReactNode } from 'react';

const NextIntlProvider = ({ children }: { children: ReactNode }) => {
  const messages = useMessages();

  const messagesArray: AbstractIntlMessages = {
    navigation: messages.navigation,
    personalInfo: messages.homepage['personal-info'],
    about: messages.about,
  };

  return (
    <NextIntlClientProvider messages={messagesArray}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
