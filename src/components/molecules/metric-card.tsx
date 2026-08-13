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
      <CardContent className="space-y-2 p-5">
        <StatValue value={value} accent={accent} />
        <p className="text-foreground text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
