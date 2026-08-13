import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Image, Link, PageHeading } from '@/components/atoms';
import { ImageWithDescription } from '@/components/molecules';
import {
  ChessComCard,
  FavoriteBooksCarousel,
  FavoriteSongsCarousel,
} from '@/components/organisms';
import {
  ABOUT_MOMENTS,
  INSTAGRAM_MASTER_PROFILE,
  PERSONAL_INFO,
} from '@/constants';
import { getAboutHighlights } from '@/helpers';
import { getTranslations } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AboutTemplate = async () => {
  const t = await getTranslations('about');

  const highlights = getAboutHighlights(t);

  const momentCaptions: Record<string, React.ReactNode> = {
    championship: t('personal-interests.image-1'),
    graduation: t.rich('personal-interests.image-2', {
      master: (chunks) => (
        <Link
          href={INSTAGRAM_MASTER_PROFILE}
          type="external"
          className="text-foreground font-semibold underline-offset-4 hover:underline"
        >
          {chunks}
        </Link>
      ),
    }),
    podium: t('personal-interests.image-3'),
  };

  const momentAlts: Record<string, string> = {
    championship: t('personal-interests.image-1'),
    graduation: t('personal-interests.image-2-alt'),
    podium: t('personal-interests.image-3'),
  };

  return (
    <div className="align-page">
      <Card className="border-border/60 bg-card overflow-hidden">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
          <Avatar className="ring-border/70 mx-auto size-36 rounded-2xl ring-1 md:mx-0 md:size-44">
            <AvatarImage
              src={PERSONAL_INFO.image}
              alt={PERSONAL_INFO.name}
              className="object-cover"
              render={
                <Image
                  src={PERSONAL_INFO.image}
                  alt={PERSONAL_INFO.name}
                  width={176}
                  height={176}
                  sizes="(min-width: 768px) 176px, 144px"
                  className="aspect-square size-full object-cover"
                />
              }
            />
            <AvatarFallback className="rounded-2xl text-2xl">MM</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                {t('title')}
              </h1>
              <Badge variant="secondary" className="gap-1 font-medium">
                <Sparkles className="size-3.5" />
                TL;DR
              </Badge>
            </div>

            <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-sm leading-relaxed md:mx-0 md:text-base">
              {t('description')}
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {highlights.map(({ key, label, icon: HighlightIcon }) => (
                <li key={key}>
                  <Badge
                    variant="outline"
                    className="border-border/70 bg-background/40 gap-1.5 px-2.5 py-1 font-normal"
                  >
                    <HighlightIcon className="text-primary size-3.5" />
                    {label}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <PageHeading
          as="h2"
          title={t('personal-interests.title')}
          description={t('personal-interests.description')}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_MOMENTS.map(({ id, src, href }) => (
            <ImageWithDescription
              key={id}
              src={src}
              href={href}
              alt={momentAlts[id]}
              priority
            >
              {momentCaptions[id]}
            </ImageWithDescription>
          ))}
        </div>

        <ChessComCard />
      </section>

      <Separator className="bg-border/60" />

      <section className="space-y-8">
        <FavoriteBooksCarousel />
        <FavoriteSongsCarousel />
      </section>
    </div>
  );
};
