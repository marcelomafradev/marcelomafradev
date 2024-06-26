import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BOOKS } from '@/helpers/constants';
import Image from './image';
import Link from './link';
import { useTranslations } from 'next-intl';

const FavoriteBooksCarousel = async () => {
  const t = useTranslations('about.books');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">{t('title')}</h2>
        <p className="pl-1 text-xs font-light text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {BOOKS?.map((book, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 select-none md:basis-1/4"
            >
              <Link href={book.href} type="external">
                <Image
                  src={book.image}
                  alt="Book"
                  className="h-[250px] w-full cursor-pointer rounded-lg border p-1"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
    </div>
  );
};

export default FavoriteBooksCarousel;
