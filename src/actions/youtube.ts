'use server';

import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyBAzfakAUDQYKK4AsAd9yMxTVm1PV5cpS8',
});

export async function SearchSongVideo(songTitle: string) {
  try {
    const response = await youtube.search.list({
      part: ['id'],
      q: `${songTitle} official music video`,
      type: ['video'],
    });

    if (response.data.items && response.data.items.length > 0) {
      const firstItem = response.data.items[0];

      if (firstItem && firstItem.id && firstItem.id.videoId) {
        const videoId = firstItem.id.videoId;
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error searching for song video:', error);
    return null;
  }
}
