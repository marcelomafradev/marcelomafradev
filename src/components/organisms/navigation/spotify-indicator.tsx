'use client';

import { useCallback, useRef, useState } from 'react';
import { NowPlayingResult, SongModel } from '@/types';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProgressBar, Image } from '@/components/atoms';
import { SongDialog } from './song-dialog';
import { useMessages } from 'next-intl';
import { useNowPlaying } from '@/hooks';

function isAbortError(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === 'AbortError' || error.name === 'NotAllowedError')
  );
}

function isPlayingSong(data: NowPlayingResult | undefined): data is SongModel {
  return Boolean(data && 'id' in data && data.is_playing);
}

export const SpotifyIndicator = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [open, setOpen] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number | undefined>();

  const songData = useNowPlaying();

  const messages = useMessages();
  const { navigation } = messages as {
    navigation: { 'nothing-playing': string };
  };

  const stopPreview = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlayingAudio(false);
  }, []);

  const playPreview = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    stopPreview();
    audio.volume = 0.1;
    const playPromise = audio.play();
    playPromiseRef.current = playPromise;
    setIsPlayingAudio(true);

    void playPromise
      .catch((error) => {
        if (!isAbortError(error)) {
          setIsPlayingAudio(false);
        }
      })
      .finally(() => {
        if (playPromiseRef.current === playPromise) {
          playPromiseRef.current = null;
        }
      });
  }, [stopPreview]);

  const playing = isPlayingSong(songData);
  const albumCoverAlt = playing ? `Album cover of ${songData.title}` : '';
  const previewSource = playing ? songData.preview_url || undefined : undefined;

  return (
    <>
      {playing ? (
        <Button
          onClick={() => setOpen(true)}
          key={songData.title}
          onMouseEnter={playPreview}
          onMouseLeave={stopPreview}
          variant={'ghost'}
          className="relative h-auto w-full min-w-0 max-w-full items-center justify-start gap-2 overflow-hidden px-3 text-start hover:bg-transparent"
        >
          {songData.album_image_url ? (
            <Image
              src={songData.album_image_url}
              alt={albumCoverAlt}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-md object-cover"
            />
          ) : (
            <Skeleton className="size-10 shrink-0 rounded-md" />
          )}

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
            <p className="truncate text-xs font-semibold">{songData.title}</p>
            <p className="text-muted-foreground truncate text-xs">
              {songData.artist}
            </p>
          </div>

          <ProgressBar progress={audioDuration} isActive={isPlayingAudio} />

          <audio
            ref={audioRef}
            className="hidden"
            src={previewSource}
            onLoadedMetadata={(event) =>
              setAudioDuration(event.currentTarget.duration)
            }
            onDurationChange={(event) =>
              setAudioDuration(event.currentTarget.duration)
            }
            onEnded={() => setIsPlayingAudio(false)}
          />
        </Button>
      ) : (
        <div className="flex min-w-0 items-center justify-start gap-2 px-3 hover:bg-transparent">
          <Icon.spotify className="size-6 shrink-0" />
          <p className="truncate text-xs font-medium">
            {navigation['nothing-playing']}
          </p>
        </div>
      )}

      {playing && open && (
        <SongDialog
          open={open}
          setOpen={setOpen}
          playPreview={playPreview}
          stopPreview={stopPreview}
          songData={songData}
        />
      )}
    </>
  );
};
