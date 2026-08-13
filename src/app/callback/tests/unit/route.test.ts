import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { captureSpotifyAuthorizationCodeMock, SPOTIFY_REDIRECT_URI } =
  vi.hoisted(() => ({
    captureSpotifyAuthorizationCodeMock: vi.fn(),
    SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:3000/callback',
  }));

vi.mock('@/lib/spotify-oauth-capture', () => ({
  captureSpotifyAuthorizationCode: captureSpotifyAuthorizationCodeMock,
  SPOTIFY_REDIRECT_URI,
}));

import { GET } from '@/app/callback/route';

function makeRequest(query = ''): NextRequest {
  const url = query
    ? `http://localhost/callback?${query}`
    : 'http://localhost/callback';
  return new NextRequest(url);
}

describe('GET /callback', () => {
  beforeEach(() => {
    captureSpotifyAuthorizationCodeMock.mockReset();
    vi.stubEnv('NODE_ENV', 'development');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns 404 outside development', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const response = await GET(makeRequest('code=abc'));

    expect(response.status).toBe(404);
    expect(await response.text()).toBe('');
    expect(captureSpotifyAuthorizationCodeMock).not.toHaveBeenCalled();
  });

  it('redirects with spotify_oauth=error when error query is present', async () => {
    const response = await GET(makeRequest('error=access_denied'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://127.0.0.1:3000/?spotify_oauth=error&spotify_error=access_denied',
    );
    expect(captureSpotifyAuthorizationCodeMock).not.toHaveBeenCalled();
  });

  it('returns 400 JSON when code is missing', async () => {
    const response = await GET(makeRequest());

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      error: 'missing_code',
      expected_redirect_uri: SPOTIFY_REDIRECT_URI,
    });
    expect(captureSpotifyAuthorizationCodeMock).not.toHaveBeenCalled();
  });

  it('redirects with spotify_oauth=ok when capture succeeds', async () => {
    captureSpotifyAuthorizationCodeMock.mockResolvedValue({
      ok: true,
      refresh_token_len: 64,
      scope: 'user-read-currently-playing',
      test_ok: true,
      test_error: null,
      at: '2024-01-01T00:00:00.000Z',
    });

    const response = await GET(makeRequest('code=auth-code'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://127.0.0.1:3000/?spotify_oauth=ok',
    );
    expect(captureSpotifyAuthorizationCodeMock).toHaveBeenCalledWith(
      'auth-code',
    );
  });

  it('redirects with spotify_oauth=error when capture fails', async () => {
    captureSpotifyAuthorizationCodeMock.mockResolvedValue({
      ok: false,
      error: 'invalid_grant',
      description: 'code expired',
      at: '2024-01-01T00:00:00.000Z',
    });

    const response = await GET(makeRequest('code=bad-code'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://127.0.0.1:3000/?spotify_oauth=error&spotify_error=invalid_grant',
    );
    expect(captureSpotifyAuthorizationCodeMock).toHaveBeenCalledWith(
      'bad-code',
    );
  });
});
