'use client';

import { ChevronUp } from 'lucide-react';
import { scrollToTop, useScrollOffset } from '@/hooks/use-scroll-offset';
import { Button } from '../ui/button';

const VISIBLE_AFTER = 300;

export const ScrollToTop = ({
  scrollableDivRef,
}: {
  scrollableDivRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const offset = useScrollOffset(scrollableDivRef);
  const isVisible = offset > VISIBLE_AFTER;

  return (
    <Button
      className={`bg-secondary hover:bg-secondary/80 fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-6 h-fit rounded-full p-2 transition-opacity duration-200 lg:bottom-8 lg:right-8
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      variant={'ghost'}
      onClick={() => scrollToTop(scrollableDivRef)}
    >
      <ChevronUp size={18} />
    </Button>
  );
};
