'use client';

import { useMediaQuery } from '@/hooks';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar';
import Menu from './menu';

const Navigation = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <main className={cn('flex', isMobile ? 'flex-col' : 'flex-row')}>
      {isMobile ? <Menu /> : <Sidebar />}

      <div className="max-h-screen flex-1 overflow-y-auto">{children}</div>
    </main>
  );
};

export default Navigation;
