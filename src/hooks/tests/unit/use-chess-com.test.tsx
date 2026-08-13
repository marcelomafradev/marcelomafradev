/** @vitest-environment jsdom */
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChessComSnapshot } from '@/lib/chesscom';
import { useChessCom } from '@/hooks/use-chess-com';

const snapshot: ChessComSnapshot = {
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
};

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('useChessCom', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('loads the chess snapshot and clears loading on success', async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, snapshot) as Response);

    const { result } = renderHook(() => useChessCom());

    expect(result.current).toEqual({ data: null, loading: true });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toEqual({ data: snapshot, loading: false });
    expect(fetch).toHaveBeenCalledWith(
      '/api/chess',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('returns null data when the response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(503, { error: 'unavailable' }) as Response,
    );

    const { result } = renderHook(() => useChessCom());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toEqual({ data: null, loading: false });
  });

  it('returns null data when fetch throws', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network'));

    const { result } = renderHook(() => useChessCom());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toEqual({ data: null, loading: false });
  });

  it('ignores late responses after unmount (cancelled path)', async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const pending = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    vi.mocked(fetch).mockReturnValue(pending as Promise<Response>);

    const { result, unmount } = renderHook(() => useChessCom());
    expect(result.current.loading).toBe(true);

    unmount();

    resolveFetch(jsonResponse(200, snapshot));
    // Flush microtasks; state must not update after unmount.
    await Promise.resolve();
    await Promise.resolve();

    expect(result.current).toEqual({ data: null, loading: true });
  });

  it('ignores abort errors thrown after unmount without flipping loading', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    let rejectFetch: (reason?: unknown) => void = () => {};
    const pending = new Promise((_resolve, reject) => {
      rejectFetch = reject;
    });
    vi.mocked(fetch).mockReturnValue(pending as Promise<Response>);

    const { result, unmount } = renderHook(() => useChessCom());
    unmount();
    rejectFetch(abortError);
    await Promise.resolve();
    await Promise.resolve();

    expect(result.current).toEqual({ data: null, loading: true });
  });

});
