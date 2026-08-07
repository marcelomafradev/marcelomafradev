'use client';

import { useSyncExternalStore } from 'react';
import { NowPlayingResult } from '@/types';

const POLL_MS = 30_000;

let snapshot: NowPlayingResult | undefined;
let intervalId: number | undefined;
let controller: AbortController | undefined;
const listeners = new Set<() => void>();

function emit(next: NowPlayingResult | undefined) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

async function load() {
  if (document.hidden) return;

  try {
    const response = await fetch('/api/spotify/now-playing', {
      signal: controller?.signal,
      cache: 'no-store',
    });

    emit(
      response.ok
        ? ((await response.json()) as NowPlayingResult)
        : { is_playing: false },
    );
  } catch {
    if (controller?.signal.aborted) return;
    emit({ is_playing: false });
  }
}

function onVisibilityChange() {
  if (!document.hidden) void load();
}

function start() {
  controller = new AbortController();
  void load();
  intervalId = window.setInterval(() => void load(), POLL_MS);
  document.addEventListener('visibilitychange', onVisibilityChange);
}

function stop() {
  controller?.abort();
  controller = undefined;
  window.clearInterval(intervalId);
  intervalId = undefined;
  document.removeEventListener('visibilitychange', onVisibilityChange);
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) start();
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}

export function useNowPlaying() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => undefined,
  );
}
