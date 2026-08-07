import { AvailabilityBadge, Image, Link } from '@/components/atoms';
import { StackTagList } from '@/components/molecules';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/constants';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin, Send } from 'lucide-react';

export const Hero = () => {
  const t = useTranslations('homepage.hero');

  return (
    <section className="border-border/60 bg-card relative overflow-hidden rounded-2xl border p-6 sm:p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <AvailabilityBadge label={t('availability')} />
            <span className="numeric text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
              {t('role')}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
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
              render={<Link href="/projects" />}
            >
              {t('cta-primary')}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <MapPin className="size-3.5" />
            {t('location')}
          </p>

          <StackTagList items={PERSONAL_INFO.stack} />
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <Avatar className="ring-border/70 size-32 rounded-2xl ring-1 sm:size-40 lg:size-44">
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
                  sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 128px"
                  className="aspect-square size-full object-cover"
                  priority
                />
              }
            />
            <AvatarFallback className="rounded-2xl text-3xl">MM</AvatarFallback>
          </Avatar>

          <div className="text-center lg:text-right">
            <p className="text-lg font-semibold tracking-tight">
              {PERSONAL_INFO.name}
            </p>
            <p className="numeric text-muted-foreground text-xs">
              {PERSONAL_INFO.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
