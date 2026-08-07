import { fetchChessComProfile } from '@/lib/chesscom';
import { NextResponse } from 'next/server';

export async function GET() {
  const snapshot = await fetchChessComProfile();

  if (!snapshot) {
    return NextResponse.json(
      { error: 'unavailable' },
      {
        status: 503,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60',
        },
      },
    );
  }

  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
