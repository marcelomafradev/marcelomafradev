import { Badge } from '@/components/ui/badge';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FadeInMotion,
  FavoriteBooksCarousel,
  FavoriteSongsCarousel,
  ImageWithDescription,
  Link,
  TypingText,
} from '@/components/app';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="align-page">
      <div className="flex gap-2">
        <TypingText title={t('title')} />

        <Badge variant={'secondary'} className="h-fit">
          <TypingText title="TL;DR" className="!text-xs" />
        </Badge>
      </div>

      <FadeInMotion>
        <div className="space-y-1 text-pretty text-sm text-muted-foreground md:text-base">
          <p>{t('description')}</p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="about">
            <AccordionTrigger>{t('more.title')}</AccordionTrigger>

            <AccordionContent className="text-pretty text-xs text-muted-foreground md:text-sm">
              <p>{t('more.description')}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </FadeInMotion>

      <FadeInMotion className="space-y-4">
        <h1 className="text-xl font-semibold">
          {t('personal-interests.title')}
        </h1>
        <p className="text-pretty text-xs text-muted-foreground md:text-sm">
          {t('personal-interests.description')}
        </p>

        <div className="flex flex-wrap items-start justify-center gap-8">
          <ImageWithDescription
            href="https://www.instagram.com/p/CrMEusGJnmG_EqARjAW3_OjQkza864YRx7GbOU0/?igsh=MWtya25lYTU4MW9tcg=="
            src={'/championship.png'}
          >
            {t('personal-interests.image-1')}
          </ImageWithDescription>

          <ImageWithDescription
            href="https://www.instagram.com/p/C09PsDqLqmRMAg9UxT9qAOcm6qoQvPK5g51dmg0/?igsh=aTU3Ymo1NHh3YjVn"
            src={'/graduation.png'}
          >
            {t('personal-interests.image-2')}
            <Link
              href={'https://www.instagram.com/andredecorachadel/'}
              className="font-semibold"
              type="external"
            >{` Andre "Deco" Rachadel `}</Link>
          </ImageWithDescription>

          <ImageWithDescription
            href="https://www.instagram.com/p/CrHXzzzpn2NNqj0Vqj_Aj-8k3zxdVX_rZLwnjg0/?igsh=MTU1d3d5cDAxczB0eA=="
            src={'/podium.png'}
          >
            {t('personal-interests.image-3')}
          </ImageWithDescription>
        </div>

        <FavoriteBooksCarousel />
        <FavoriteSongsCarousel />
      </FadeInMotion>
    </div>
  );
}
