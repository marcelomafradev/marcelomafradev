import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}

export const PageHeading = ({
  title,
  description,
  eyebrow,
  action,
  className,
  as: Tag = 'h1',
}: PageHeadingProps) => {
  return (
    <header
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-2.5">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

        <Tag
          className={cn(
            'text-balance font-semibold tracking-[-0.03em]',
            Tag === 'h1'
              ? 'text-3xl md:text-4xl lg:text-5xl'
              : 'text-xl md:text-2xl',
          )}
        >
          {title}
        </Tag>

        {description ? (
          <p className="text-muted-foreground max-w-2xl text-pretty text-[15px] leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
};
