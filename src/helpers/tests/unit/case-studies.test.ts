import { describe, expect, it, vi } from 'vitest';
import { getCaseStudyHighlights } from '@/helpers/case-studies';

describe('getCaseStudyHighlights', () => {
  it('returns translated highlights for the requested count', () => {
    const translate = vi.fn((key: string) => `t:${key}`);

    const highlights = getCaseStudyHighlights(
      translate as unknown as Parameters<typeof getCaseStudyHighlights>[0],
      'payments',
      3,
    );

    expect(highlights).toEqual([
      't:items.payments.highlights.1',
      't:items.payments.highlights.2',
      't:items.payments.highlights.3',
    ]);
    expect(translate).toHaveBeenCalledTimes(3);
    expect(translate).toHaveBeenNthCalledWith(1, 'items.payments.highlights.1');
    expect(translate).toHaveBeenNthCalledWith(2, 'items.payments.highlights.2');
    expect(translate).toHaveBeenNthCalledWith(3, 'items.payments.highlights.3');
  });

  it('returns an empty array when highlightsCount is 0', () => {
    const translate = vi.fn((key: string) => key);

    expect(
      getCaseStudyHighlights(
        translate as unknown as Parameters<typeof getCaseStudyHighlights>[0],
        'edtech',
        0,
      ),
    ).toEqual([]);
    expect(translate).not.toHaveBeenCalled();
  });
});
