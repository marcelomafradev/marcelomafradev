import { FadeInMotion, TechButton, TypingText } from '@/components/app';
import { STACK } from '@/helpers/constants';
import { useTranslations } from 'next-intl';

export default function Technologies() {
  const t = useTranslations('technologies');

  return (
    <div className="align-page">
      <FadeInMotion className="space-y-1">
        <TypingText title={t('title')} />

        <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
          {t('description')}
        </p>

        <div className="space-y-4 pt-6">
          {STACK.map(({ items }, index) => (
            <section key={index} className="flex flex-col gap-2">
              <TypingText
                title={t(`${index + 1}`)}
                className="pl-4 text-lg font-medium capitalize"
              />

              <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                  <TechButton key={item.name} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </FadeInMotion>
    </div>
  );
}
