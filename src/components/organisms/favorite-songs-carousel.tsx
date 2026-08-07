import { fetchTopTracks } from '@/lib/spotify-server';
import { SongModel } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getTranslations } from 'next-intl/server';

export const FavoriteSongsCarousel = async () => {
  const t = await getTranslations('about.musics');
  const favoriteSongs = await fetchTopTracks();
  if (!Array.isArray(favoriteSongs) || favoriteSongs.length === 0) return null;

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

      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="-ml-3">
          {favoriteSongs.map((song: SongModel) => (
            <CarouselItem
              key={song.id}
              className="max-w-full basis-full pl-3 sm:basis-1/2"
            >
              <div className="border-border/60 bg-card/40 overflow-hidden rounded-xl border p-1 shadow-sm">
                <iframe
                  loading="lazy"
                  className="h-20 w-full select-none rounded-lg"
                  src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  title={song.title}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-3 md:-left-5" />
        <CarouselNext className="-right-3 md:-right-5" />
      </Carousel>
    </div>
  );
};
