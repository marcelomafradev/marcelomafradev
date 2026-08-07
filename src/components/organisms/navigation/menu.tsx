'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { DropdownSettings } from '@/components/molecules';
import { SIDEBAR_ITEMS } from '@/constants';
import { Link, NavItemContent } from '@/components/atoms';
import { ChessIndicator } from './chess-indicator';
import { SpotifyIndicator } from './spotify-indicator';
import { usePathname, HrefValue } from '@/lib/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { cn, isExternalHref } from '@/lib/utils';

export const Menu = ({
  scrollableDivRef,
}: {
  scrollableDivRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const [hideTrigger, setHideTrigger] = useState(false);

  useEffect(() => {
    const el = scrollableDivRef.current;

    const handleScroll = () => {
      if (el) {
        setHideTrigger(el.scrollTop > 800);
      }
    };

    el?.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [scrollableDivRef]);

  return (
    <Sheet>
      <div
        className={cn(
          'border-border/70 bg-background/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md',
          hideTrigger && 'hidden',
        )}
      >
        <div className="container flex items-center justify-between gap-3 py-3">
          <div className="min-w-0 flex-1">
            <SpotifyIndicator />
          </div>

          <SheetTrigger
            render={
              <Button
                size="icon"
                variant="secondary"
                className="shrink-0 rounded-full"
              />
            }
          >
            <MenuIcon className="size-4" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
        </div>
      </div>

      <SheetContent side="bottom" className="gap-0 rounded-t-2xl pb-0">
        <SheetHeader className="border-border/60 space-y-1 border-b pb-4">
          <SheetTitle>Marcelo Mafra</SheetTitle>
          <SheetDescription>{t('menu-description')}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="max-h-[55vh] px-1">
          <div className="flex flex-col gap-4 py-4">
            {SIDEBAR_ITEMS.map(({ id, items, hasArrowIcon }, index) => (
              <div key={id ?? index} className="space-y-2">
                {id ? (
                  <p className="text-muted-foreground px-2 text-[11px] font-medium uppercase tracking-wide">
                    {t(`groups.${id}`)}
                  </p>
                ) : null}

                <div className="flex flex-col gap-1">
                  {items.map((item) => {
                    const external = isExternalHref(item.href);
                    const active = !external && pathname === item.href;

                    return (
                      <SheetClose
                        key={item.id}
                        nativeButton={false}
                        render={
                          external ? (
                            <Link href={item.href} type="external" />
                          ) : (
                            <Link href={item.href as HrefValue} />
                          )
                        }
                        className={cn(
                          buttonVariants({
                            variant: active ? 'secondary' : 'ghost',
                          }),
                          'h-11 w-full justify-between rounded-lg px-3',
                        )}
                      >
                        <NavItemContent
                          icon={item.icon}
                          label={t(`items.${item.id}`)}
                          hasArrowIcon={Boolean(hasArrowIcon || external)}
                        />
                      </SheetClose>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <SheetFooter className="flex flex-col gap-2 py-4">
          <ChessIndicator />
          <div className="flex w-full min-w-0 items-center gap-2">
            <div className="min-w-0 flex-1">
              <SpotifyIndicator />
            </div>
            <div className="shrink-0">
              <DropdownSettings />
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
