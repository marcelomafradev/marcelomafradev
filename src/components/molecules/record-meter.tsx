import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
} from '@/components/ui/meter';
import { cn } from '@/lib/utils';

export interface RecordMeterEntry {
  id: string;
  label: string;
  value: number;
  swatchClassName: string;
}

interface RecordMeterProps {
  label: string;
  summary: string;
  percent: number;
  entries: RecordMeterEntry[];
  indicatorClassName?: string;
  className?: string;
}

export const RecordMeter = ({
  label,
  summary,
  percent,
  entries,
  indicatorClassName,
  className,
}: RecordMeterProps) => {
  return (
    <Meter
      value={percent}
      aria-valuetext={summary}
      className={cn('space-y-2.5', className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <MeterLabel>{label}</MeterLabel>
        <span className="text-muted-foreground text-xs tabular-nums">
          {summary}
        </span>
      </div>

      <MeterTrack>
        <MeterIndicator className={cn('bg-chess', indicatorClassName)} />
      </MeterTrack>

      <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {entries.map(({ id, label: entryLabel, value, swatchClassName }) => (
          <li key={id} className="flex items-center gap-1.5">
            <span className={cn('size-2 rounded-full', swatchClassName)} />
            {entryLabel}
            <span className="text-foreground font-medium tabular-nums">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </Meter>
  );
};
