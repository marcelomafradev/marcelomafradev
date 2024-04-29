'use client';

import { useMediaQuery } from '@/hooks';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar';
import Menu from './menu';
import ScrollToTop from '../scroll-to-top';

const Navigation = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  return (
    <main className={cn('flex', isMobile ? 'flex-col' : 'flex-row')}>
      {isMobile ? <Menu /> : <Sidebar />}

      <div
        ref={scrollableDivRef}
        className="max-h-screen flex-1 overflow-y-auto"
      >
        {children}
        <ScrollToTop scrollableDivRef={scrollableDivRef} />
      </div>
    </main>
  );
};

export default Navigation;
