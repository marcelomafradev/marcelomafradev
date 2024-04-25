'use server';

import { getFavoriteSongs, getPlayingNow, parseSong } from '@/lib/spotify';
import { RawSongModel, SongModel } from '@/models';

const notPlayingBody = {
  message: 'No song is currently playing.',
  payload: {
    is_playing: false,
  },
};

export async function GetPlayingNowSongs() {
  try {
    const response = await getPlayingNow();

    if (response.status === 204 || response.status >= 400) {
      return notPlayingBody;
    }

    const song: RawSongModel | null = await response.json().catch(() => null);

    if (!song || song.item === null) {
      return notPlayingBody;
    }

    return parseSong(song);
  } catch (error) {
    console.error(error);
  }
}

export async function GetFavoriteSongs() {
  try {
    const response = await getFavoriteSongs();

    if (response.status === 204 || response.status >= 400) {
      return notPlayingBody;
    }

    const song = await response.json().catch(() => null);

    if (!song || song.item === null) {
      return notPlayingBody;
    }

    const favoriteSongs: SongModel[] = song.items.map(
      (song: RawSongModel['item']) =>
        parseSong({
          item: song,
          is_playing: false,
        }),
    );

    return favoriteSongs;
  } catch (error) {
    console.error(error);
  }
}
