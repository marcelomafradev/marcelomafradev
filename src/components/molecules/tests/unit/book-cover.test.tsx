import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Book } from '@/constants';
import { BookCover } from '@/components/molecules/book-cover';

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

const linkedBook: Book = {
  id: 'clean-code',
  title: 'Código Limpo',
  author: 'Robert C. Martin',
  href: 'https://www.amazon.com.br/dp/8576082675',
  image: '/books/clean-code.jpg',
};

const unlinkedBook: Book = {
  id: 'no-link',
  title: 'Unlinked Book',
  author: 'Author',
  image: '/books/unlinked.jpg',
};

describe('BookCover', () => {
  it('wraps the cover art in an external link when href is present', () => {
    render(<BookCover book={linkedBook} coverAlt="Código Limpo cover" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'https://www.amazon.com.br/dp/8576082675',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByAltText('Código Limpo cover')).toBeInTheDocument();
  });

  it('renders a non-link container when href is missing', () => {
    render(<BookCover book={unlinkedBook} coverAlt="Unlinked Book cover" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByAltText('Unlinked Book cover')).toBeInTheDocument();
  });
});
