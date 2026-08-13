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
import { SongModel } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image } from '@/components/atoms';
import { useMessages } from 'next-intl';

interface SongDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playPreview: () => void;
  stopPreview: () => void;
  songData: SongModel;
}

export const SongDialog = ({
  open,
  playPreview,
  setOpen,
  stopPreview,
  songData,
}: SongDialogProps) => {
  const [songVideoUrl, setSongVideoUrl] = useState('');
  const [fetchedFor, setFetchedFor] = useState('');

  const messages = useMessages();
  const t = (
    messages as {
      navigation: {
        'song-dialog': {
          cta: string;
          message: string;
          popularity: string;
        };
      };
    }
  ).navigation['song-dialog'];

  useEffect(() => {
    if (!open || !songData?.title) return;

    const queryKey = `${songData.title} ${songData.artist}`;
    if (fetchedFor === queryKey) return;

    const controller = new AbortController();

    void (async () => {
      try {
        const res = await fetch(
          `/api/youtube/search?q=${encodeURIComponent(queryKey)}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          setSongVideoUrl('');
          setFetchedFor(queryKey);
          return;
        }
        const data = (await res.json()) as { url: string | null };
        setSongVideoUrl(data.url ?? '');
        setFetchedFor(queryKey);
      } catch {
        if (!controller.signal.aborted) {
          setSongVideoUrl('');
        }
      }
    })();

    return () => controller.abort();
  }, [open, songData?.artist, songData?.title, fetchedFor]);

  const extractYoutubeVideoId = (url: string): string | null => {
    try {
      return new URL(url).searchParams.get('v');
    } catch {
      return null;
    }
  };

  const popularity = songData?.popularity ?? 0;
  const popularityColor =
    popularity <= 20
      ? 'text-red-500'
      : popularity <= 50
        ? 'text-orange-500'
        : popularity <= 80
          ? 'text-yellow-500'
          : 'text-green-500';

  const videoId = songVideoUrl ? extractYoutubeVideoId(songVideoUrl) : null;

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
      <DialogContent
        onMouseEnter={videoId ? undefined : playPreview}
        onMouseLeave={stopPreview}
        className="select-none"
      >
        <DialogHeader>
          <DialogTitle>{songData?.title}</DialogTitle>
          <DialogDescription>{songData?.artist}</DialogDescription>
        </DialogHeader>

        {videoId ? (
          <iframe
            className="h-[300px] w-full shrink-0 rounded-[0.3rem] object-cover"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={songData?.title}
          />
        ) : (
          <a
            href={songData?.song_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {songData?.album_image_url ? (
              <Image
                src={songData.album_image_url}
                alt={`Album cover of ${songData?.title}`}
                width={300}
                height={300}
                className="h-[300px] w-full shrink-0 cursor-pointer rounded-[0.3rem] object-cover"
              />
            ) : (
              <div className="bg-muted h-[300px] w-full shrink-0 rounded-[0.3rem]" />
            )}
          </a>
        )}

        <Separator />

        <DialogFooter className="flex w-full flex-row !justify-between">
          <Button
            variant={'link'}
            className="w-fit"
            render={
              <a
                href={songData?.song_url}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
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
                <p>{t.popularity}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogFooter>

        <div className="flex items-center justify-center gap-2">
          <p className="text-muted-foreground text-center text-xs">
            {t.message}
          </p>

          <AudioLines
            size={15}
            className="text-muted-foreground animate-pulse"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
