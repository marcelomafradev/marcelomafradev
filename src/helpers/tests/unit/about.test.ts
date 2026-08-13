import { describe, expect, it, vi } from 'vitest';
import { ABOUT_HIGHLIGHT_ICONS } from '@/constants';
import { getAboutHighlights } from '@/helpers/about';

describe('getAboutHighlights', () => {
  it('maps highlight keys to translated labels and icons', () => {
    const translate = vi.fn((key: string) => `t:${key}`);

    const highlights = getAboutHighlights(
      translate as unknown as Parameters<typeof getAboutHighlights>[0],
    );

    expect(highlights).toHaveLength(4);
    expect(highlights).toEqual([
      {
        key: 'location',
        label: 't:highlights.location',
        icon: ABOUT_HIGHLIGHT_ICONS.location,
      },
      {
        key: 'train',
        label: 't:highlights.train',
        icon: ABOUT_HIGHLIGHT_ICONS.train,
      },
      {
        key: 'music',
        label: 't:highlights.music',
        icon: ABOUT_HIGHLIGHT_ICONS.music,
      },
      {
        key: 'books',
        label: 't:highlights.books',
        icon: ABOUT_HIGHLIGHT_ICONS.books,
      },
    ]);

    expect(translate).toHaveBeenCalledTimes(4);
    expect(translate).toHaveBeenCalledWith('highlights.location');
    expect(translate).toHaveBeenCalledWith('highlights.train');
    expect(translate).toHaveBeenCalledWith('highlights.music');
    expect(translate).toHaveBeenCalledWith('highlights.books');
  });
});
