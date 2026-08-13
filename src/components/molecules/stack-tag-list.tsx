import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StackTagListProps {
  items: readonly string[];
  label?: string;
  className?: string;
}

export const StackTagList = ({
  items,
  label,
  className,
}: StackTagListProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label ? <p className="eyebrow">{label}</p> : null}

      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item}>
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground border-transparent font-mono text-[11px] font-normal"
            >
              {item}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};
