/** @vitest-environment jsdom */
import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useIsMobile } from '@/hooks/use-mobile';

const MOBILE_QUERY = '(max-width: 767px)';

type MatchMediaController = {
  setMatches: (next: boolean) => void;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
};

function mockMatchMedia(initialMatches: boolean): MatchMediaController {
  const listeners = new Set<EventListener>();
  let matches = initialMatches;

  const addEventListener = vi.fn(
    (event: string, listener: EventListenerOrEventListenerObject) => {
      if (event === 'change' && typeof listener === 'function') {
        listeners.add(listener);
      }
    },
  );

  const removeEventListener = vi.fn(
    (event: string, listener: EventListenerOrEventListenerObject) => {
      if (event === 'change' && typeof listener === 'function') {
        listeners.delete(listener);
      }
    },
  );

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: MOBILE_QUERY,
    onchange: null,
    addEventListener,
    removeEventListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => {
      expect(query).toBe(MOBILE_QUERY);
      return mediaQueryList;
    }),
  });

  return {
    addEventListener,
    removeEventListener,
    setMatches(next: boolean) {
      matches = next;
      const event = { matches: next } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe('useIsMobile', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when the viewport does not match the mobile query (server snapshot default)', () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('returns true when matchMedia reports a mobile viewport', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('subscribes to media query changes and updates when the viewport crosses the breakpoint', () => {
    const controller = mockMatchMedia(false);

    const { result, unmount } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
    expect(controller.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    act(() => {
      controller.setMatches(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      controller.setMatches(false);
    });
    expect(result.current).toBe(false);

    unmount();
    expect(controller.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('returns false from the server snapshot during SSR', () => {
    mockMatchMedia(true);

    function Probe() {
      const mobile = useIsMobile();
      return <span>{String(mobile)}</span>;
    }

    const html = renderToString(<Probe />);
    // server snapshot is hard-coded false regardless of matchMedia
    expect(html).toContain('false');
  });

});
