import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RawSongModel } from '@/types';
import { getFavoriteSongs, getPlayingNow, parseSong } from '@/lib/spotify';

type Image = RawSongModel['item']['album']['images'][number];
type Artist = RawSongModel['item']['album']['artists'][number];

function buildArtist(name: string): Artist {
  return {
    external_urls: { spotify: `https://open.spotify.com/artist/${name}` },
    href: `https://api.spotify.com/v1/artists/${name}`,
    id: name,
    name,
    type: 'artist',
    uri: `spotify:artist:${name}`,
  };
}

function buildTrack({
  images,
  artists = [buildArtist('Artist One')],
}: {
  images: Image[];
  artists?: Artist[];
}): Pick<RawSongModel, 'item' | 'is_playing'> {
  return {
    is_playing: true,
    item: {
      album: {
        album_type: 'album',
        artists,
        external_urls: { spotify: 'https://open.spotify.com/album/album-id' },
        href: 'https://api.spotify.com/v1/albums/album-id',
        id: 'album-id',
        images,
        is_playable: true,
        name: 'Album Name',
        release_date: '2024-01-01',
        release_date_precision: 'day',
        total_tracks: 1,
        type: 'album',
        uri: 'spotify:album:album-id',
      },
      artists,
      disc_number: 1,
      duration_ms: 180000,
      explicit: false,
      external_ids: { isrc: 'ISRC' },
      external_urls: { spotify: 'https://open.spotify.com/track/track-id' },
      href: 'https://api.spotify.com/v1/tracks/track-id',
      id: 'track-id',
      is_local: false,
      is_playable: true,
      name: 'Track Name',
      popularity: 50,
      preview_url: 'https://p.scdn.co/mp3-preview/preview',
      track_number: 1,
      type: 'track',
      uri: 'spotify:track:track-id',
    },
  };
}

const originalEnv = { ...process.env };

function tokenResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('getPlayingNow / getFavoriteSongs', () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SPOTIFY_CLIENT_ID: 'client-id',
      SPOTIFY_CLIENT_SECRET: 'client-secret',
      SPOTIFY_REFRESH_TOKEN: 'refresh-token',
    };
    Reflect.deleteProperty(process.env, 'SPOTIFY_FAVORITE_SONGS_LIMIT');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('requests a currently-playing payload with a bearer access token', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        tokenResponse(200, { access_token: 'access-123' }) as Response,
      )
      .mockResolvedValueOnce({ ok: true, status: 200 } as Response);

    await getPlayingNow();

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Basic ${Buffer.from('client-id:client-secret').toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: expect.stringContaining('grant_type=refresh_token'),
      }),
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.spotify.com/v1/me/player/currently-playing',
      expect.objectContaining({
        headers: { Authorization: 'Bearer access-123' },
        next: { revalidate: 3 },
      }),
    );
  });

  it('throws when the token endpoint fails', async () => {
    vi.mocked(fetch).mockResolvedValue(
      tokenResponse(401, { error: 'invalid_client' }) as Response,
    );

    await expect(getPlayingNow()).rejects.toThrow(
      'Spotify token request failed with status 401',
    );
  });

  it('throws when the token payload omits access_token', async () => {
    vi.mocked(fetch).mockResolvedValue(
      tokenResponse(200, { token_type: 'Bearer' }) as Response,
    );

    await expect(getPlayingNow()).rejects.toThrow(
      'Spotify token response missing access_token',
    );
  });

  it('uses the default favorite-songs limit when env is unset', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        tokenResponse(200, { access_token: 'access-123' }) as Response,
      )
      .mockResolvedValueOnce({ ok: true, status: 200 } as Response);

    await getFavoriteSongs();

    expect(String(vi.mocked(fetch).mock.calls[1]?.[0])).toContain('limit=10');
  });

  it('clamps SPOTIFY_FAVORITE_SONGS_LIMIT into the supported range', async () => {
    process.env.SPOTIFY_FAVORITE_SONGS_LIMIT = '999';
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        tokenResponse(200, { access_token: 'access-123' }) as Response,
      )
      .mockResolvedValueOnce({ ok: true, status: 200 } as Response);

    await getFavoriteSongs();

    expect(String(vi.mocked(fetch).mock.calls[1]?.[0])).toContain('limit=50');

    process.env.SPOTIFY_FAVORITE_SONGS_LIMIT = '0';
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        tokenResponse(200, { access_token: 'access-123' }) as Response,
      )
      .mockResolvedValueOnce({ ok: true, status: 200 } as Response);

    await getFavoriteSongs();

    expect(String(vi.mocked(fetch).mock.calls[3]?.[0])).toContain('limit=1');
  });

  it('honors an explicit limit argument over the env default', async () => {
    process.env.SPOTIFY_FAVORITE_SONGS_LIMIT = '20';
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        tokenResponse(200, { access_token: 'access-123' }) as Response,
      )
      .mockResolvedValueOnce({ ok: true, status: 200 } as Response);

    await getFavoriteSongs(3);

    expect(String(vi.mocked(fetch).mock.calls[1]?.[0])).toContain('limit=3');
  });
});

describe('parseSong', () => {
  it('picks the 300px image when present', () => {
    const song = parseSong(
      buildTrack({
        images: [
          { url: 'large.jpg', width: 640, height: 640 },
          { url: 'medium.jpg', width: 300, height: 300 },
          { url: 'small.jpg', width: 64, height: 64 },
        ],
      }),
    );

    expect(song.album_image_url).toBe('medium.jpg');
  });

  it('falls back to the first image when no 300px variant exists', () => {
    const song = parseSong(
      buildTrack({
        images: [{ url: 'a.jpg', width: 640, height: 640 }],
      }),
    );

    expect(song.album_image_url).toBe('a.jpg');
  });

  it('returns null for an empty images array without throwing', () => {
    expect(() => {
      const song = parseSong(buildTrack({ images: [] }));
      expect(song.album_image_url).toBeNull();
    }).not.toThrow();
  });

  it('joins multiple artist names with a comma and space', () => {
    const song = parseSong(
      buildTrack({
        images: [{ url: 'a.jpg', width: 300, height: 300 }],
        artists: [buildArtist('First'), buildArtist('Second')],
      }),
    );

    expect(song.artist).toBe('First, Second');
  });

  it('treats a missing images array as empty without throwing', () => {
    const base = buildTrack({ images: [{ url: 'a.jpg', width: 300, height: 300 }] });
    // Force missing images to exercise `?? []`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const songInput = {
      ...base,
      item: {
        ...base.item,
        album: { ...base.item.album, images: undefined as unknown as Image[] },
      },
    };

    const song = parseSong(songInput);
    expect(song.album_image_url).toBeNull();
  });
});
