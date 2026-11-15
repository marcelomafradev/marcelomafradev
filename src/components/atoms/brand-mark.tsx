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
          d="M12.5 29V11.5L24 24L35.5 11.5V29"
          fill="none"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-foreground"
        />
        <rect
          x="8.5"
          y="36"
          width="16"
          height="4"
          rx="1.6"
          className="fill-primary-foreground"
        />
        <rect
          x="26.5"
          y="35"
          width="13"
          height="6"
          rx="1.6"
          className="fill-primary-foreground"
        />
        <rect x="29.8" y="35" width="1.4" height="6" className="fill-primary" />
        <rect x="32.6" y="35" width="1.4" height="6" className="fill-primary" />
        <rect x="35.4" y="35" width="1.4" height="6" className="fill-primary" />
      </g>
    </svg>
  );
};
