import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Image } from '@/components/atoms/image';

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    width,
    height,
    ...rest
  }: {
    alt: string;
    src: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={typeof src === 'string' ? src : ''}
      width={width}
      height={height}
      {...rest}
    />
  ),
}));

describe('Image', () => {
  it('renders next/image with required props', () => {
    render(<Image src="/photo.jpg" alt="Portrait" width={120} height={80} />);

    const image = screen.getByAltText('Portrait');
    expect(image).toHaveAttribute('src', '/photo.jpg');
    expect(image).toHaveAttribute('width', '120');
    expect(image).toHaveAttribute('height', '80');
  });

  it('forwards extra props to the image element', () => {
    render(
      <Image
        src="/logo.svg"
        alt="Logo"
        width={24}
        height={24}
        className="object-contain"
        loading="lazy"
      />,
    );

    const image = screen.getByAltText('Logo');
    expect(image.className).toContain('object-contain');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
