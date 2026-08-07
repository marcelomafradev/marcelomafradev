import { cn } from '@/lib/utils';

interface StatValueProps {
  value: string;
  accent?: string;
  className?: string;
}

export const StatValue = ({ value, accent, className }: StatValueProps) => {
  return (
    <p
      className={cn(
        'numeric text-foreground text-4xl font-semibold leading-none md:text-5xl',
        className,
      )}
    >
      {value}
      {accent ? (
        <span className="text-primary align-super text-2xl md:text-3xl">
          {accent}
        </span>
      ) : null}
    </p>
  );
};
