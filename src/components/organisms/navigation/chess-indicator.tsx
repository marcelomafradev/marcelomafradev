'use client';

import { Link } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useChessCom } from '@/hooks/use-chess-com';
import { useMessages } from 'next-intl';

const CHESS_BRAND_LABEL = 'Chess.com';
const STAT_SEPARATOR = ' · ';
const ARIA_SEPARATOR = ' — ';

type ChessNavMessages = {
  streak?: string;
  rapid?: string;
  open?: string;
};

export const ChessIndicator = () => {
  const messages = useMessages() as {
    navigation?: { chess?: ChessNavMessages };
  };
  const chess = messages.navigation?.chess;
  const { data, loading } = useChessCom();

  if (loading || !data || !chess) {
    return null;
  }

  const { profileUrl, streakDays, rapidRating, rapidRecord } = data;
  const hasStats =
    streakDays !== null || rapidRating !== null || rapidRecord !== null;

  if (!hasStats) {
    return null;
  }

  const ratingStat =
    rapidRating !== null ? `${STAT_SEPARATOR}${rapidRating}` : '';
  const streakStat =
    streakDays !== null ? `${STAT_SEPARATOR}${streakDays}d` : '';

  const ariaLabel = [
    chess.open ?? CHESS_BRAND_LABEL,
    rapidRating !== null
      ? `${chess.rapid ?? 'Rapid'} ${rapidRating}`
      : undefined,
    streakDays !== null
      ? `${chess.streak ?? 'Streak'} ${streakDays}`
      : undefined,
  ]
    .filter(Boolean)
    .join(ARIA_SEPARATOR);

  return (
    <Button
      variant="ghost"
      aria-label={ariaLabel}
      className="text-muted-foreground hover:text-foreground h-auto w-full min-w-0 justify-start gap-2 px-3 py-0.5 font-normal hover:bg-transparent"
      render={<Link type="external" href={profileUrl} />}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <Icon.chesscom className="size-4 opacity-80" />
      </span>

      <span className="min-w-0 truncate text-[11px]">
        <span className="font-medium">{CHESS_BRAND_LABEL}</span>
        <span className="tabular-nums">{`${ratingStat}${streakStat}`}</span>
      </span>
    </Button>
  );
};
