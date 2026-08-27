'use client';

import { Link } from '@/components/atoms';
import { BOTTOM_TAB_ITEMS } from '@/constants';
import { HrefValue, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export const BottomTabs = () => {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <nav
      aria-label={t('tabs-label')}
      className="border-border/70 bg-background/90 fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="flex h-14 items-stretch">
        {BOTTOM_TAB_ITEMS.map(({ id, icon: Icon, href }) => {
          const active = pathname === href;

          return (
            <li key={id} className="flex-1">
              <Link
                href={href as HrefValue}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 px-1 transition-colors',
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-12 items-center justify-center rounded-full transition-colors',
                    active && 'bg-primary/15',
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>

                <span className="w-full truncate text-center text-[10px] font-medium leading-none">
                  {t(`items.${id}`)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
