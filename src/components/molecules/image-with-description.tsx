import { ReactNode } from 'react';
import { Image, Link } from '@/components/atoms';
import { cn } from '@/lib/utils';

interface ImageWithDescriptionProps {
  src: string;
  href: string;
  alt?: string;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

export const ImageWithDescription = ({
  src,
  href,
  alt = '',
  children,
  className,
  priority = false,
}: ImageWithDescriptionProps) => {
  return (
    <figure
      className={cn(
        'border-border/60 bg-card hover:border-foreground/25 group flex h-full flex-col overflow-hidden rounded-xl border transition-colors',
        className,
      )}
    >
      <Link
        href={href}
        type="external"
        className="aspect-4/5 relative block overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={500}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <figcaption className="text-muted-foreground space-y-1 p-3 text-center text-xs leading-relaxed md:text-sm">
        {children}
      </figcaption>
    </figure>
  );
};
