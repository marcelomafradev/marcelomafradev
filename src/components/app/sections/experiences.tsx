import { EXPERIENCES } from '@/helpers/constants';
import CustomCard from '../custom-card';
import { Image, Link } from '@/components/app';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Languages } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

const Experiences = async () => {
  const t = await getTranslations('homepage.experiences');
  const tLanguage = await getTranslations('navigation.settings.language');

  const resumeLinks = {
    'pt-br': '/documents/marcelo_mafra_de_moura_cv_br.pdf',
    en: '/documents/marcelo_mafra_de_moura_cv_en.pdf',
    es: '/documents/marcelo_mafra_de_moura_cv_es.pdf',
  };

  return (
    <section className="w-full">
      <CustomCard
        title={t('title')}
        linkTitle={t('cta')}
        href="https://www.linkedin.com/in/marcelomafradev/"
      >
        <div className="space-y-4 md:space-y-6">
          <ScrollArea className="h-[calc(100vh-300px)] max-h-[400px] w-full overflow-y-auto px-2 md:pr-4">
            <div className="space-y-4 md:space-y-6">
              {EXPERIENCES.map(({ logo, title, href, detailsCount }, index) => (
                <div
                  key={index}
                  className={cn(
                    'group relative rounded-lg p-3 transition-all md:p-4',
                    'hover:bg-muted/50 hover:shadow-sm',
                    'border border-transparent hover:border-muted-foreground/20',
                    'mx-1 md:mx-0',
                  )}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <Link href={href} type="external" className="shrink-0">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-white p-1 shadow-sm md:h-12 md:w-12 md:p-2">
                        <Image
                          src={logo}
                          alt={`${title} logo`}
                          className="h-full w-full object-contain"
                          fill
                        />
                      </div>
                    </Link>

                    <div className="flex-1 space-y-1 md:space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between md:gap-2">
                        <div>
                          <Link href={href} type="external">
                            <h2 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary md:text-lg">
                              {t(`${index + 1}.title` as '1.title')}
                            </h2>
                          </Link>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            {t(`${index + 1}.description` as '1.description')}
                          </p>
                        </div>
                        <span className="whitespace-nowrap rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary md:px-3">
                          {t(`${index + 1}.workingTime` as '1.workingTime')}
                        </span>
                      </div>

                      <div className="mt-1 space-y-1 md:mt-2 md:space-y-2">
                        {Array.from(
                          { length: detailsCount },
                          (_, detailIndex) => {
                            const detail = t(
                              `${index + 1}.details.${detailIndex + 1}` as any,
                              {
                                returnEmptyString: true,
                              },
                            );
                            return detail ? (
                              <div
                                key={detailIndex}
                                className="flex items-start gap-2 before:block before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-primary before:content-[''] md:gap-3"
                              >
                                <p className="text-xs leading-snug text-muted-foreground md:text-sm">
                                  {detail}
                                </p>
                              </div>
                            ) : null;
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'w-full gap-2 transition-all',
                  'bg-gradient-to-r from-primary to-primary/90',
                  'hover:from-primary/90 hover:to-primary',
                  'shadow-lg hover:shadow-primary/20',
                  'text-sm md:text-base',
                )}
                size={'sm'}
              >
                <span className="font-medium">{t('view-resume')}</span>
                <Languages className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  asChild
                >
                  <Link
                    href={resumeLinks['pt-br']}
                    type="external"
                    className="flex items-center gap-2"
                  >
                    <Icon.flagBr className="rounded" />{' '}
                    {tLanguage('portuguese')}
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  asChild
                >
                  <Link
                    href={resumeLinks['en']}
                    type="external"
                    className="flex items-center gap-2"
                  >
                    <Icon.flagUs className="rounded" /> {tLanguage('english')}
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CustomCard>
    </section>
  );
};

export default Experiences;
