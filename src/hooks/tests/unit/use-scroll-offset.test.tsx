/** @vitest-environment jsdom */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { scrollToTop, useScrollOffset } from '@/hooks/use-scroll-offset';

function setWindowScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value,
  });
}

function createElement(scrollTop = 0) {
  const node = document.createElement('div');
  Object.defineProperty(node, 'scrollTop', {
    configurable: true,
    writable: true,
    value: scrollTop,
  });
  node.scrollTo = vi.fn();
  return node;
}

function dispatchScroll(target: EventTarget) {
  act(() => {
    target.dispatchEvent(new Event('scroll'));
  });
}

describe('useScrollOffset', () => {
  beforeEach(() => {
    setWindowScrollY(0);
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates when the window scrolls', () => {
    const { result } = renderHook(() => useScrollOffset({ current: null }));

    expect(result.current).toBe(0);

    setWindowScrollY(420);
    dispatchScroll(window);

    expect(result.current).toBe(420);
  });

  it('updates when the scroll container scrolls', () => {
    const node = createElement(0);
    const { result } = renderHook(() => useScrollOffset({ current: node }));

    expect(result.current).toBe(0);

    node.scrollTop = 250;
    dispatchScroll(node);

    expect(result.current).toBe(250);
  });

  it('reports the larger of the window and container offsets', () => {
    const node = createElement(120);
    const { result } = renderHook(() => useScrollOffset({ current: node }));

    expect(result.current).toBe(120);

    setWindowScrollY(900);
    dispatchScroll(window);
    expect(result.current).toBe(900);

    node.scrollTop = 1400;
    dispatchScroll(node);
    expect(result.current).toBe(1400);

    setWindowScrollY(10);
    dispatchScroll(window);
    expect(result.current).toBe(1400);
  });

  it('removes the window and container listeners on unmount', () => {
    const node = createElement(0);
    const windowRemove = vi.spyOn(window, 'removeEventListener');
    const elementRemove = vi.spyOn(node, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollOffset({ current: node }));
    unmount();

    expect(windowRemove).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(elementRemove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('scrollToTop', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls both the window and the container to the top', () => {
    const node = createElement(500);

    scrollToTop({ current: node });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
    expect(node.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('still scrolls the window when the container is missing', () => {
    scrollToTop({ current: null });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
