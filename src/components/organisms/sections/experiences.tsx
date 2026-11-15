import { EXPERIENCES, RESUME_LINKS, SOCIAL_LINKS } from '@/constants';
import { getExperienceDetails } from '@/helpers';
import { SectionCard, TimelineEntry } from '@/components/molecules';
import { Image, Link } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FileDown } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const VISIBLE_EXPERIENCES = 4;

export const Experiences = async () => {
  const t = await getTranslations('homepage.experiences');
  const tLanguage = await getTranslations('navigation.settings.language');

  const recent = EXPERIENCES.slice(0, VISIBLE_EXPERIENCES);
  const older = EXPERIENCES.slice(VISIBLE_EXPERIENCES);

  const renderExperience = (
    {
      logo,
      logoOnDark,
      title,
      href,
      detailsCount,
    }: (typeof EXPERIENCES)[number],
    position: number,
  ) => {
    const workingTime = t(`${position}.workingTime`);
    const titleClassName = 'hover:text-primary transition-colors';
    const logoClassName = cn(
      'border-border/70 block overflow-hidden rounded-xl border p-1.5 shadow-sm',
      logoOnDark ? 'bg-neutral-900' : 'bg-white',
    );

    const logoBlock = (
      <div className="relative size-10">
        <Image
          src={logo}
          alt={`${title} logo`}
          width={40}
          height={40}
          className="size-full object-contain"
          sizes="40px"
        />
      </div>
    );

    return (
      <TimelineEntry
        key={title}
        title={
          href ? (
            <Link href={href} type="external" className={titleClassName}>
              {t(`${position}.title`)}
            </Link>
          ) : (
            t(`${position}.title`)
          )
        }
        subtitle={t(`${position}.description`)}
        meta={workingTime || undefined}
        details={getExperienceDetails(t, position, detailsCount)}
        leading={
          href ? (
            <Link href={href} type="external" className={logoClassName}>
              {logoBlock}
            </Link>
          ) : (
            <div className={logoClassName}>{logoBlock}</div>
          )
        }
      />
    );
  };

  return (
    <section>
      <SectionCard
        title={t('title')}
        linkTitle={t('cta')}
        href={SOCIAL_LINKS.linkedin}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            {recent.map((experience, index) =>
              renderExperience(experience, index + 1),
            )}

            {older.length > 0 ? (
              <details>
                <summary className="text-muted-foreground hover:text-foreground border-border/60 w-full cursor-pointer list-none rounded-lg border px-4 py-3 text-sm font-medium">
                  {t('show-more')}
                </summary>

                <div className="mt-3 space-y-3">
                  {older.map((experience, index) =>
                    renderExperience(experience, recent.length + index + 1),
                  )}
                </div>
              </details>
            ) : null}
          </div>

          <Separator className="bg-border/60" />

          <Popover>
            <PopoverTrigger
              render={<Button className="w-full gap-2" size="sm" />}
            >
              <FileDown className="size-4" />
              {t('view-resume')}
            </PopoverTrigger>
            <PopoverContent align="end" className="w-52 p-2">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  render={
                    <Link
                      href={RESUME_LINKS['pt-br']}
                      type="external"
                      className="flex items-center gap-2"
                    />
                  }
                >
                  <Icon.flagBr className="rounded" />
                  {tLanguage('portuguese')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  render={
                    <Link
                      href={RESUME_LINKS.en}
                      type="external"
                      className="flex items-center gap-2"
                    />
                  }
                >
                  <Icon.flagUs className="rounded" />
                  {tLanguage('english')}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SectionCard>
    </section>
  );
};
