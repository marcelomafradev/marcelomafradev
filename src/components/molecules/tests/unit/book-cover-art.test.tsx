import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Book } from '@/constants';
import { BookCoverArt } from '@/components/molecules/book-cover-art';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={typeof src === 'string' ? src : ''} />
  ),
}));

// BookCoverArt imports Image from the atoms barrel, which loads Link → navigation.
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

const bookWithImage: Book = {
  id: 'clean-code',
  title: 'Código Limpo',
  author: 'Robert C. Martin',
  image: '/books/clean-code.jpg',
};

const bookWithoutImage: Book = {
  id: 'plain-book',
  title: 'Plain Title',
  author: 'Jane Doe',
};

describe('BookCoverArt', () => {
  it('renders the cover image when the book has an image', () => {
    render(<BookCoverArt book={bookWithImage} coverAlt="Código Limpo cover" />);

    const image = screen.getByAltText('Código Limpo cover');
    expect(image).toHaveAttribute('src', '/books/clean-code.jpg');
  });

  it('falls back to title and author when there is no image', () => {
    render(
      <BookCoverArt book={bookWithoutImage} coverAlt="Plain Title cover" />,
    );

    expect(screen.getByText('Plain Title')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
