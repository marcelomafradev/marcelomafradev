'use client';

import { useMediaQuery } from '@/hooks';
import Sidebar from './sidebar';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const Navigation = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={cn('flex', isMobile ? 'flex-col' : 'flex-row')}>
      {isMobile ? <div>use sheet</div> : <Sidebar />}
      {children}
    </div>
  );
};

export default Navigation;
