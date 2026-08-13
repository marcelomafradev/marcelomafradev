import { cn } from '@/lib/utils';

interface DetailListProps {
  items: string[];
  className?: string;
}

export const DetailList = ({ items, className }: DetailListProps) => {
  if (items.length === 0) return null;

  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
          />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
};
