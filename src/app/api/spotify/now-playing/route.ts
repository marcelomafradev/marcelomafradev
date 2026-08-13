import { fetchNowPlaying } from '@/lib/spotify-server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json(
      { is_playing: false, error: 'misconfigured' },
      { status: 503 },
    );
  }

  const data = await fetchNowPlaying();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=15',
    },
  });
}
