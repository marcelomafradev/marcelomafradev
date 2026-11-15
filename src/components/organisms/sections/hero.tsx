import { AvailabilityBadge, Image, Link } from '@/components/atoms';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/constants';
import { useTranslations } from 'next-intl';
import { ArrowRight, Send } from 'lucide-react';

export const Hero = () => {
  const t = useTranslations('homepage.hero');

  return (
    <section className="border-border/60 bg-card relative overflow-hidden rounded-2xl border p-6 sm:p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:gap-10">
        <div className="min-w-0 space-y-6">
          <AvailabilityBadge label={t('availability')} />

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl xl:text-5xl">
              {t('headline')}{' '}
              <span className="text-primary">{t('headline-highlight')}</span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-pretty leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" render={<Link href="/contact" />}>
              <Send className="size-4" />
              {t('cta-secondary')}
            </Button>

            <Button
              size="lg"
              variant="outline"
              render={<a href="#case-studies" />}
            >
              {t('cta-primary')}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <Avatar className="ring-border/70 size-44 rounded-3xl ring-1 sm:size-52 lg:size-60">
            <AvatarImage
              src={PERSONAL_INFO.image}
              alt={PERSONAL_INFO.name}
              className="object-cover"
              render={
                <Image
                  src={PERSONAL_INFO.image}
                  alt={PERSONAL_INFO.name}
                  width={240}
                  height={240}
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 176px"
                  className="aspect-square size-full object-cover"
                  priority
                />
              }
            />
            <AvatarFallback className="rounded-3xl text-3xl">MM</AvatarFallback>
          </Avatar>

          <div className="text-center lg:text-right">
            <p className="text-lg font-semibold tracking-tight">
              {PERSONAL_INFO.name}
            </p>
            <p className="numeric text-muted-foreground text-xs">{t('role')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
