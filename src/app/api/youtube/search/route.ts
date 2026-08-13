import { searchSongVideo } from '@/lib/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (!q) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  if (!process.env.YOUTUBE_API_KEY && !process.env.GOOGLE_API_KEY) {
    return NextResponse.json(
      { url: null, error: 'misconfigured' },
      { status: 503 },
    );
  }

  const url = await searchSongVideo(q);

  return NextResponse.json(
    { url },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    },
  );
}
