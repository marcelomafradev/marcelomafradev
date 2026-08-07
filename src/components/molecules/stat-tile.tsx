import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  footnote?: ReactNode;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  hintClassName?: string;
}

/** Renders `dt`/`dd`, so it must be placed inside a `dl`. */
export const StatTile = ({
  icon: TileIcon,
  label,
  value,
  hint,
  footnote,
  className,
  iconClassName,
  valueClassName,
  hintClassName,
}: StatTileProps) => {
  return (
    <Card
      className={cn(
        'border-border/60 bg-background/60 rounded-xl px-4 py-3 shadow-none',
        className,
      )}
    >
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
        <TileIcon className={cn('size-3.5', iconClassName)} />
        {label}
      </dt>

      <dd className="mt-2 space-y-1">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-foreground text-2xl font-semibold tabular-nums leading-none',
              valueClassName,
            )}
          >
            {value}
          </span>

          {hint ? (
            <span
              className={cn(
                'text-muted-foreground text-xs tabular-nums',
                hintClassName,
              )}
            >
              {hint}
            </span>
          ) : null}
        </div>

        {footnote ? (
          <p className="text-muted-foreground text-xs tabular-nums">
            {footnote}
          </p>
        ) : null}
      </dd>
    </Card>
  );
};
