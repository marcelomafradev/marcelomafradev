import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BOOKS } from '@/constants';
import { BookCover } from '@/components/molecules';
import { getTranslations } from 'next-intl/server';

export const FavoriteBooksCarousel = async () => {
  const t = await getTranslations('about.books');

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          {t('title')}
        </h2>
        <p className="text-muted-foreground text-sm font-light">
          {t('description')}
        </p>
      </div>

      <Carousel opts={{ align: 'start', dragFree: true }}>
        <CarouselContent className="-ml-3">
          {BOOKS.map((book) => (
            <CarouselItem
              key={book.id}
              className="basis-[46%] select-none pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <BookCover
                book={book}
                coverAlt={`${book.title} — ${t('cover-alt')}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-3 md:-left-5" />
        <CarouselNext className="-right-3 md:-right-5" />
      </Carousel>
    </div>
  );
};
