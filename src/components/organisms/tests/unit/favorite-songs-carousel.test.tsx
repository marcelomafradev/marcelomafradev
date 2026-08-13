import { render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';

const { getTranslationsMock, fetchTopTracksMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
  fetchTopTracksMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}));

vi.mock('@/lib/spotify-server', () => ({
  fetchTopTracks: fetchTopTracksMock,
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class MockResizeObserver implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds: readonly number[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return 300;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 200;
    },
  });
});

describe('FavoriteSongsCarousel', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    fetchTopTracksMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'about.musics',
      });
    });
  });

  it('returns null when there are no favorite songs', async () => {
    fetchTopTracksMock.mockResolvedValue([]);
    const { FavoriteSongsCarousel } =
      await import('@/components/organisms/favorite-songs-carousel');

    const ui = await FavoriteSongsCarousel();
    const { container } = render(<>{ui}</>);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the music heading and track embeds', async () => {
    fetchTopTracksMock.mockResolvedValue([
      {
        id: 'track-1',
        title: 'Song One',
        album: 'Album',
        artist: 'Artist',
        album_image_url: null,
        song_url: 'https://open.spotify.com/track/track-1',
        preview_url: '',
        explicit: false,
        popularity: 50,
      },
    ]);

    const { FavoriteSongsCarousel } =
      await import('@/components/organisms/favorite-songs-carousel');

    const ui = await FavoriteSongsCarousel();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Músicas favoritas do momento' }),
    ).toBeInTheDocument();
    expect(screen.getByTitle('Song One')).toBeInTheDocument();
  });
});
