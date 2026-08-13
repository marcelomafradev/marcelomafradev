import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}

export const SectionTitle = ({
  children,
  className,
  as: Tag = 'h2',
}: SectionTitleProps) => {
  return (
    <Tag
      className={cn(
        'text-lg font-semibold tracking-tight md:text-xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
};
