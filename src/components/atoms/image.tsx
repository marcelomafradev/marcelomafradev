import { ImageProps as NextImageProps } from 'next/image';
import NextImage from 'next/image';

type ImageProps = Omit<NextImageProps, 'width' | 'height' | 'alt' | 'src'> & {
  src: NextImageProps['src'];
  alt: string;
  width: number;
  height: number;
};

export const Image = ({ src, alt, width, height, ...props }: ImageProps) => {
  return (
    <NextImage src={src} alt={alt} width={width} height={height} {...props} />
  );
};
