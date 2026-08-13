import { Meter as MeterPrimitive } from '@base-ui/react/meter';

import { cn } from '@/lib/utils';

function Meter({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Root>) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Label>) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={cn(
        'text-muted-foreground text-xs font-medium uppercase tracking-wide',
        className,
      )}
      {...props}
    />
  );
}

function MeterValue({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Value>) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={cn('text-muted-foreground text-xs tabular-nums', className)}
      {...props}
    />
  );
}

function MeterTrack({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Track>) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={cn(
        'bg-muted h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
}

function MeterIndicator({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Indicator>) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={cn('bg-primary h-full transition-[width]', className)}
      {...props}
    />
  );
}

export { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator };
