'use client';

import { ProjectProps } from '@/helpers/constants';
import Image from './image';
import { Button } from '../ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
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

const ProjectCardHorizontal = ({
  description,
  github,
  href,
  image,
  title,
}: ProjectProps) => {
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
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={18} /> Visitar
              </Link>
            </Button>

            <Button
              className="w-full gap-2 bg-transparent text-secondary-foreground"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                Código-fonte
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
