'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SongModel } from '@/models';
import { GetPlayingNowSongs } from '@/actions/spotify';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ProgressBar from './progress-bar';
import SongDialog from './song-dialog';

const SpotifyIndicator = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioDuration = audioRef.current?.duration;

  const [songData, setSongData] = useState<SongModel | undefined>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getSongData() {
      const nowPlayingSong = (await GetPlayingNowSongs()) as SongModel;
      setSongData(nowPlayingSong);
    }

    getSongData();

    const intervalId = setInterval(() => {
      getSongData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  function playPreview() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.1;
    audio.play();
    setIsPlayingAudio(true);
  }

  function stopPreview() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlayingAudio(false);
  }

  return (
    <>
      {songData && songData?.is_playing ? (
        <Button
          onClick={() => setOpen(true)}
          key={songData?.title || 'nothing-playing'}
          onMouseEnter={playPreview}
          onMouseLeave={stopPreview}
          variant={'ghost'}
          className="max-w-[120px] items-center justify-start gap-2 p-0 text-start hover:bg-transparent"
        >
          <Image
            src={songData.album_image_url}
            alt={`Album cover of ${songData.title}`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-10 w-10"
          />

          <div className="flex w-full flex-col justify-center gap-0.5">
            <p className="truncate text-xs font-semibold">{songData.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {songData.artist}
            </p>
          </div>

          <ProgressBar progress={audioDuration} isActive={isPlayingAudio} />

          <audio
            ref={audioRef}
            className="hidden"
            src={songData?.preview_url}
          />
        </Button>
      ) : (
        <div className="flex h-14 items-center justify-start gap-2 pl-2 hover:bg-transparent">
          <Icon.spotify className="h-6 w-6" />
          <p className="text-xs font-medium">Nada tocando agora</p>
        </div>
      )}

      {songData && open && (
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

export default SpotifyIndicator;

export const dynamic = 5;
