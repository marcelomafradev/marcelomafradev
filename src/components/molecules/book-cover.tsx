import { Book } from '@/constants';
import { Link } from '@/components/atoms';
import { BookCoverArt } from './book-cover-art';

export interface BookCoverProps {
  book: Book;
  coverAlt: string;
}

const BOOK_COVER_CLASS =
  'border-border/60 bg-card hover:border-foreground/25 block h-full overflow-hidden rounded-xl border transition-colors';

export const BookCover = ({ book, coverAlt }: BookCoverProps) => {
  if (!book.href) {
    return (
      <div className={BOOK_COVER_CLASS}>
        <BookCoverArt book={book} coverAlt={coverAlt} />
      </div>
    );
  }

  return (
    <Link href={book.href} type="external" className={BOOK_COVER_CLASS}>
      <BookCoverArt book={book} coverAlt={coverAlt} />
    </Link>
  );
};
