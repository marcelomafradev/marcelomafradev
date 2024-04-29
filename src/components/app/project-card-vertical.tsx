'use client';

import { ProjectProps } from '@/helpers/constants';
import { cn } from '@/lib/utils';
import Image from './image';
import { Button } from '../ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ImageBannerDialog from './image-banner-dialog';

const ProjectCardVertical = ({
  description,
  github,
  href,
  image,
  side,
  title,
}: ProjectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center gap-2',
          side === 'left' ? 'xl:flex-row' : 'xl:flex-row-reverse',
        )}
      >
        <Image
          src={image}
          alt={`${title} banner`}
          className={cn(
            'h-[220px] max-h-[220px] w-full flex-1 cursor-pointer rounded-xl border object-cover object-top p-1 transition-all duration-300 hover:skew-y-0 hover:scale-100 md:object-fill xl:max-w-[400px]',
            side === 'left' ? 'skew-y-2 scale-95' : '-skew-y-2 scale-95',
          )}
          onClick={() => setOpen(true)}
        />

        <div
          className={cn(
            'flex w-full flex-1 flex-col items-start space-y-3 pl-3 md:pl-0',
            side === 'left'
              ? 'xl:items-end xl:text-end'
              : 'text-start xl:items-start',
          )}
        >
          <h1 className="text-xl font-semibold text-secondary-foreground">
            {title}
          </h1>

          <p className="w-full text-sm font-light md:max-w-[80%]">
            {description}
          </p>

          <div className="space-x-3">
            <Button className="gap-2 bg-primary/90" size="sm" asChild>
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={18} /> Visitar
              </Link>
            </Button>

            <Button
              className="gap-2 bg-transparent text-secondary-foreground"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                Código-fonte
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <ImageBannerDialog
        open={open}
        setOpen={setOpen}
        title={title}
        image={image}
      />
    </>
  );
};

export default ProjectCardVertical;
