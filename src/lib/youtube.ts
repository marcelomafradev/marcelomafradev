export async function searchSongVideo(
  songTitle: string,
): Promise<string | null> {
  const key = process.env.YOUTUBE_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key || !songTitle.trim()) return null;

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'id');
  url.searchParams.set('q', `${songTitle} official music video`);
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', '1');
  url.searchParams.set('key', key);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      items?: { id?: { videoId?: string } }[];
    };
    const id = data.items?.[0]?.id?.videoId;
    return id ? `https://www.youtube.com/watch?v=${id}` : null;
  } catch {
    return null;
  }
}
