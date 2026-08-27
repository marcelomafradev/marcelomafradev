'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

export const ScrollToTop = ({
  scrollableDivRef,
}: {
  scrollableDivRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (scrollableDivRef.current) {
        scrollableDivRef.current.scrollTop > 300
          ? setIsVisible(true)
          : setIsVisible(false);
      }
    };

    const currentScrollableDiv = scrollableDivRef.current;

    if (currentScrollableDiv) {
      currentScrollableDiv.addEventListener('scroll', toggleVisibility);
    }

    return () => {
      if (currentScrollableDiv) {
        currentScrollableDiv.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, [scrollableDivRef]);

  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Button
      className={`bg-secondary hover:bg-secondary/80 fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-6 h-fit rounded-full p-2 transition-opacity duration-200 lg:bottom-8 lg:right-8
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      variant={'ghost'}
      onClick={scrollToTop}
    >
      <ChevronUp size={18} />
    </Button>
  );
};
