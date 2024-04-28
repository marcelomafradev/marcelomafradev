import { ImageProps } from 'next/image';
import NextImage from 'next/image';

const Image = ({ src, alt, ...props }: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      {...props}
    />
  );
};

export default Image;
