import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resolve } from 'path';

const { readFileSyncMock, writeFileSyncMock } = vi.hoisted(() => ({
  readFileSyncMock: vi.fn(),
  writeFileSyncMock: vi.fn(),
}));

vi.mock('fs', () => ({
  readFileSync: readFileSyncMock,
  writeFileSync: writeFileSyncMock,
}));

const ROOT = process.cwd();
const ENV_PATH = resolve(ROOT, '.env');
const FLAG_PATH = resolve(ROOT, '.spotify-oauth-result.json');

describe('captureSpotifyAuthorizationCode', () => {
  beforeEach(() => {
    vi.resetModules();
    readFileSyncMock.mockReset();
    writeFileSyncMock.mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('throws when client credentials are missing from .env', async () => {
    readFileSyncMock.mockReturnValue('OTHER=1\n');

    const { captureSpotifyAuthorizationCode } =
      await import('@/lib/spotify-oauth-capture');

    await expect(captureSpotifyAuthorizationCode('code-1')).rejects.toThrow(
      'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET',
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('writes an error flag and returns ok:false when token exchange fails', async () => {
    readFileSyncMock.mockReturnValue(
      [
        'SPOTIFY_CLIENT_ID=client-id',
        "SPOTIFY_CLIENT_SECRET='client-secret'",
        '',
      ].join('\n'),
    );

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: 'invalid_grant',
        error_description: 'code expired',
      }),
    } as Response);

    const { captureSpotifyAuthorizationCode, SPOTIFY_REDIRECT_URI } =
      await import('@/lib/spotify-oauth-capture');

    const result = await captureSpotifyAuthorizationCode('bad-code');

    expect(result).toMatchObject({
      ok: false,
      error: 'invalid_grant',
      description: 'code expired',
    });
    expect(result.at).toEqual(expect.any(String));

    expect(fetch).toHaveBeenCalledOnce();
    expect(vi.mocked(fetch).mock.calls[0]?.[0]).toBe(
      'https://accounts.spotify.com/api/token',
    );
    expect(vi.mocked(fetch).mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const body = vi.mocked(fetch).mock.calls[0]?.[1]?.body;
    expect(String(body)).toContain('grant_type=authorization_code');
    expect(String(body)).toContain('code=bad-code');
    expect(String(body)).toContain(
      `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`,
    );

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      FLAG_PATH,
      expect.stringContaining('"ok": false'),
    );
    expect(writeFileSyncMock).not.toHaveBeenCalledWith(
      ENV_PATH,
      expect.anything(),
      expect.anything(),
    );
  });

  it('returns ok:false with http status when refresh_token is missing', async () => {
    readFileSyncMock.mockReturnValue(
      'SPOTIFY_CLIENT_ID=client-id\nSPOTIFY_CLIENT_SECRET=client-secret\n',
    );

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        access_token: 'access-only',
      }),
    } as Response);

    const { captureSpotifyAuthorizationCode } =
      await import('@/lib/spotify-oauth-capture');

    const result = await captureSpotifyAuthorizationCode('code-2');

    expect(result).toMatchObject({
      ok: false,
      error: 'http_200',
      description: 'no refresh_token',
    });
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      FLAG_PATH,
      expect.stringContaining('"ok": false'),
    );
  });

  it('persists refresh token and validates it on success', async () => {
    readFileSyncMock.mockReturnValue(
      [
        '# comment',
        'SPOTIFY_CLIENT_ID="client-id"',
        'SPOTIFY_CLIENT_SECRET=client-secret',
        'SPOTIFY_REFRESH_TOKEN=old-token',
        'OTHER=keep-me',
      ].join('\n'),
    );

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          access_token: 'access',
          refresh_token: 'new-refresh-token',
          scope: 'user-read-currently-playing',
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          access_token: 'validated-access',
        }),
      } as Response);

    const { captureSpotifyAuthorizationCode } =
      await import('@/lib/spotify-oauth-capture');

    const result = await captureSpotifyAuthorizationCode('good-code');

    expect(result).toMatchObject({
      ok: true,
      refresh_token_len: 'new-refresh-token'.length,
      scope: 'user-read-currently-playing',
      test_ok: true,
      test_error: null,
    });
    expect(result.at).toEqual(expect.any(String));

    expect(fetch).toHaveBeenCalledTimes(2);

    const envWrite = writeFileSyncMock.mock.calls.find(
      (call) => call[0] === ENV_PATH,
    );
    expect(envWrite?.[1]).toContain('SPOTIFY_REFRESH_TOKEN=new-refresh-token');
    expect(envWrite?.[1]).toContain('OTHER=keep-me');
    expect(envWrite?.[1]).not.toContain('old-token');
    expect(envWrite?.[2]).toBe('utf8');

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      FLAG_PATH,
      expect.stringContaining('"ok": true'),
    );

    const refreshBody = String(vi.mocked(fetch).mock.calls[1]?.[1]?.body);
    expect(refreshBody).toContain('grant_type=refresh_token');
    expect(refreshBody).toContain('refresh_token=new-refresh-token');
  });

  it('appends SPOTIFY_REFRESH_TOKEN when the key is absent', async () => {
    readFileSyncMock.mockReturnValue(
      'SPOTIFY_CLIENT_ID=client-id\nSPOTIFY_CLIENT_SECRET=client-secret',
    );

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          refresh_token: 'appended-token',
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          error: 'invalid_client',
        }),
      } as Response);

    const { captureSpotifyAuthorizationCode } =
      await import('@/lib/spotify-oauth-capture');

    const result = await captureSpotifyAuthorizationCode('code-3');

    expect(result).toMatchObject({
      ok: true,
      refresh_token_len: 'appended-token'.length,
      scope: null,
      test_ok: false,
      test_error: 'invalid_client',
    });

    const envWrite = writeFileSyncMock.mock.calls.find(
      (call) => call[0] === ENV_PATH,
    );
    expect(String(envWrite?.[1])).toContain(
      'SPOTIFY_REFRESH_TOKEN=appended-token',
    );
  });

  it('ignores blank lines and comments while loading env values', async () => {
    readFileSyncMock.mockReturnValue(
      [
        '',
        '# ignored',
        'not-a-pair',
        'SPOTIFY_CLIENT_ID=client-id',
        'SPOTIFY_CLIENT_SECRET=client-secret',
      ].join('\n'),
    );

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const { captureSpotifyAuthorizationCode } =
      await import('@/lib/spotify-oauth-capture');

    const result = await captureSpotifyAuthorizationCode('code-4');

    expect(result).toMatchObject({
      ok: false,
      error: 'http_500',
      description: 'no refresh_token',
    });
  });
});
