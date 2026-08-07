import { RawSongModel, SongModel } from '@/types';

const DEFAULT_FAVORITE_SONGS_LIMIT = 10;
const MIN_FAVORITE_SONGS_LIMIT = 1;
const MAX_FAVORITE_SONGS_LIMIT = 50;

function favoriteSongsLimit(): number {
  const parsed = Number.parseInt(
    process.env.SPOTIFY_FAVORITE_SONGS_LIMIT ?? '',
    10,
  );

  if (!Number.isFinite(parsed)) {
    return DEFAULT_FAVORITE_SONGS_LIMIT;
  }

  return Math.min(
    MAX_FAVORITE_SONGS_LIMIT,
    Math.max(MIN_FAVORITE_SONGS_LIMIT, parsed),
  );
}

const getAccessToken = async () => {
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }).toString(),
    next: {
      revalidate: 60 * 30,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Spotify token request failed with status ${response.status}`,
    );
  }

  const payload = (await response.json()) as { access_token?: string };

  if (!payload.access_token) {
    throw new Error('Spotify token response missing access_token');
  }

  return payload;
};

export const getPlayingNow = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate: 3,
    },
  });
};

export const getFavoriteSongs = async (limit = favoriteSongsLimit()) => {
  const { access_token } = await getAccessToken();

  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${limit}&offset=0`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  );
};

export function parseSong(
  song: Pick<RawSongModel, 'item' | 'is_playing'>,
): SongModel {
  const images = song?.item.album.images ?? [];

  return {
    is_playing: song?.is_playing,
    id: song.item.id,
    title: song.item.name,
    album: song?.item.album.name,
    artist: song?.item.album.artists
      .map((artist: { name: string }) => artist.name)
      .join(', '),
    album_image_url:
      images.find((image) => image.width === 300)?.url ??
      images[0]?.url ??
      null,
    song_url: song?.item.external_urls.spotify,
    preview_url: song?.item.preview_url,
    explicit: song?.item.explicit,
    popularity: song?.item.popularity,
  };
}
