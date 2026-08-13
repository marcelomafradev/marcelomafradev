import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = process.cwd();
const ENV_PATH = resolve(ROOT, '.env');
const FLAG_PATH = resolve(ROOT, '.spotify-oauth-result.json');

export const SPOTIFY_REDIRECT_URI = 'http://127.0.0.1:3000/callback';

function loadEnvFile() {
  const raw = readFileSync(ENV_PATH, 'utf8');
  const env: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    if (!line || line.trim().startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i === -1) continue;
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    env[line.slice(0, i).trim()] = v;
  }
  return { raw, env };
}

function upsert(raw: string, key: string, value: string) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(raw)) return raw.replace(re, line);
  return `${raw.endsWith('\n') ? raw : `${raw}\n`}${line}\n`;
}

export async function captureSpotifyAuthorizationCode(code: string) {
  const { raw, env } = loadEnvFile();
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id,
      client_secret,
    }),
  });

  const json = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || json.error || !json.refresh_token) {
    const result = {
      ok: false as const,
      error: json.error || `http_${res.status}`,
      description: json.error_description || 'no refresh_token',
      at: new Date().toISOString(),
    };
    writeFileSync(FLAG_PATH, JSON.stringify(result, null, 2));
    return result;
  }

  const next = upsert(raw, 'SPOTIFY_REFRESH_TOKEN', json.refresh_token);
  writeFileSync(ENV_PATH, next, 'utf8');

  const testRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: json.refresh_token,
      client_id,
      client_secret,
    }),
  });
  const testJson = (await testRes.json()) as {
    access_token?: string;
    error?: string;
  };

  const result = {
    ok: true as const,
    refresh_token_len: json.refresh_token.length,
    scope: json.scope || null,
    test_ok: !!testJson.access_token,
    test_error: testJson.error || null,
    at: new Date().toISOString(),
  };
  writeFileSync(FLAG_PATH, JSON.stringify(result, null, 2));
  return result;
}
