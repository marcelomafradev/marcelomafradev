import { Link } from './link';
import { Image } from './image';
import { cn } from '@/lib/utils';

export const TechButton = ({
  icon,
  link,
  name,
  invert,
}: {
  link: string;
  name: string;
  icon: string;
  invert?: boolean;
}) => {
  return (
    <Link
      href={link}
      type="external"
      className="border-border/60 text-card-foreground hover:border-foreground/25 hover:bg-accent/40 focus-visible:ring-ring group flex min-h-14 items-center gap-3 rounded-xl border p-3 transition-colors focus-visible:outline-none focus-visible:ring-2"
    >
      <div className="border-border/40 bg-card/80 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-2">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className={cn('z-10 size-5 object-contain', invert && 'invert')}
          loading="lazy"
          aria-hidden
        />
        <Image
          src={icon}
          alt=""
          width={8}
          height={8}
          className="absolute inset-0 z-0 size-full scale-125 opacity-50 blur-lg"
          aria-hidden
        />
      </div>

      <p className="text-xs font-medium md:text-sm">{name}</p>
    </Link>
  );
};
