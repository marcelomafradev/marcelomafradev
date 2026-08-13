import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RawSongModel, SongModel } from '@/types';

const { getPlayingNowMock, getFavoriteSongsMock, parseSongMock } = vi.hoisted(
  () => ({
    getPlayingNowMock: vi.fn(),
    getFavoriteSongsMock: vi.fn(),
    parseSongMock: vi.fn(),
  }),
);

vi.mock('@/lib/spotify', () => ({
  getPlayingNow: getPlayingNowMock,
  getFavoriteSongs: getFavoriteSongsMock,
  parseSong: parseSongMock,
}));

const { fetchNowPlaying, fetchTopTracks } =
  await import('@/lib/spotify-server');

function buildParsedSong(overrides: Partial<SongModel> = {}): SongModel {
  return {
    is_playing: true,
    id: 'track-id',
    title: 'Track Name',
    album: 'Album Name',
    artist: 'Artist One',
    album_image_url: 'medium.jpg',
    song_url: 'https://open.spotify.com/track/track-id',
    preview_url: 'https://p.scdn.co/mp3-preview/preview',
    explicit: false,
    popularity: 50,
    ...overrides,
  };
}

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    json: async () => body,
  };
}

describe('fetchNowPlaying', () => {
  beforeEach(() => {
    getPlayingNowMock.mockReset();
    parseSongMock.mockReset();
  });

  it('returns idle for a 204 response', async () => {
    getPlayingNowMock.mockResolvedValue(jsonResponse(204, null));

    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
    expect(parseSongMock).not.toHaveBeenCalled();
  });

  it('returns idle for status >= 400', async () => {
    getPlayingNowMock.mockResolvedValue(jsonResponse(401, { error: 'auth' }));

    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
    expect(parseSongMock).not.toHaveBeenCalled();
  });

  it('returns a parsed song for a valid body', async () => {
    const raw = {
      is_playing: true,
      item: { id: 'track-id', name: 'Track Name' },
    } as Pick<RawSongModel, 'item' | 'is_playing'>;
    const parsed = buildParsedSong();

    getPlayingNowMock.mockResolvedValue(jsonResponse(200, raw));
    parseSongMock.mockReturnValue(parsed);

    await expect(fetchNowPlaying()).resolves.toEqual(parsed);
    expect(parseSongMock).toHaveBeenCalledWith(raw);
  });

  it('returns idle when the body is null or item is null', async () => {
    getPlayingNowMock
      .mockResolvedValueOnce({
        status: 200,
        json: async () => null,
      })
      .mockResolvedValueOnce(
        jsonResponse(200, { is_playing: false, item: null }),
      )
      .mockResolvedValueOnce({
        status: 200,
        json: async () => {
          throw new Error('bad json');
        },
      });

    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
    expect(parseSongMock).not.toHaveBeenCalled();
  });

  it('returns idle when getPlayingNow throws', async () => {
    getPlayingNowMock.mockRejectedValue(new Error('network'));

    await expect(fetchNowPlaying()).resolves.toEqual({ is_playing: false });
  });
});

describe('fetchTopTracks', () => {
  beforeEach(() => {
    getFavoriteSongsMock.mockReset();
    parseSongMock.mockReset();
  });

  it('returns an empty array for a 204 response', async () => {
    getFavoriteSongsMock.mockResolvedValue(jsonResponse(204, null));

    await expect(fetchTopTracks()).resolves.toEqual([]);
    expect(parseSongMock).not.toHaveBeenCalled();
  });

  it('returns an empty array for status >= 400', async () => {
    getFavoriteSongsMock.mockResolvedValue(jsonResponse(500, { error: 'x' }));

    await expect(fetchTopTracks()).resolves.toEqual([]);
  });

  it('maps items through parseSong', async () => {
    const trackA = { id: 'a', name: 'A' };
    const trackB = { id: 'b', name: 'B' };
    const parsedA = buildParsedSong({ id: 'a', title: 'A', is_playing: false });
    const parsedB = buildParsedSong({ id: 'b', title: 'B', is_playing: false });

    getFavoriteSongsMock.mockResolvedValue(
      jsonResponse(200, { items: [trackA, trackB] }),
    );
    parseSongMock.mockReturnValueOnce(parsedA).mockReturnValueOnce(parsedB);

    await expect(fetchTopTracks()).resolves.toEqual([parsedA, parsedB]);

    expect(parseSongMock).toHaveBeenNthCalledWith(1, {
      item: trackA,
      is_playing: false,
    });
    expect(parseSongMock).toHaveBeenNthCalledWith(2, {
      item: trackB,
      is_playing: false,
    });
  });

  it('returns an empty array when body/items are invalid', async () => {
    getFavoriteSongsMock
      .mockResolvedValueOnce({
        status: 200,
        json: async () => null,
      })
      .mockResolvedValueOnce(jsonResponse(200, { items: 'nope' }))
      .mockResolvedValueOnce({
        status: 200,
        json: async () => {
          throw new Error('bad json');
        },
      });

    await expect(fetchTopTracks()).resolves.toEqual([]);
    await expect(fetchTopTracks()).resolves.toEqual([]);
    await expect(fetchTopTracks()).resolves.toEqual([]);
    expect(parseSongMock).not.toHaveBeenCalled();
  });

  it('returns an empty array when getFavoriteSongs throws', async () => {
    getFavoriteSongsMock.mockRejectedValue(new Error('network'));

    await expect(fetchTopTracks()).resolves.toEqual([]);
  });
});
