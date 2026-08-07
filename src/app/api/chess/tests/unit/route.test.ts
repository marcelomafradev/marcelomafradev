import { beforeEach, describe, expect, it, vi } from 'vitest';

const { fetchChessComProfileMock } = vi.hoisted(() => ({
  fetchChessComProfileMock: vi.fn(),
}));

vi.mock('@/lib/chesscom', () => ({
  fetchChessComProfile: fetchChessComProfileMock,
}));

import { GET } from '@/app/api/chess/route';

describe('GET /api/chess', () => {
  beforeEach(() => {
    fetchChessComProfileMock.mockReset();
  });

  it('returns 503 when the chess snapshot is unavailable', async () => {
    fetchChessComProfileMock.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'unavailable' });
  });

  it('returns the snapshot with long-lived cache headers', async () => {
    const snapshot = {
      username: 'marcelomafradev',
      profileUrl: 'https://www.chess.com/member/marcelomafradev',
      avatarUrl: null,
      league: 'Champion',
      rapidRating: 1305,
      rapidBest: 1305,
      rapidRecord: { win: 775, loss: 604, draw: 111 },
      blitzRating: 321,
      streakDays: 321,
      streakUpdatedToday: true,
    };

    fetchChessComProfileMock.mockResolvedValue(snapshot);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(snapshot);
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=3600, stale-while-revalidate=600',
    );
  });
});
