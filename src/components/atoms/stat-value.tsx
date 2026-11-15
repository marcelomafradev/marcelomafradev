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
        <span className="text-primary ml-0.5 align-baseline text-3xl md:text-4xl">
          {accent}
        </span>
      ) : null}
    </p>
  );
};
