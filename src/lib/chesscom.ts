import {
  CHESS_COM_PROFILE_URL,
  CHESS_COM_USERNAME,
} from '@/constants/personal';

const CHESS_COM_USER_AGENT =
  'marcelomafradev-portfolio/1.0 (contact: marcelomafradev@gmail.com)';

const CHESS_COM_API_BASE = 'https://api.chess.com/pub/player';
const REVALIDATE_SECONDS = 3600;

export type ChessComRecord = {
  win: number;
  loss: number;
  draw: number;
};

export type ChessComSnapshot = {
  username: string;
  profileUrl: string;
  avatarUrl: string | null;
  league: string | null;
  rapidRating: number | null;
  rapidBest: number | null;
  rapidRecord: ChessComRecord | null;
  blitzRating: number | null;
  blitzRecord: ChessComRecord | null;
  streakDays: number | null;
  streakUpdatedToday: boolean | null;
};

type ChessComPlayerResponse = {
  username?: string;
  url?: string;
  avatar?: string;
  league?: string;
};

type ChessComStatsResponse = {
  chess_rapid?: {
    last?: { rating?: number };
    best?: { rating?: number };
    record?: { win?: number; loss?: number; draw?: number };
  };
  chess_blitz?: {
    last?: { rating?: number };
    record?: { win?: number; loss?: number; draw?: number };
  };
};

function chessHeaders(): HeadersInit {
  return {
    Accept: 'application/json, text/html;q=0.9,*/*;q=0.8',
    'User-Agent': CHESS_COM_USER_AGENT,
  };
}

function asFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null;
}

export function parseChessComRecord(
  record: { win?: number; loss?: number; draw?: number } | undefined,
): ChessComRecord | null {
  if (!record) {
    return null;
  }

  const win = asFiniteNumber(record.win);
  const loss = asFiniteNumber(record.loss);
  const draw = asFiniteNumber(record.draw);

  if (win === null || loss === null || draw === null) {
    return null;
  }

  return { win, loss, draw };
}

export function parseChessComStats(stats: ChessComStatsResponse): {
  rapidRating: number | null;
  rapidBest: number | null;
  rapidRecord: ChessComRecord | null;
  blitzRating: number | null;
  blitzRecord: ChessComRecord | null;
} {
  return {
    rapidRating: asFiniteNumber(stats.chess_rapid?.last?.rating),
    rapidBest: asFiniteNumber(stats.chess_rapid?.best?.rating),
    rapidRecord: parseChessComRecord(stats.chess_rapid?.record),
    blitzRating: asFiniteNumber(stats.chess_blitz?.last?.rating),
    blitzRecord: parseChessComRecord(stats.chess_blitz?.record),
  };
}

export function parseStreakFromHtml(html: string): {
  streakDays: number | null;
  streakUpdatedToday: boolean | null;
} {
  const streakMatch = html.match(/streakCount:\s*(\d+)/);
  const streakDays = streakMatch ? Number.parseInt(streakMatch[1], 10) : null;

  const updatedMatch = html.match(/streakUpdatedToday:\s*(true|false)/);
  const streakUpdatedToday = updatedMatch ? updatedMatch[1] === 'true' : null;

  return {
    streakDays:
      streakDays !== null && Number.isFinite(streakDays) ? streakDays : null,
    streakUpdatedToday,
  };
}

export function buildChessComSnapshot(
  player: ChessComPlayerResponse,
  stats: ChessComStatsResponse,
  streak: {
    streakDays: number | null;
    streakUpdatedToday: boolean | null;
  },
): ChessComSnapshot {
  const parsedStats = parseChessComStats(stats);

  return {
    username: asNonEmptyString(player.username) ?? CHESS_COM_USERNAME,
    profileUrl: asNonEmptyString(player.url) ?? CHESS_COM_PROFILE_URL,
    avatarUrl: asNonEmptyString(player.avatar),
    league: asNonEmptyString(player.league),
    rapidRating: parsedStats.rapidRating,
    rapidBest: parsedStats.rapidBest,
    rapidRecord: parsedStats.rapidRecord,
    blitzRating: parsedStats.blitzRating,
    blitzRecord: parsedStats.blitzRecord,
    streakDays: streak.streakDays,
    streakUpdatedToday: streak.streakUpdatedToday,
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: chessHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json().catch(() => null)) as T | null;
}

async function fetchStreakFromProfilePage(): Promise<{
  streakDays: number | null;
  streakUpdatedToday: boolean | null;
}> {
  try {
    const response = await fetch(CHESS_COM_PROFILE_URL, {
      headers: chessHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { streakDays: null, streakUpdatedToday: null };
    }

    const html = await response.text();
    return parseStreakFromHtml(html);
  } catch {
    return { streakDays: null, streakUpdatedToday: null };
  }
}

export async function fetchChessComProfile(): Promise<ChessComSnapshot | null> {
  try {
    const playerUrl = `${CHESS_COM_API_BASE}/${CHESS_COM_USERNAME}`;
    const statsUrl = `${CHESS_COM_API_BASE}/${CHESS_COM_USERNAME}/stats`;

    const [player, stats, streak] = await Promise.all([
      fetchJson<ChessComPlayerResponse>(playerUrl),
      fetchJson<ChessComStatsResponse>(statsUrl),
      fetchStreakFromProfilePage(),
    ]);

    if (!player || !stats) {
      return null;
    }

    return buildChessComSnapshot(player, stats, streak);
  } catch {
    return null;
  }
}
