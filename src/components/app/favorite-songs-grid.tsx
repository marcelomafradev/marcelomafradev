import { GetFavoriteSongs } from '@/actions/spotify';
import { SongModel } from '@/helpers/types';

const FavoriteSongsGrid = async () => {
  const favoriteSongs = (await GetFavoriteSongs()) as SongModel[];
  if (!favoriteSongs || favoriteSongs?.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <h1>Minhas músicas favoritas no momento</h1>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {favoriteSongs?.map((song) => (
          <iframe
            key={song.id}
            loading="lazy"
            className="h-20 w-full"
            src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteSongsGrid;
