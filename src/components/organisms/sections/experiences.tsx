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

export const Experiences = async () => {
  const t = await getTranslations('homepage.experiences');
  const tLanguage = await getTranslations('navigation.settings.language');

  return (
    <section>
      <SectionCard
        title={t('title')}
        linkTitle={t('cta')}
        href={SOCIAL_LINKS.linkedin}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            {EXPERIENCES.map(({ logo, title, href, detailsCount }, index) => {
              const position = index + 1;

              return (
                <TimelineEntry
                  key={title}
                  title={
                    <Link
                      href={href}
                      type="external"
                      className="hover:text-primary transition-colors"
                    >
                      {t(`${position}.title`)}
                    </Link>
                  }
                  subtitle={t(`${position}.description`)}
                  meta={t(`${position}.workingTime`)}
                  details={getExperienceDetails(t, position, detailsCount)}
                  leading={
                    <Link
                      href={href}
                      type="external"
                      className="border-border/70 bg-background block overflow-hidden rounded-xl border p-1.5 shadow-sm"
                    >
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
                    </Link>
                  }
                />
              );
            })}
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
