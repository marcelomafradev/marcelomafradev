/** @vitest-environment jsdom */
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NowPlayingResult } from '@/types';

const playingSnapshot: NowPlayingResult = {
  is_playing: true,
  id: 'track-id',
  title: 'Track Name',
  album: 'Album Name',
  artist: 'Artist One',
  album_image_url: 'https://example.com/cover.jpg',
  song_url: 'https://open.spotify.com/track/track-id',
  preview_url: 'https://p.scdn.co/mp3-preview/preview',
  explicit: false,
  popularity: 72,
};

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

async function renderNowPlaying() {
  const { useNowPlaying } = await import('@/hooks/use-now-playing');
  return renderHook(() => useNowPlaying());
}

describe('useNowPlaying', () => {
  beforeEach(() => {
    cleanup();
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn());
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => false,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('subscribes, loads /api/spotify/now-playing, and returns the snapshot', async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(200, playingSnapshot) as Response,
    );

    const { result, unmount } = await renderNowPlaying();

    await waitFor(() => {
      expect(result.current).toEqual(playingSnapshot);
    });

    expect(fetch).toHaveBeenCalledWith(
      '/api/spotify/now-playing',
      expect.objectContaining({
        cache: 'no-store',
        signal: expect.any(AbortSignal),
      }),
    );

    unmount();
  });

  it('emits idle when the response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(503, { error: 'unavailable' }) as Response,
    );

    const { result, unmount } = await renderNowPlaying();

    await waitFor(() => {
      expect(result.current).toEqual({ is_playing: false });
    });

    unmount();
  });

  it('emits idle when fetch throws a non-abort error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network'));

    const { result, unmount } = await renderNowPlaying();

    await waitFor(() => {
      expect(result.current).toEqual({ is_playing: false });
    });

    unmount();
  });

  it('skips loading while the document is hidden', async () => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => true,
    });

    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(200, playingSnapshot) as Response,
    );

    const { result, unmount } = await renderNowPlaying();

    await Promise.resolve();
    await Promise.resolve();

    expect(fetch).not.toHaveBeenCalled();
    expect(result.current).toBeUndefined();

    unmount();
  });

  it('reloads when the document becomes visible again', async () => {
    let hidden = true;
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => hidden,
    });

    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(200, playingSnapshot) as Response,
    );

    const { result, unmount } = await renderNowPlaying();

    expect(fetch).not.toHaveBeenCalled();

    hidden = false;
    document.dispatchEvent(new Event('visibilitychange'));

    await waitFor(() => {
      expect(result.current).toEqual(playingSnapshot);
    });

    unmount();
  });

  it('does not emit idle when the request is aborted on unsubscribe', async () => {
    let rejectFetch: (reason?: unknown) => void = () => {};
    const pending = new Promise((_resolve, reject) => {
      rejectFetch = reject;
    });
    vi.mocked(fetch).mockImplementation(
      (_input: RequestInfo | URL, init?: RequestInit) => {
        const signal = init?.signal;
        if (signal) {
          signal.addEventListener('abort', () => {
            rejectFetch(new DOMException('Aborted', 'AbortError'));
          });
        }
        return pending as Promise<Response>;
      },
    );

    const { result, unmount } = await renderNowPlaying();
    expect(result.current).toBeUndefined();

    unmount();
    await Promise.resolve();
    await Promise.resolve();

    // aborted catch returns early — snapshot stays undefined (not idle)
    expect(result.current).toBeUndefined();
  });


  it('returns undefined from the server snapshot during SSR', async () => {
    const { useNowPlaying } = await import('@/hooks/use-now-playing');

    function Probe() {
      const data = useNowPlaying();
      return <span>{data === undefined ? 'undef' : 'defined'}</span>;
    }

    const html = renderToString(<Probe />);
    expect(html).toContain('undef');
  });

});
