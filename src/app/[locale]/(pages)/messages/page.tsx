import { GetAllMessages, GetMessageByUser } from '@/actions/message';
import {
  FadeInMotion,
  MessageCard,
  SendMessageForm,
  TypingText,
} from '@/components/app';
import { Separator } from '@/components/ui/separator';

export default async function Messages() {
  const messages = await GetAllMessages();
  const message = await GetMessageByUser();

  return (
    <div className="align-page">
      <FadeInMotion className="space-y-4">
        <div className="space-y-1">
          <TypingText title="Mensagens" />
          <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
            {`- Por que não deixar sua marca aqui? Desde uma calorosa mensagem ou até uma piada que nos faça rir,
             estou ansioso por sua surpresa! 🤩`}
          </p>
        </div>

        <SendMessageForm initialMessage={message?.message} />
        <Separator />

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {messages?.map((message, index) => (
            <FadeInMotion key={message.id} delay={0.3 + index * 0.1}>
              <MessageCard {...message} />
            </FadeInMotion>
          ))}
        </div>
      </FadeInMotion>
    </div>
  );
}
