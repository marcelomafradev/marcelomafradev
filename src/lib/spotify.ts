import { RawSongModel, SongModel } from '@/utils/types';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
  SPOTIFY_FAVORITE_SONGS_LIMIT,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
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

  return response.json();
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

export const getFavoriteSongs = async (
  limit = SPOTIFY_FAVORITE_SONGS_LIMIT,
) => {
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
  return {
    is_playing: song?.is_playing,
    id: song.item.id,
    title: song.item.name,
    album: song?.item.album.name,
    artist: song?.item.album.artists
      .map((artist: { name: string }) => artist.name)
      .join(', '),
    album_image_url:
      song?.item.album.images.find((image) => image.width === 300)?.url ||
      song?.item.album.images[0].url,
    song_url: song?.item.external_urls.spotify,
    preview_url: song?.item.preview_url,
    explicit: song?.item.explicit,
    popularity: song?.item.popularity,
  };
}
