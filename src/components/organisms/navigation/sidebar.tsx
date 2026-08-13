'use client';

import { usePathname, HrefValue } from '@/lib/navigation';
import { PERSONAL_INFO, SIDEBAR_ITEMS } from '@/constants';
import { DropdownSettings } from '@/components/molecules';
import { Link, NavItemContent } from '@/components/atoms';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image } from '@/components/atoms';
import { ChessIndicator } from './chess-indicator';
import { SpotifyIndicator } from './spotify-indicator';
import { useTranslations } from 'next-intl';
import { isExternalHref } from '@/lib/utils';

const menuButtonClassName =
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground h-10 justify-between [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0';

export const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <ShadcnSidebar
      collapsible="none"
      className="border-sidebar-border/80 bg-sidebar/90 hidden h-svh w-72 flex-col border-r backdrop-blur-md lg:flex"
    >
      <SidebarHeader className="border-sidebar-border/70 gap-3 border-b p-4">
        <Link
          href="/"
          className="hover:bg-sidebar-accent/60 flex items-center gap-3 rounded-lg p-1 transition-colors"
        >
          <Avatar className="size-11 rounded-xl">
            <AvatarImage
              src={PERSONAL_INFO.image}
              alt={PERSONAL_INFO.name}
              className="object-cover"
              render={
                <Image
                  src={PERSONAL_INFO.image}
                  alt={PERSONAL_INFO.name}
                  width={44}
                  height={44}
                  sizes="44px"
                  className="aspect-square size-full object-cover"
                />
              }
            />
            <AvatarFallback className="rounded-xl">MM</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              {PERSONAL_INFO.name}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {PERSONAL_INFO.location}
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {SIDEBAR_ITEMS.map(({ id, items, hasArrowIcon }, index) => (
          <SidebarGroup key={id ?? index} className="py-2">
            {id ? (
              <SidebarGroupLabel className="text-muted-foreground px-2 text-[11px] font-medium uppercase tracking-wide">
                {t(`groups.${id}`)}
              </SidebarGroupLabel>
            ) : null}

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const external = isExternalHref(item.href);
                  const label = t(`items.${item.id}`);
                  const active = !external && pathname === item.href;
                  const content = (
                    <NavItemContent
                      icon={item.icon}
                      label={label}
                      hasArrowIcon={Boolean(hasArrowIcon || external)}
                    />
                  );

                  return (
                    <SidebarMenuItem key={item.id}>
                      {external ? (
                        <Link
                          href={item.href}
                          type="external"
                          data-sidebar="menu-button"
                          data-active={active}
                          className={menuButtonClassName}
                        >
                          {content}
                        </Link>
                      ) : (
                        <Link
                          href={item.href as HrefValue}
                          data-sidebar="menu-button"
                          data-active={active}
                          className={menuButtonClassName}
                        >
                          {content}
                        </Link>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="flex flex-col gap-2 p-3">
        <ChessIndicator />
        <div className="flex w-full min-w-0 items-center gap-2">
          <div className="min-w-0 flex-1">
            <SpotifyIndicator />
          </div>
          <div className="shrink-0">
            <DropdownSettings />
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};
