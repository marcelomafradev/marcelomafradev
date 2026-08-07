'use client';

import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const result = matchMedia(MOBILE_QUERY);
    result.addEventListener('change', onStoreChange);
    return () => result.removeEventListener('change', onStoreChange);
  }, []);

  const getSnapshot = React.useCallback(
    () => matchMedia(MOBILE_QUERY).matches,
    [],
  );
  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
