import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { searchSongVideoMock } = vi.hoisted(() => ({
  searchSongVideoMock: vi.fn(),
}));

vi.mock('@/lib/youtube', () => ({
  searchSongVideo: searchSongVideoMock,
}));

import { GET } from '@/app/api/youtube/search/route';

function makeRequest(query = ''): NextRequest {
  const url = query
    ? `http://localhost/api/youtube/search?${query}`
    : 'http://localhost/api/youtube/search';
  return new NextRequest(url);
}

describe('GET /api/youtube/search', () => {
  const originalEnv = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  };

  beforeEach(() => {
    searchSongVideoMock.mockReset();
    delete process.env.YOUTUBE_API_KEY;
    delete process.env.GOOGLE_API_KEY;
  });

  afterEach(() => {
    for (const key of ['YOUTUBE_API_KEY', 'GOOGLE_API_KEY'] as const) {
      if (originalEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = originalEnv[key];
      }
    }
  });

  it('returns 400 when q is missing', async () => {
    const response = await GET(makeRequest());

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ url: null });
    expect(searchSongVideoMock).not.toHaveBeenCalled();
  });

  it('returns 400 when q is blank', async () => {
    const response = await GET(makeRequest('q=%20%20'));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ url: null });
    expect(searchSongVideoMock).not.toHaveBeenCalled();
  });

  it('returns 503 when no YouTube/Google API key is configured', async () => {
    const response = await GET(makeRequest('q=test'));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      url: null,
      error: 'misconfigured',
    });
    expect(searchSongVideoMock).not.toHaveBeenCalled();
  });

  it('returns the video url with cache headers when configured', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';
    searchSongVideoMock.mockResolvedValue(
      'https://www.youtube.com/watch?v=abc123',
    );

    const response = await GET(makeRequest('q=test'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      url: 'https://www.youtube.com/watch?v=abc123',
    });
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=86400, stale-while-revalidate=3600',
    );
    expect(searchSongVideoMock).toHaveBeenCalledWith('test');
  });
});
