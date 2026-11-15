import { StatValue } from '@/components/atoms';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  value: string;
  accent?: string;
  label: string;
  description: string;
  className?: string;
}

export const MetricCard = ({
  value,
  accent,
  label,
  description,
  className,
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        'border-border/60 bg-card/60 hover:border-primary/40 group relative overflow-hidden transition-colors duration-200',
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-primary/70 absolute inset-x-5 top-0 h-px"
      />
      <CardContent className="space-y-2 p-4 pt-5 sm:space-y-2.5 sm:p-5 sm:pt-6">
        <StatValue value={value} accent={accent} />
        <p className="text-foreground text-sm font-medium leading-snug">
          {label}
        </p>
        <p className="text-muted-foreground text-xs leading-snug sm:leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
