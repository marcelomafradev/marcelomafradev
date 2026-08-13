import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ImageWithDescription } from '@/components/molecules/image-with-description';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={typeof src === 'string' ? src : ''} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('ImageWithDescription', () => {
  it('renders the linked image and caption children', () => {
    render(
      <ImageWithDescription
        src="/photos/me.jpg"
        href="https://example.com/photo"
        alt="Conference talk"
      >
        Speaking at JSConf
      </ImageWithDescription>,
    );

    const image = screen.getByAltText('Conference talk');
    expect(image).toHaveAttribute('src', '/photos/me.jpg');

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/photo');
    expect(link).toHaveAttribute('target', '_blank');

    expect(screen.getByText('Speaking at JSConf')).toBeInTheDocument();
  });

  it('defaults alt text to an empty string', () => {
    const { container } = render(
      <ImageWithDescription src="/photos/me.jpg" href="https://example.com">
        Caption
      </ImageWithDescription>,
    );

    // Empty alt makes the image presentational (no role="img").
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});
