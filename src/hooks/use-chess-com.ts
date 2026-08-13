'use client';

import { useEffect, useState } from 'react';
import type { ChessComSnapshot } from '@/lib/chesscom';

type ChessComState = {
  data: ChessComSnapshot | null;
  loading: boolean;
};

export function useChessCom(): ChessComState {
  const [state, setState] = useState<ChessComState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch('/api/chess', {
          signal: controller.signal,
        });

        if (!response.ok) {
          if (!cancelled) {
            setState({ data: null, loading: false });
          }
          return;
        }

        const snapshot = (await response.json()) as ChessComSnapshot;

        if (!cancelled) {
          setState({ data: snapshot, loading: false });
        }
      } catch {
        if (!cancelled && !controller.signal.aborted) {
          setState({ data: null, loading: false });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
