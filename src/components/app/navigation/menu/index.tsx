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
import SpotifyIndicator from '../sidebar/spotify-indicator';
import DropdownSettings from '../../dropdown-settings';
import { SIDEBAR_ITEMS } from '@/helpers/constants';
import FadeInMotion from '../../fade-in-motion';
import NavigationButton from '../navigation-button';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';

const Menu = ({
  scrollableDivRef,
}: {
  scrollableDivRef: React.RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [hideTrigger, setHideTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        setHideTrigger(scrollableDivRef.current.scrollTop > 800);
      }
    };

    const currentScrollableDivRef = scrollableDivRef.current;
    if (currentScrollableDivRef) {
      currentScrollableDivRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentScrollableDivRef) {
        currentScrollableDivRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollableDivRef]);

  return (
    <Sheet>
      <div
        className={`items container fixed z-50 flex w-full flex-row justify-between border-b bg-background py-4 ${hideTrigger && 'hidden'}`}
      >
        <FadeInMotion delay={0.3} className="flex items-center">
          <SpotifyIndicator />
        </FadeInMotion>

        <SheetTrigger className="rounded-full bg-secondary p-2">
          <MenuIcon size={15} />
        </SheetTrigger>
      </div>

      <SheetContent side={'bottom'} className="pb-0">
        <SheetHeader className="pb-2">
          <SheetTitle>Marcelo Mafra Website</SheetTitle>

          <SheetDescription>
            Aqui você pode navegar entre as paginas e configurar o site.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="max-h-[400px] overflow-y-auto p-0 scrollbar-thin">
          <div className="flex w-full flex-col gap-4 py-4">
            {SIDEBAR_ITEMS.map(({ title, items, hasArrowIcon }, index) => (
              <FadeInMotion
                key={index}
                delay={0.3 + 0.15 * index}
                className="flex flex-col gap-2"
              >
                <h2 className="px-2 text-xs font-medium italic text-muted-foreground">
                  {title}
                </h2>

                <SheetClose>
                  <div className="flex flex-col">
                    {items.map((item, index) => (
                      <NavigationButton
                        {...item}
                        key={index}
                        pathname={pathname}
                        onClick={() => {
                          !item.isInactive && router.push(item.href);
                        }}
                        hasArrowIcon={hasArrowIcon || false}
                      />
                    ))}
                  </div>
                </SheetClose>
              </FadeInMotion>
            ))}
          </div>
        </ScrollArea>

        <SheetFooter className="h-20 flex-row items-center !justify-between gap-6 border-t">
          <FadeInMotion delay={0.3}>
            <SpotifyIndicator />
          </FadeInMotion>

          <FadeInMotion delay={0.5}>
            <DropdownSettings />
          </FadeInMotion>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
