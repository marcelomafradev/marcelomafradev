import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { searchSongVideo } from '@/lib/youtube';

const originalEnv = { ...process.env };

describe('searchSongVideo', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.YOUTUBE_API_KEY;
    delete process.env.GOOGLE_API_KEY;
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns null when no API key is configured', async () => {
    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns null for an empty or whitespace-only title', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';

    await expect(searchSongVideo('')).resolves.toBeNull();
    await expect(searchSongVideo('   ')).resolves.toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns a youtube watch url when the API returns a videoId', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [{ id: { videoId: 'abc123' } }],
      }),
    } as Response);

    await expect(searchSongVideo('Song Title')).resolves.toBe(
      'https://www.youtube.com/watch?v=abc123',
    );

    expect(fetch).toHaveBeenCalledOnce();
    const requestedUrl = String(vi.mocked(fetch).mock.calls[0]?.[0]);
    expect(requestedUrl).toContain(
      'https://www.googleapis.com/youtube/v3/search',
    );
    expect(requestedUrl).toContain('q=Song+Title+official+music+video');
    expect(requestedUrl).toContain('key=yt-key');
    expect(vi.mocked(fetch).mock.calls[0]?.[1]).toEqual({
      next: { revalidate: 60 * 60 * 24 },
    });
  });

  it('falls back to GOOGLE_API_KEY when YOUTUBE_API_KEY is absent', async () => {
    process.env.GOOGLE_API_KEY = 'google-key';
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [{ id: { videoId: 'g1' } }],
      }),
    } as Response);

    await expect(searchSongVideo('Track')).resolves.toBe(
      'https://www.youtube.com/watch?v=g1',
    );

    const requestedUrl = String(vi.mocked(fetch).mock.calls[0]?.[0]);
    expect(requestedUrl).toContain('key=google-key');
  });

  it('returns null when the response is not ok', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
  });

  it('returns null when items are missing or videoId is absent', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [{ id: {} }] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
  });

  it('returns null when fetch throws', async () => {
    process.env.YOUTUBE_API_KEY = 'yt-key';
    vi.mocked(fetch).mockRejectedValue(new Error('network down'));

    await expect(searchSongVideo('Song Title')).resolves.toBeNull();
  });
});
