import { Book } from '@/constants';
import { Image } from '@/components/atoms';

export interface BookCoverArtProps {
  book: Book;
  coverAlt: string;
}

export const BookCoverArt = ({ book, coverAlt }: BookCoverArtProps) => {
  if (book.image) {
    return (
      <Image
        src={book.image}
        alt={coverAlt}
        width={400}
        height={600}
        className="aspect-[2/3] h-auto w-full object-cover"
      />
    );
  }

  return (
    <div className="bg-muted/40 flex aspect-[2/3] flex-col justify-between gap-3 p-4">
      <p className="text-pretty text-sm font-medium leading-snug tracking-[-0.01em]">
        {book.title}
      </p>
      <p className="text-muted-foreground font-mono text-[11px] leading-snug">
        {book.author}
      </p>
    </div>
  );
};
