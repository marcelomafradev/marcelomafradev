import { Link } from '@/components/atoms';
import { IconType } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ContactChannelProps {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export const ContactChannel = ({
  icon: Icon,
  label,
  value,
  href,
  className,
}: ContactChannelProps) => {
  const content = (
    <>
      <span className="border-border/70 text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border">
        <Icon className="size-4" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="text-muted-foreground block text-[11px] font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className="text-foreground block truncate text-sm">{value}</span>
      </span>

      {href ? (
        <ArrowUpRight className="text-muted-foreground size-4 shrink-0" />
      ) : null}
    </>
  );

  const baseClassName = cn(
    'group flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-3 transition-colors',
    href && 'hover:border-primary/40 hover:bg-accent/60',
    className,
  );

  if (!href) {
    return <div className={baseClassName}>{content}</div>;
  }

  return (
    <Link href={href} type="external" className={baseClassName}>
      {content}
    </Link>
  );
};
