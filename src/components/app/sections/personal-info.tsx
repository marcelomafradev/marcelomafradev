import { Badge } from '@/components/ui/badge';
import { PERSONAL_INFO } from '@/helpers/constants';
import { Image } from '@/components/app';
import FadeInMotion from '../fade-in-motion';
import TypingText from '../typing-text';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';

const PersonalInfo = () => {
  const t = useTranslations('homepage.personal-info');

  return (
    <section className="flex select-none space-x-4 overflow-hidden">
      <FadeInMotion delay={0.3}>
        <Image
          src={PERSONAL_INFO.image}
          alt={`Marcelo Mafra image`}
          className="h-24 min-w-24 rounded-lg object-cover"
        />
      </FadeInMotion>

      <div className="flex flex-1 flex-col items-start justify-center gap-2 overflow-hidden">
        <FadeInMotion delay={0.3}>
          <TypingText title={PERSONAL_INFO.name} className="italic" />
          <TypingText
            title={t('title')}
            className="!text-xs font-light text-muted-foreground"
          />
        </FadeInMotion>

        <ScrollArea className="w-full">
          <div className="flex w-max space-x-2 pb-3">
            {PERSONAL_INFO.stack.map((stack, index) => (
              <FadeInMotion key={stack} delay={0.3 + 0.15 * index}>
                <Badge
                  variant="secondary"
                  className="whitespace-nowrap font-medium"
                >
                  {stack}
                </Badge>
              </FadeInMotion>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default PersonalInfo;
