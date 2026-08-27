'use client';

import { useRef } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ScrollToTop } from '@/components/molecules';
import { Sidebar } from './sidebar';
import { Menu } from './menu';
import { BottomTabs } from './bottom-tabs';
import { SiteFooter } from '../site-footer';

export const Navigation = ({ children }: { children: React.ReactNode }) => {
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider className="bg-background min-h-svh w-full">
      <div className="hidden lg:contents">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Menu scrollableDivRef={scrollableDivRef} />
        <BottomTabs />
      </div>

      <SidebarInset
        ref={scrollableDivRef}
        className="bg-background max-h-svh min-w-0 flex-1 overflow-y-auto pt-16 lg:pt-0"
      >
        <div className="relative flex min-h-full shrink-0 flex-col pb-[calc(3.5rem+1px+env(safe-area-inset-bottom))] lg:pb-0">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <ScrollToTop scrollableDivRef={scrollableDivRef} />
      </SidebarInset>
    </SidebarProvider>
  );
};
