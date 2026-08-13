import { cn } from '@/lib/utils';

interface AvailabilityBadgeProps {
  label: string;
  className?: string;
}

export const AvailabilityBadge = ({
  label,
  className,
}: AvailabilityBadgeProps) => {
  return (
    <span
      className={cn(
        'text-muted-foreground inline-flex items-center gap-2 text-xs font-medium',
        className,
      )}
    >
      <span aria-hidden className="bg-primary size-1.5 rounded-full" />
      {label}
    </span>
  );
};
