import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SpotifyIndicator } from '@/components/organisms/navigation/spotify-indicator';
import { renderWithProviders } from '@/tests/utils/render';

const useNowPlayingMock = vi.fn();

vi.mock('@/hooks', () => ({
  useNowPlaying: () => useNowPlayingMock(),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const playingTrack = {
  is_playing: true,
  id: 'song-1',
  title: 'Night Drive',
  album: 'Nocturne',
  artist: 'DJ Test',
  album_image_url: 'https://example.com/cover.jpg',
  song_url: 'https://open.spotify.com/track/song-1',
  preview_url: 'https://example.com/preview.mp3',
  explicit: false,
  popularity: 70,
};

function mockAudioElement({
  playImpl,
}: {
  playImpl?: () => Promise<void>;
} = {}) {
  const pause = vi.fn();
  const play = playImpl ?? vi.fn().mockResolvedValue(undefined);

  Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: play,
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    writable: true,
    value: pause,
  });

  return { play, pause };
}

describe('SpotifyIndicator', () => {
  beforeEach(() => {
    useNowPlayingMock.mockReset();
  });

  it('shows nothing-playing text when idle', () => {
    useNowPlayingMock.mockReturnValue({ is_playing: false });

    renderWithProviders(<SpotifyIndicator />);

    expect(screen.getByText('Nada tocando agora')).toBeInTheDocument();
  });

  it('shows the currently playing track title and artist', () => {
    useNowPlayingMock.mockReturnValue(playingTrack);

    renderWithProviders(<SpotifyIndicator />);

    expect(screen.getByText('Night Drive')).toBeInTheDocument();
    expect(screen.getByText('DJ Test')).toBeInTheDocument();
    expect(
      screen.getByAltText('Album cover of Night Drive'),
    ).toBeInTheDocument();
  });

  it('falls back to a skeleton when the album cover is missing', () => {
    useNowPlayingMock.mockReturnValue({
      ...playingTrack,
      album_image_url: null,
    });

    const { container } = renderWithProviders(<SpotifyIndicator />);

    expect(
      screen.queryByAltText('Album cover of Night Drive'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('.size-10')).toBeInTheDocument();
  });

  it('plays the preview on hover and opens the song dialog on click', async () => {
    const user = userEvent.setup();
    const { play, pause } = mockAudioElement();
    useNowPlayingMock.mockReturnValue(playingTrack);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }),
    }) as typeof fetch;

    renderWithProviders(<SpotifyIndicator />);

    const trigger = screen.getByRole('button', { name: /Night Drive/i });
    fireEvent.mouseEnter(trigger);
    expect(play).toHaveBeenCalled();

    fireEvent.mouseLeave(trigger);
    expect(pause).toHaveBeenCalled();

    await user.click(trigger);

    expect(
      await screen.findByRole('heading', { name: 'Night Drive' }),
    ).toBeInTheDocument();
  });

  it('marks playback inactive when audio.play rejects with a non-abort error', async () => {
    mockAudioElement({
      playImpl: () => Promise.reject(new Error('autoplay blocked')),
    });
    useNowPlayingMock.mockReturnValue(playingTrack);

    renderWithProviders(<SpotifyIndicator />);

    const trigger = screen.getByRole('button', { name: /Night Drive/i });
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(trigger).toBeInTheDocument();
    });
  });

  it('ignores abort-style play rejections without clearing playback state', async () => {
    mockAudioElement({
      playImpl: () =>
        Promise.reject(
          new DOMException('The play() request was interrupted', 'AbortError'),
        ),
    });
    useNowPlayingMock.mockReturnValue(playingTrack);

    renderWithProviders(<SpotifyIndicator />);

    fireEvent.mouseEnter(screen.getByRole('button', { name: /Night Drive/i }));

    await waitFor(() => {
      expect(screen.getByText('Night Drive')).toBeInTheDocument();
    });
  });

  it('tracks audio duration metadata and ended events', () => {
    mockAudioElement();
    useNowPlayingMock.mockReturnValue(playingTrack);

    const { container } = renderWithProviders(<SpotifyIndicator />);
    const audio = container.querySelector('audio');
    expect(audio).not.toBeNull();

    Object.defineProperty(audio!, 'duration', {
      configurable: true,
      value: 30,
    });

    fireEvent.loadedMetadata(audio!);
    fireEvent.durationChange(audio!);
    fireEvent.ended(audio!);

    expect(audio).toHaveAttribute('src', playingTrack.preview_url);
  });
});
