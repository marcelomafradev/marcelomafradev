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
      className="border-border/60 bg-background/70 fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-md rounded-3xl border shadow-lg shadow-black/20 backdrop-blur-xl backdrop-saturate-150"
    >
      <ul className="flex h-14 items-stretch px-1">
        {BOTTOM_TAB_ITEMS.map(({ id, icon: Icon, href }) => {
          const active = pathname === href;

          return (
            <li key={id} className="flex-1">
              <Link
                href={href as HrefValue}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 rounded-2xl px-1 transition-colors',
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
