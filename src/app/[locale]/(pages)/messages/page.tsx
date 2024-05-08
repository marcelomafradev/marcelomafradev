import { GetAllMessages, GetMessageByUser } from '@/actions/message';
import {
  FadeInMotion,
  MessageCard,
  SendMessageForm,
  TypingText,
} from '@/components/app';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';

export default async function Messages() {
  const t = await getTranslations('messages');
  const messages = await GetAllMessages();
  const message = await GetMessageByUser();

  return (
    <div className="align-page">
      <FadeInMotion className="space-y-4">
        <div className="space-y-1">
          <TypingText title={t('title')} />
          <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <SendMessageForm
          initialMessage={message?.message}
          t={{
            label: t('label'),
            placeholder: t('placeholder'),
            auth: t('auth'),
            send: t('send'),
            'success-updated': t('success-updated'),
            'success-send': t('success-send'),
          }}
        />
        <Separator />

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {messages?.map((message, index) => (
            <FadeInMotion key={message.id} delay={0.3 + index * 0.1}>
              <MessageCard
                {...message}
                t={{
                  cancel: t('dialog.cancel'),
                  continue: t('dialog.continue'),
                  description: t('dialog.description'),
                  success: t('dialog.success'),
                  title: t('dialog.title'),
                }}
              />
            </FadeInMotion>
          ))}
        </div>
      </FadeInMotion>
    </div>
  );
}
