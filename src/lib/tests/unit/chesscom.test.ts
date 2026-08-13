import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildChessComSnapshot,
  fetchChessComProfile,
  parseChessComRecord,
  parseChessComStats,
  parseStreakFromHtml,
} from '@/lib/chesscom';
import {
  CHESS_COM_PROFILE_URL,
  CHESS_COM_USERNAME,
} from '@/constants/personal';

const sampleStats = {
  chess_rapid: {
    last: { rating: 1305, date: 1786112460, rd: 39 },
    best: { rating: 1305, date: 1786051718 },
    record: { win: 775, loss: 604, draw: 111 },
  },
  chess_blitz: {
    last: { rating: 321, date: 1786052482, rd: 118 },
    record: { win: 12, loss: 19, draw: 2 },
  },
};

describe('parseChessComStats', () => {
  it('extracts rapid rating, best, record and blitz rating + record', () => {
    expect(parseChessComStats(sampleStats)).toEqual({
      rapidRating: 1305,
      rapidBest: 1305,
      rapidRecord: { win: 775, loss: 604, draw: 111 },
      blitzRating: 321,
      blitzRecord: { win: 12, loss: 19, draw: 2 },
    });
  });

  it('returns null fields when stats sections are missing', () => {
    expect(parseChessComStats({})).toEqual({
      rapidRating: null,
      rapidBest: null,
      rapidRecord: null,
      blitzRating: null,
      blitzRecord: null,
    });
  });
});

describe('parseChessComRecord', () => {
  it('returns null when any W-L-D value is missing', () => {
    expect(parseChessComRecord({ win: 1, loss: 2 })).toBeNull();
    expect(parseChessComRecord(undefined)).toBeNull();
  });
});

describe('parseStreakFromHtml', () => {
  it('parses streakCount and streakUpdatedToday from profile HTML', () => {
    const html = `
      <script>
        window.context = {
          streakCount: 321,
          streakFrozen: false,
          streakUpdatedToday: true
        };
      </script>
    `;

    expect(parseStreakFromHtml(html)).toEqual({
      streakDays: 321,
      streakUpdatedToday: true,
    });
  });

  it('returns null streak fields without throwing when markers are absent', () => {
    expect(() => {
      expect(
        parseStreakFromHtml('<html><body>no streak data</body></html>'),
      ).toEqual({
        streakDays: null,
        streakUpdatedToday: null,
      });
    }).not.toThrow();
  });
});

describe('buildChessComSnapshot', () => {
  it('maps player + stats + streak into the public snapshot shape', () => {
    const snapshot = buildChessComSnapshot(
      {
        username: 'marcelomafradev',
        url: 'https://www.chess.com/member/marcelomafradev',
        avatar:
          'https://images.chesscomfiles.com/uploads/v1/user/456453388.200x200.jpg',
        league: 'Champion',
      },
      sampleStats,
      { streakDays: 321, streakUpdatedToday: true },
    );

    expect(snapshot).toEqual({
      username: 'marcelomafradev',
      profileUrl: 'https://www.chess.com/member/marcelomafradev',
      avatarUrl:
        'https://images.chesscomfiles.com/uploads/v1/user/456453388.200x200.jpg',
      league: 'Champion',
      rapidRating: 1305,
      rapidBest: 1305,
      rapidRecord: { win: 775, loss: 604, draw: 111 },
      blitzRating: 321,
      blitzRecord: { win: 12, loss: 19, draw: 2 },
      streakDays: 321,
      streakUpdatedToday: true,
    });
  });

  it('falls back to constants when player fields are blank', () => {
    const snapshot = buildChessComSnapshot(
      { username: '  ', url: '', avatar: '', league: '   ' },
      {},
      { streakDays: null, streakUpdatedToday: null },
    );

    expect(snapshot.username).toBe(CHESS_COM_USERNAME);
    expect(snapshot.profileUrl).toBe(CHESS_COM_PROFILE_URL);
    expect(snapshot.avatarUrl).toBeNull();
    expect(snapshot.league).toBeNull();
  });
});

describe('fetchChessComProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('aggregates player, stats, and profile streak into a snapshot', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          username: 'marcelomafradev',
          url: 'https://www.chess.com/member/marcelomafradev',
          avatar:
            'https://images.chesscomfiles.com/uploads/v1/user/456453388.200x200.jpg',
          league: 'Champion',
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => sampleStats,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => 'streakCount: 12, streakUpdatedToday: false',
      } as Response);

    await expect(fetchChessComProfile()).resolves.toEqual({
      username: 'marcelomafradev',
      profileUrl: 'https://www.chess.com/member/marcelomafradev',
      avatarUrl:
        'https://images.chesscomfiles.com/uploads/v1/user/456453388.200x200.jpg',
      league: 'Champion',
      rapidRating: 1305,
      rapidBest: 1305,
      rapidRecord: { win: 775, loss: 604, draw: 111 },
      blitzRating: 321,
      blitzRecord: { win: 12, loss: 19, draw: 2 },
      streakDays: 12,
      streakUpdatedToday: false,
    });

    expect(fetch).toHaveBeenCalledWith(
      `https://api.chess.com/pub/player/${CHESS_COM_USERNAME}`,
      expect.objectContaining({
        headers: expect.objectContaining({
          'User-Agent': expect.stringContaining('marcelomafradev-portfolio'),
        }),
        next: { revalidate: 3600 },
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      CHESS_COM_PROFILE_URL,
      expect.any(Object),
    );
  });

  it('returns null when player or stats requests fail', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => sampleStats,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => '',
      } as Response);

    await expect(fetchChessComProfile()).resolves.toBeNull();
  });

  it('tolerates a failed profile-page streak scrape', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          username: 'marcelomafradev',
          url: 'https://www.chess.com/member/marcelomafradev',
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => sampleStats,
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        text: async () => 'denied',
      } as Response);

    const snapshot = await fetchChessComProfile();

    expect(snapshot).toMatchObject({
      username: 'marcelomafradev',
      streakDays: null,
      streakUpdatedToday: null,
      rapidRating: 1305,
    });
  });

  it('returns null when the player json payload cannot be parsed', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('bad json');
        },
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => sampleStats,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => '',
      } as Response);

    await expect(fetchChessComProfile()).resolves.toBeNull();
  });

  it('returns null when the outer fetch aggregation throws', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network down'));

    await expect(fetchChessComProfile()).resolves.toBeNull();
  });

  it('returns null streak fields when the profile scrape throws', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          username: 'marcelomafradev',
          url: 'https://www.chess.com/member/marcelomafradev',
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => sampleStats,
      } as Response)
      .mockRejectedValueOnce(new Error('html scrape failed'));

    const snapshot = await fetchChessComProfile();

    expect(snapshot).toMatchObject({
      username: 'marcelomafradev',
      streakDays: null,
      streakUpdatedToday: null,
    });
  });
});
