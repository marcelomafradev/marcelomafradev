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
    // @ts-expect-error because 'personal-info' is a dynamic key in the messages object
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
