import { cn } from '@/lib/utils';

interface DetailListProps {
  items: string[];
  className?: string;
  visibleCount?: number;
  moreLabel?: string;
}

const DetailItem = ({ item }: { item: string }) => (
  <li className="flex items-start gap-2.5">
    <span
      aria-hidden
      className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
    />
    <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
  </li>
);

export const DetailList = ({
  items,
  className,
  visibleCount,
  moreLabel,
}: DetailListProps) => {
  if (items.length === 0) return null;

  const collapses =
    visibleCount !== undefined &&
    Boolean(moreLabel) &&
    items.length > visibleCount;

  const visibleItems = collapses ? items.slice(0, visibleCount) : items;
  const hiddenItems = collapses ? items.slice(visibleCount) : [];

  return (
    <>
      <ul className={cn('space-y-2', className)}>
        {visibleItems.map((item) => (
          <DetailItem key={item} item={item} />
        ))}
      </ul>

      {collapses ? (
        <details>
          <summary className="text-primary mt-2 cursor-pointer text-sm hover:underline">
            {moreLabel}
          </summary>

          <ul className={cn('mt-2 space-y-2', className)}>
            {hiddenItems.map((item) => (
              <DetailItem key={item} item={item} />
            ))}
          </ul>
        </details>
      ) : null}
    </>
  );
};
