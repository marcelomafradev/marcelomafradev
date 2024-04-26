'use client';

import { useMediaQuery } from '@/hooks';
import Sidebar from './sidebar';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const Navigation = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <main className={cn('flex', isMobile ? 'flex-col' : 'flex-row')}>
      {isMobile ? <div>use sheet</div> : <Sidebar />}

      <div className="flex-1">{children}</div>
    </main>
  );
};

export default Navigation;
