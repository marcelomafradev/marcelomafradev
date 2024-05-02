'use client';

import { ProjectProps } from '@/helpers/constants';
import Image from './image';
import { Button } from '../ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from './link';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ImageBannerDialog from './image-banner-dialog';

interface ProjectCardHorizontalProps extends ProjectProps {
  ctaTranslation: string;
  sourceCodeTranslation: string;
}

const ProjectCardHorizontal = ({
  description,
  github,
  href,
  image,
  title,
  sourceCodeTranslation,
  ctaTranslation,
}: ProjectCardHorizontalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="flex h-full flex-col justify-between">
        <Image
          src={image}
          alt={`${title} banner`}
          className="h-[200px] w-full rounded-t"
          onClick={() => setOpen(true)}
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-pretty leading-relaxed tracking-wide">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CardFooter className="flex gap-3 pb-0">
            <Button className="w-full gap-2 bg-primary/90" size="sm" asChild>
              <Link href={href} type="external">
                <ArrowUpRight size={18} /> {ctaTranslation}
              </Link>
            </Button>

            <Button
              className="w-full gap-2 bg-transparent text-secondary-foreground"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={github} type="external">
                <Github size={18} />
                {sourceCodeTranslation}
              </Link>
            </Button>
          </CardFooter>
        </CardContent>
      </Card>

      <ImageBannerDialog
        open={open}
        setOpen={setOpen}
        title={title}
        image={image}
      />
    </>
  );
};

export default ProjectCardHorizontal;
