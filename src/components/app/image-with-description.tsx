import React, { ReactNode } from 'react';
import Image from './image';
import Link from './link';

interface ImageWithDescriptionProps {
  src: string;
  href: string;
  children: ReactNode;
}

const ImageWithDescription = ({
  src,
  href,
  children,
}: ImageWithDescriptionProps) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <Link href={href} type="external">
        <Image
          src={src}
          alt="Testimonial image"
          className="h-[300px] w-full min-w-[150px] cursor-pointer rounded-lg border object-cover object-top p-1"
        />
      </Link>
      <p className="text-center text-xs text-muted-foreground">{children}</p>
    </div>
  );
};

export default ImageWithDescription;
