import { screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SongDialog } from '@/components/organisms/navigation/song-dialog';
import { renderWithProviders } from '@/tests/utils/render';
import type { SongModel } from '@/types';

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
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
  usePathname: () => '/',
}));

const songData: SongModel = {
  id: 'song-1',
  title: 'Night Drive',
  album: 'Nocturne',
  artist: 'DJ Test',
  album_image_url: 'https://example.com/cover.jpg',
  song_url: 'https://open.spotify.com/track/song-1',
  preview_url: 'https://example.com/preview.mp3',
  explicit: false,
  popularity: 72,
  is_playing: true,
};

describe('SongDialog', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }),
    }) as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('renders song metadata and dialog copy from translations', async () => {
    const setOpen = vi.fn();

    renderWithProviders(
      <SongDialog
        open
        setOpen={setOpen}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={songData}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Night Drive' }),
    ).toBeInTheDocument();
    expect(screen.getByText('DJ Test')).toBeInTheDocument();
    expect(screen.getByText('Ver no spotify')).toBeInTheDocument();
    expect(
      screen.getByText('Marcelo Mafra está escutando essa música agora.'),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTitle('Night Drive')).toBeInTheDocument();
    });
  });

  it('falls back to the album cover when youtube search fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }) as typeof fetch;

    renderWithProviders(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={songData}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByAltText('Album cover of Night Drive'),
      ).toBeInTheDocument();
    });
    expect(screen.queryByTitle('Night Drive')).not.toBeInTheDocument();
  });

  it('renders a muted placeholder when album art and youtube are unavailable', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: null }),
    }) as typeof fetch;

    renderWithProviders(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={{ ...songData, album_image_url: null, popularity: 10 }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('10')).toHaveClass('text-red-500');
    });
    expect(document.querySelector('div.bg-muted')).not.toBeNull();
  });

  it('uses green popularity color for high scores and ignores aborted fetches', async () => {
    globalThis.fetch = vi
      .fn()
      .mockRejectedValue(
        new DOMException('aborted', 'AbortError'),
      ) as typeof fetch;

    renderWithProviders(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={{ ...songData, popularity: 95 }}
      />,
    );

    expect(screen.getByText('95')).toHaveClass('text-green-500');

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled();
    });
  });

  it('colors mid-range popularity scores orange or yellow', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }) as typeof fetch;

    const { rerender } = renderWithProviders(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={{ ...songData, popularity: 40 }}
      />,
    );

    expect(screen.getByText('40')).toHaveClass('text-orange-500');

    rerender(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={{ ...songData, popularity: 70 }}
      />,
    );

    expect(screen.getByText('70')).toHaveClass('text-yellow-500');
  });

  it('treats invalid youtube urls as missing video embeds', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'not-a-url' }),
    }) as typeof fetch;

    renderWithProviders(
      <SongDialog
        open
        setOpen={vi.fn()}
        playPreview={vi.fn()}
        stopPreview={vi.fn()}
        songData={songData}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByAltText('Album cover of Night Drive'),
      ).toBeInTheDocument();
    });
    expect(screen.queryByTitle('Night Drive')).not.toBeInTheDocument();
  });
});
