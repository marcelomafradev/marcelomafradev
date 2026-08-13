import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TechButton } from '@/components/atoms/tech-button';

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    className,
    ...rest
  }: {
    alt: string;
    src: string;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={typeof src === 'string' ? src : ''}
      className={className}
      {...rest}
    />
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

describe('TechButton', () => {
  it('renders an external link with the technology name', () => {
    render(
      <TechButton
        name="TypeScript"
        link="https://www.typescriptlang.org"
        icon="/icons/ts.svg"
      />,
    );

    const link = screen.getByRole('link', { name: /TypeScript/i });
    expect(link).toHaveAttribute('href', 'https://www.typescriptlang.org');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders icon images and applies invert class when requested', () => {
    const { container } = render(
      <TechButton
        name="Next.js"
        link="https://nextjs.org"
        icon="/icons/next.svg"
        invert
      />,
    );

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]?.className).toContain('invert');
  });
});
