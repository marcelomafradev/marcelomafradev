'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { SIDEBAR_ITEMS, SidebarItem } from '@/helpers/constants';
import DropdownSettings from '../dropdown-settings';
import SpotifyIndicator from './spotify-indicator';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeInMotion from '../fade-in-motion';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <aside className="relative flex h-screen flex-col justify-between border-r md:w-80">
      <div>
        {isHomepage && (
          <div className="flex items-center justify-start gap-2 border-b p-4">
            <Image
              src={'/marcelomafra.jpg'}
              alt={`Marcelo Mafra image`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-sm italic">Marcelo Mafra</h2>
              <p className="text-xs font-light text-muted-foreground">
                Fullstack Developer
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 p-4">
          {SIDEBAR_ITEMS.map(({ title, items, hasArrowIcon }, index) => (
            <FadeInMotion
              key={index}
              delay={0.1 + 0.3 * index}
              className="flex flex-col gap-2"
            >
              <h2 className="px-2 text-xs font-medium italic text-muted-foreground">
                {title}
              </h2>

              <div className="flex flex-col">
                {items.map((item, index) => (
                  <SidebarButton
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
            </FadeInMotion>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 border-t pl-2 pr-3">
        <FadeInMotion delay={1.5}>
          <SpotifyIndicator />
        </FadeInMotion>

        <FadeInMotion delay={1.8}>
          <DropdownSettings />
        </FadeInMotion>
      </div>
    </aside>
  );
};

interface SidebarButtonProps extends SidebarItem {
  onClick: () => void;
  pathname: string;
  hasArrowIcon: boolean;
}

const SidebarButton = ({
  icon: Icon,
  name,
  href,
  isInactive,
  pathname,
  hasArrowIcon,
  onClick,
}: SidebarButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      className={cn('group justify-between', pathname === href && 'bg-accent')}
      onClick={onClick}
      disabled={isInactive}
    >
      <div className="flex gap-2">
        <Icon
          className={cn(
            'transition-all group-hover:text-primary/80',
            pathname === href && 'text-primary/80',
          )}
          size={15}
        />
        <span className="text-xs">{name}</span>
      </div>

      {hasArrowIcon && (
        <ArrowUpRight
          size={15}
          className="transition-all group-hover:rotate-45 group-hover:text-primary/80"
        />
      )}
    </Button>
  );
};

export default Sidebar;
