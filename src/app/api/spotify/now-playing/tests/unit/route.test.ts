import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { fetchNowPlayingMock } = vi.hoisted(() => ({
  fetchNowPlayingMock: vi.fn(),
}));

vi.mock('@/lib/spotify-server', () => ({
  fetchNowPlaying: fetchNowPlayingMock,
}));

import { GET } from '@/app/api/spotify/now-playing/route';

const ENV_KEYS = [
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REFRESH_TOKEN',
] as const;

describe('GET /api/spotify/now-playing', () => {
  const originalEnv = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  };

  beforeEach(() => {
    fetchNowPlayingMock.mockReset();
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (originalEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = originalEnv[key];
      }
    }
  });

  it('returns 503 when Spotify env vars are missing', async () => {
    const response = await GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      is_playing: false,
      error: 'misconfigured',
    });
    expect(fetchNowPlayingMock).not.toHaveBeenCalled();
  });

  it('returns 503 when only some Spotify env vars are set', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'client-secret';

    const response = await GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      is_playing: false,
      error: 'misconfigured',
    });
    expect(fetchNowPlayingMock).not.toHaveBeenCalled();
  });

  it('returns now-playing data with cache headers when configured', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'client-secret';
    process.env.SPOTIFY_REFRESH_TOKEN = 'refresh-token';

    const data = {
      is_playing: true,
      title: 'Song',
      artist: 'Artist',
    };
    fetchNowPlayingMock.mockResolvedValue(data);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(data);
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=15, stale-while-revalidate=15',
    );
    expect(fetchNowPlayingMock).toHaveBeenCalledOnce();
  });
});
