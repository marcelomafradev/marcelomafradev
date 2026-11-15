'use client';

import * as React from 'react';

const SCROLL_TOP = { top: 0, behavior: 'smooth' } as const;

function readOffset(ref: React.RefObject<HTMLElement | null>) {
  const windowOffset = typeof window === 'undefined' ? 0 : window.scrollY;

  return Math.max(windowOffset, ref.current?.scrollTop ?? 0);
}

export function useScrollOffset(ref: React.RefObject<HTMLElement | null>) {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const element = ref.current;
    const update = () => setOffset(readOffset(ref));

    update();

    window.addEventListener('scroll', update, { passive: true });
    element?.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      element?.removeEventListener('scroll', update);
    };
  }, [ref]);

  return offset;
}

export function scrollToTop(ref: React.RefObject<HTMLElement | null>) {
  if (typeof window !== 'undefined') {
    window.scrollTo(SCROLL_TOP);
  }

  ref.current?.scrollTo(SCROLL_TOP);
}
