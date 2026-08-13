import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/atoms';
import {
  RecordMeter,
  StatTile,
  type RecordMeterEntry,
} from '@/components/molecules';
import { fetchChessComProfile, type ChessComRecord } from '@/lib/chesscom';
import { ExternalLink, Flame, Timer, Trophy, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const countGames = (record: ChessComRecord | null) =>
  record ? record.win + record.loss + record.draw : 0;

export const ChessComCard = async () => {
  const t = await getTranslations('about.chess');
  const snapshot = await fetchChessComProfile();

  if (!snapshot) {
    return null;
  }

  const {
    streakDays,
    rapidRating,
    rapidBest,
    blitzRating,
    rapidRecord,
    blitzRecord,
    league,
    profileUrl,
  } = snapshot;

  const rapidGames = countGames(rapidRecord);
  const blitzGames = countGames(blitzRecord);

  const toPercent = (value: number) =>
    rapidGames > 0 ? (value / rapidGames) * 100 : 0;

  const winRate = rapidRecord ? Math.round(toPercent(rapidRecord.win)) : 0;

  const rapidGamesLabel = t('games', { count: rapidGames });
  const blitzGamesLabel = t('games', { count: blitzGames });
  const recordSummary = `${rapidGamesLabel} · ${t('win-rate', { value: winRate })}`;

  const recordEntries: RecordMeterEntry[] = rapidRecord
    ? [
        {
          id: 'wins',
          label: t('wins'),
          value: rapidRecord.win,
          swatchClassName: 'bg-chess',
        },
        {
          id: 'losses',
          label: t('losses'),
          value: rapidRecord.loss,
          swatchClassName: 'bg-chess-loss',
        },
        {
          id: 'draws',
          label: t('draws'),
          value: rapidRecord.draw,
          swatchClassName: 'bg-muted-foreground/40',
        },
      ]
    : [];

  return (
    <Card className="border-border/60 bg-card relative overflow-hidden">
      <div
        aria-hidden
        className="text-chess bg-size-[28px_28px] pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(currentColor_0%_25%,transparent_0%_50%)] opacity-[0.06]"
      />
      <div
        aria-hidden
        className="bg-chess pointer-events-none absolute inset-x-0 top-0 h-1"
      />

      <CardContent className="relative flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <Icon.chesscom className="size-11 shrink-0" />

            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                  {t('title')}
                </h2>

                {league ? (
                  <Badge
                    variant="outline"
                    className="border-chess/40 bg-chess/10 text-chess-strong gap-1 font-medium"
                  >
                    <Trophy className="size-3" />
                    {league}
                  </Badge>
                ) : null}
              </div>

              <p className="text-muted-foreground text-pretty text-sm font-light">
                {t('description')}
              </p>
            </div>
          </div>

          <Button
            className="bg-chess text-chess-foreground hover:bg-chess-hover shrink-0 rounded-lg"
            render={<Link type="external" href={profileUrl} />}
          >
            {t('open-profile')}
            <ExternalLink className="size-3.5 shrink-0 opacity-80" />
          </Button>
        </div>

        <dl className="grid gap-3">
          {streakDays !== null ? (
            <StatTile
              icon={Flame}
              iconClassName="text-chess-accent"
              label={t('streak')}
              value={streakDays}
              valueClassName="text-5xl md:text-6xl"
              hint={t('days')}
              hintClassName="text-sm font-medium"
              className="border-chess/35 bg-chess/10 px-5 py-4"
            />
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            {rapidRating !== null || rapidGames > 0 ? (
              <StatTile
                icon={Timer}
                iconClassName="text-chess"
                label={t('rapid')}
                value={rapidRating}
                hint={
                  rapidBest !== null ? t('best', { rating: rapidBest }) : null
                }
                footnote={rapidGames > 0 ? rapidGamesLabel : null}
              />
            ) : null}

            {blitzRating !== null || blitzGames > 0 ? (
              <StatTile
                icon={Zap}
                iconClassName="text-chess-accent"
                label={t('blitz')}
                value={blitzRating}
                footnote={blitzGames > 0 ? blitzGamesLabel : null}
              />
            ) : null}
          </div>
        </dl>

        {rapidRecord && rapidGames > 0 ? (
          <RecordMeter
            label={t('record')}
            summary={recordSummary}
            percent={winRate}
            entries={recordEntries}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};
