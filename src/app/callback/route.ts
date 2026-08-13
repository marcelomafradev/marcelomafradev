import {
  captureSpotifyAuthorizationCode,
  SPOTIFY_REDIRECT_URI,
} from '@/lib/spotify-oauth-capture';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }

  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');
  const home = new URL('/', request.url);
  home.host = '127.0.0.1:3000';
  home.protocol = 'http:';

  if (error) {
    home.searchParams.set('spotify_oauth', 'error');
    home.searchParams.set('spotify_error', error);
    return NextResponse.redirect(home);
  }

  if (!code) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_code',
        expected_redirect_uri: SPOTIFY_REDIRECT_URI,
      },
      { status: 400 },
    );
  }

  const result = await captureSpotifyAuthorizationCode(code);
  home.searchParams.set('spotify_oauth', result.ok ? 'ok' : 'error');
  if (!result.ok) {
    home.searchParams.set('spotify_error', result.error);
  }
  return NextResponse.redirect(home);
}
