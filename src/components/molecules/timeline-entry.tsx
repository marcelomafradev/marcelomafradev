import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DetailList } from './detail-list';

interface TimelineEntryProps {
  title: ReactNode;
  subtitle?: string;
  meta?: string;
  details?: string[];
  leading?: ReactNode;
  className?: string;
}

export const TimelineEntry = ({
  title,
  subtitle,
  meta,
  details = [],
  leading,
  className,
}: TimelineEntryProps) => {
  return (
    <Card
      className={cn(
        'border-border/60 bg-card/70 hover:border-primary/30 hover:bg-card shadow-sm transition-colors',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
        {leading ? <div className="shrink-0 pt-0.5">{leading}</div> : null}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-base font-semibold tracking-tight md:text-lg">
                {title}
              </CardTitle>
              {subtitle ? (
                <CardDescription className="text-sm">
                  {subtitle}
                </CardDescription>
              ) : null}
            </div>
            {meta ? (
              <p className="text-muted-foreground shrink-0 text-xs sm:text-right">
                {meta}
              </p>
            ) : null}
          </div>
        </div>
      </CardHeader>
      {details.length > 0 ? (
        <CardContent className="pt-0">
          <DetailList items={details} />
        </CardContent>
      ) : null}
    </Card>
  );
};
