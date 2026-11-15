import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  title?: string;
}

export const BrandMark = ({
  className,
  title = 'marcelomafradev',
}: BrandMarkProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={cn('size-10', className)}
    >
      <title>{title}</title>
      <rect width="48" height="48" rx="11" className="fill-primary" />
      <g transform="translate(-0.75 -1.25)">
        <path
          d="M10 36V14L21 28"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-foreground"
        />
        <path
          d="M21 28L32 14V36"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-foreground"
        />
        <rect
          x="36.5"
          y="33.5"
          width="5"
          height="5"
          rx="1.6"
          className="fill-primary-foreground"
        />
      </g>
    </svg>
  );
};
