import { GetFavoriteSongs } from '@/actions/spotify';
import { SongModel } from '@/helpers/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const FavoriteSongsCarousel = async () => {
  const favoriteSongs = (await GetFavoriteSongs()) as SongModel[];
  if (!favoriteSongs || favoriteSongs?.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Músicas favoritas do momento</h2>
        <p className="pl-1 text-xs font-light text-muted-foreground">
          - Confira algumas músicas que eu gosto.
        </p>
      </div>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {favoriteSongs?.map((song) => (
            <CarouselItem key={song.id} className="max-w-[85%] md:basis-1/2">
              <iframe
                loading="lazy"
                className="h-20 w-full select-none"
                src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
    </div>
  );
};

export default FavoriteSongsCarousel;
