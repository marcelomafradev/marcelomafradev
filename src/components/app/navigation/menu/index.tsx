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

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-8 right-8 rounded-full bg-secondary p-2">
        <MenuIcon size={18} />
      </SheetTrigger>

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

        <SheetFooter className="h-20 flex-row items-center justify-between gap-6 border-t">
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
