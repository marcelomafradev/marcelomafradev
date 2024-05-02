'use client';

import { useEffect, useRef, useState } from 'react';
import { SongModel } from '@/helpers/types';
import { GetPlayingNowSongs } from '@/actions/spotify';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ProgressBar from './progress-bar';
import SongDialog from './song-dialog';
import { Image } from '@/components/app';
import { useMessages } from 'next-intl';

const SpotifyIndicator = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioDuration = audioRef.current?.duration;

  const [songData, setSongData] = useState<SongModel | undefined>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [open, setOpen] = useState(false);

  const messages = useMessages();
  const { navigation } = messages as {
    navigation: { 'nothing-playing': string };
  };

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
          className="max-w-[14rem] items-center justify-start gap-2 text-start hover:bg-transparent"
        >
          <Image
            src={songData.album_image_url}
            alt={`Album cover of ${songData.title}`}
            className="h-10 w-10 rounded-md"
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
        <div className="flex items-center justify-start gap-2 pl-3 hover:bg-transparent">
          <Icon.spotify className="h-6 w-6" />
          <p className="text-xs font-medium">{navigation['nothing-playing']}</p>
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
