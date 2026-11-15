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
      <g transform="translate(0 -0.5)">
        <path
          d="M12 36V13M36 36V13M12 13L24 27L36 13"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-foreground"
        />
      </g>
    </svg>
  );
};
