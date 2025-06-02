import { useTranslations } from 'next-intl';
import CustomCard from '../custom-card';
import { GraduationCap, Rocket, Code, School, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const Education = () => {
  const t = useTranslations('homepage.education');

  const getEducationIcon = (index: number) => {
    switch (index) {
      case 1:
        return <GraduationCap className="h-4 w-4 text-primary md:h-5 md:w-5" />;
      case 2:
        return <Rocket className="h-4 w-4 text-primary md:h-5 md:w-5" />;
      case 4:
        return <Code className="h-4 w-4 text-primary md:h-5 md:w-5" />;
      case 4:
        return <School className="h-4 w-4 text-primary md:h-5 md:w-5" />;
      case 5:
        return <BookOpen className="h-4 w-4 text-primary md:h-5 md:w-5" />;
      default:
        return <GraduationCap className="h-4 w-4 text-primary md:h-5 md:w-5" />;
    }
  };

  return (
    <section className="w-full">
      <CustomCard title={t('title')} href="/about">
        <div className="space-y-6">
          <p className="px-4 text-sm font-medium text-muted-foreground md:px-0">
            {t('description')}
          </p>

          <div className="grid gap-4 xl:grid-cols-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  'relative rounded-xl p-4 transition-all md:p-5',
                  'bg-gradient-to-br from-background to-muted/20',
                  'border border-muted/20 hover:border-primary/30',
                  'shadow-sm hover:shadow-md',
                  'group overflow-hidden',
                  'mx-2 md:mx-0',
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="mt-0.5 flex items-center justify-center rounded-lg bg-primary/10 p-2">
                      {getEducationIcon(index)}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary md:text-lg">
                            {t(`items.${index}.title` as any)}
                          </h3>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            {t(`items.${index}.description` as any)}
                          </p>
                        </div>
                        <span className="mt-1 inline-flex items-center whitespace-nowrap rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary sm:mt-0 md:px-3">
                          {t(`items.${index}.time` as any)}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 md:mt-3 md:space-y-2">
                        {[1, 2, 3].map((detailIndex) => {
                          const detail = t(
                            `items.${index}.details.${detailIndex}` as any,
                            {
                              returnEmptyString: true,
                            },
                          );
                          return detail ? (
                            <div
                              key={detailIndex}
                              className="flex items-start gap-2 md:gap-3"
                            >
                              <span className="flex h-1.5 w-1.5 translate-y-2 rounded-full bg-primary md:h-2 md:w-2" />
                              <p className="text-xs text-muted-foreground md:text-sm">
                                {detail}
                              </p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CustomCard>
    </section>
  );
};

export default Education;
