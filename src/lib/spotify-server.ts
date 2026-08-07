import { getFavoriteSongs, getPlayingNow, parseSong } from '@/lib/spotify';
import { NowPlayingResult, RawSongModel, SongModel } from '@/types';

export type { NowPlayingResult };

const idle: NowPlayingResult = { is_playing: false };

export async function fetchNowPlaying(): Promise<NowPlayingResult> {
  try {
    const response = await getPlayingNow();

    if (response.status === 204 || response.status >= 400) {
      return idle;
    }

    const song: RawSongModel | null = await response.json().catch(() => null);

    if (!song || song.item === null) {
      return idle;
    }

    return parseSong(song);
  } catch {
    return idle;
  }
}

export async function fetchTopTracks(): Promise<SongModel[]> {
  try {
    const response = await getFavoriteSongs();

    if (response.status === 204 || response.status >= 400) {
      return [];
    }

    const body = await response.json().catch(() => null);

    if (!body || !Array.isArray(body.items)) {
      return [];
    }

    return body.items.map((track: RawSongModel['item']) =>
      parseSong({
        item: track,
        is_playing: false,
      }),
    );
  } catch {
    return [];
  }
}
