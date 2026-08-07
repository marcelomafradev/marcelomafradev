import { Image } from '@/components/atoms';
import { IconType } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

export interface ProjectMediaProps {
  title: string;
  logo?: string;
  logoOnDark?: boolean;
  icon?: IconType;
}

export const ProjectMedia = ({
  title,
  logo,
  logoOnDark,
  icon,
}: ProjectMediaProps) => {
  const FallbackIcon = icon ?? Layers;

  return (
    <div className="bg-muted/50 flex size-full flex-col items-center justify-center gap-3 p-6">
      <div
        className={cn(
          'border-border/60 flex size-24 items-center justify-center rounded-2xl border p-4',
          logoOnDark ? 'bg-neutral-900' : 'bg-white',
        )}
      >
        {logo ? (
          <div className="relative size-full">
            <Image
              src={logo}
              alt={`${title} logo`}
              width={96}
              height={96}
              sizes="96px"
              className="size-full object-contain"
            />
          </div>
        ) : (
          <FallbackIcon className="text-primary size-8" />
        )}
      </div>

      <p className="max-w-[14rem] text-center text-sm font-medium tracking-tight">
        {title}
      </p>
    </div>
  );
};
