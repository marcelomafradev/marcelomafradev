import { describe, expect, it, vi } from 'vitest';
import { getExperienceDetails } from '@/helpers/experiences';

describe('getExperienceDetails', () => {
  it('returns only existing translated details for the position', () => {
    const translate = Object.assign(
      vi.fn((key: string) => `t:${key}`),
      {
        has: vi.fn((key: string) => !key.endsWith('.3')),
      },
    );

    const details = getExperienceDetails(
      translate as unknown as Parameters<typeof getExperienceDetails>[0],
      1,
      3,
    );

    expect(details).toEqual(['t:1.details.1', 't:1.details.2']);
    expect(translate.has).toHaveBeenCalledTimes(3);
    expect(translate).toHaveBeenCalledTimes(2);
    expect(translate).toHaveBeenNthCalledWith(1, '1.details.1');
    expect(translate).toHaveBeenNthCalledWith(2, '1.details.2');
  });

  it('returns an empty array when detailsCount is 0', () => {
    const translate = Object.assign(
      vi.fn((key: string) => key),
      {
        has: vi.fn(() => true),
      },
    );

    expect(
      getExperienceDetails(
        translate as unknown as Parameters<typeof getExperienceDetails>[0],
        2,
        0,
      ),
    ).toEqual([]);
    expect(translate.has).not.toHaveBeenCalled();
  });

  it('returns an empty array when no detail keys exist', () => {
    const translate = Object.assign(
      vi.fn((key: string) => key),
      {
        has: vi.fn(() => false),
      },
    );

    expect(
      getExperienceDetails(
        translate as unknown as Parameters<typeof getExperienceDetails>[0],
        3,
        4,
      ),
    ).toEqual([]);
    expect(translate).not.toHaveBeenCalled();
  });
});
