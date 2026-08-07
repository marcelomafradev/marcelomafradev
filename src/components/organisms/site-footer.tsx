import { Link } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PERSONAL_INFO, SOCIAL_CHANNELS } from '@/constants';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';

export const SiteFooter = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation.items');

  return (
    <footer className="border-border/60 bg-card/30 border-t">
      <div className="container mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:px-8 lg:max-w-[min(84%,76rem)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-base font-semibold tracking-tight">
              {PERSONAL_INFO.name}
            </p>
            <p className="text-muted-foreground text-sm">{t('tagline')}</p>
          </div>

          <Button render={<Link href="/contact" />}>
            <Send className="size-4" />
            {t('cta')}
          </Button>
        </div>

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-1">
            {SOCIAL_CHANNELS.map(({ id, icon: ChannelIcon, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  type="external"
                  aria-label={tNav(id)}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors"
                >
                  <ChannelIcon className="size-4" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-muted-foreground space-y-1 text-xs sm:text-right">
            <p>
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. {t('rights')}
            </p>
            <p>{t('built-with')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
