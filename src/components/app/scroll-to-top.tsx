'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

const ScrollToTop = ({
  scrollableDivRef,
}: {
  scrollableDivRef: React.RefObject<HTMLDivElement>;
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
      className={`fixed bottom-4 right-6 h-fit rounded-full bg-secondary p-2 transition-opacity duration-200 hover:bg-secondary/80 md:bottom-8 md:right-8 
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      variant={'ghost'}
      onClick={scrollToTop}
    >
      <ChevronUp size={18} />
    </Button>
  );
};

export default ScrollToTop;
