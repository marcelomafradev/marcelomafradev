'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type FilterPill = {
  key: string;
  label: string;
};

interface FilterPillsProps {
  items: FilterPill[];
  value: string;
  onChange: (_key: string) => void;
  ariaLabel: string;
  className?: string;
}

export const FilterPills = ({
  items,
  value,
  onChange,
  ariaLabel,
  className,
}: FilterPillsProps) => {
  return (
    <div
      className={cn('flex flex-wrap gap-2', className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const active = value === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className="focus-visible:ring-ring inline-flex min-h-11 items-center rounded-full focus-visible:outline-none focus-visible:ring-2"
          >
            <Badge
              variant={active ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer px-3 py-1 font-mono text-[11px] font-normal transition-colors',
                active
                  ? 'bg-foreground text-background border-transparent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {item.label}
            </Badge>
          </button>
        );
      })}
    </div>
  );
};
