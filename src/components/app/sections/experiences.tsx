import { EXPERIENCES } from '@/helpers/constants';
import CustomCard from '../custom-card';
import { Image, Link } from '@/components/app';
import { Button } from '@/components/ui/button';
import { Telescope } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

import { getLocale, getTranslations } from 'next-intl/server';

const Experiences = async () => {
  const t = await getTranslations('homepage.experiences');
  const locale = await getLocale();

  const getResumeLink = () => {
    if (locale === 'pt-br') {
      return '/documents/marcelomafra-br.pdf';
    } else {
      return '/documents/marcelomafra-en.pdf';
    }
  };

  return (
    <section>
      <CustomCard
        title={t('title')}
        linkTitle={t('cta')}
        href="https://www.linkedin.com/in/marcelomafradev/"
      >
        <div className="h-[250px] max-h-[250px] space-y-4">
          <ScrollArea className="max-h-[200px] overflow-y-auto scrollbar-thin">
            <div className="space-y-4">
              {EXPERIENCES.map(({ logo, title, href }, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Link href={href} type="external">
                    <Image
                      src={logo}
                      alt={`${title} logo`}
                      className="h-10 w-10 cursor-pointer rounded-full border p-1"
                    />
                  </Link>

                  <div className="space-y-0.5">
                    <Link href={href} type="external">
                      <h2 className="cursor-pointer text-sm font-medium text-secondary-foreground">
                        {t(`${index + 1}.title` as '1.title')}
                      </h2>
                    </Link>
                    <p className="text-[0.7rem] md:text-xs">
                      {t(`${index + 1}.description` as '1.title')}
                    </p>
                    <p className="text-[0.7rem] md:text-xs">
                      {t(`${index + 1}.workingTime` as '1.title')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Button
            className="w-full gap-2"
            variant={'secondary'}
            size={'sm'}
            asChild
          >
            <Link href={getResumeLink()} type="external">
              {t('view-resume')} <Telescope size={18} />
            </Link>
          </Button>
        </div>
      </CustomCard>
    </section>
  );
};

export default Experiences;
