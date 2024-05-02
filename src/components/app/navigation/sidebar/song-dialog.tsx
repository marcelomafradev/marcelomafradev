'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SongModel } from '@/helpers/types';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SearchSongVideo } from '@/actions/youtube';
import { Image } from '@/components/app';
import { useMessages } from 'next-intl';

interface SongDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playPreview: () => void;
  stopPreview: () => void;
  songData: SongModel;
}

const SongDialog = ({
  open,
  playPreview,
  setOpen,
  stopPreview,
  songData,
}: SongDialogProps) => {
  const [songVideoUrl, setSongVideoUrl] = useState('');
  const [lastFetchedSongTitle, setLastFetchedSongTitle] = useState('');
  const [isSongDataFetched, setIsSongDataFetched] = useState(false);
  const router = useRouter();

  const messages = useMessages();
  // @ts-expect-error because 'personal-info' is a dynamic key in the messages object
  const t = messages.navigation['song-dialog'];

  const fetchAndUpdateSongVideo = async (title: string) => {
    const songVideoUrl = await SearchSongVideo(title);
    setSongVideoUrl(songVideoUrl || '');
  };

  const extractYoutubeVideoId = (url: string): string => {
    const videoId = new URL(url).searchParams.get('v');
    return videoId as string;
  };

  useEffect(() => {
    const fetchSongVideo = async () => {
      if (songData && songData.title && !isSongDataFetched) {
        await fetchAndUpdateSongVideo(`${songData.title} ${songData.artist}`);
        setIsSongDataFetched(true);
        return setLastFetchedSongTitle(songData.title);
      } else if (
        lastFetchedSongTitle !== songData?.title &&
        isSongDataFetched
      ) {
        await fetchAndUpdateSongVideo(`${songData.title} ${songData.artist}`);
        return setLastFetchedSongTitle(songData.title);
      }
    };

    fetchSongVideo();
  }, [isSongDataFetched, lastFetchedSongTitle, songData]);

  const popularityColor =
    (songData?.popularity ?? 0) <= 20
      ? 'text-red-500'
      : (songData?.popularity ?? 0) <= 50
        ? 'text-orange-500'
        : (songData?.popularity ?? 0) <= 80
          ? 'text-yellow-500'
          : 'text-green-500';

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
      <DialogContent
        onMouseEnter={songVideoUrl ? () => {} : playPreview}
        onMouseLeave={stopPreview}
        className="select-none"
      >
        <DialogHeader>
          <DialogTitle>{songData?.title}</DialogTitle>
          <DialogDescription>{songData?.artist}</DialogDescription>
        </DialogHeader>

        {songVideoUrl ? (
          <iframe
            className="h-[300px] w-full rounded-[0.3rem] object-cover"
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(songVideoUrl)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <Image
            src={songData?.album_image_url}
            onClick={() => router.push(songData?.song_url)}
            alt={`Album cover of ${songData?.title}`}
            className="h-[300px] w-full cursor-pointer rounded-[0.3rem] object-cover"
          />
        )}

        <Separator />

        <DialogFooter className="flex w-full flex-row !justify-between">
          <Button
            variant={'link'}
            onClick={() => router.push(songData?.song_url)}
            className="w-fit"
          >
            {t.cta}
          </Button>

          <TooltipProvider>
            <Tooltip defaultOpen={false}>
              <TooltipTrigger
                className={`font-semibold ${popularityColor} select-none`}
              >
                {songData?.popularity}
              </TooltipTrigger>

              <TooltipContent>
                <p> {t.popularity}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogFooter>

        <div className="flex items-center justify-center gap-2">
          <p className="text-center text-xs text-muted-foreground">
            {t.message}
          </p>

          <AudioLines
            size={15}
            className="animate-pulse text-muted-foreground"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SongDialog;
