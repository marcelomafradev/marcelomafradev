import { describe, expect, it, vi } from 'vitest';
import {
  EDUCATION_DETAIL_COUNT,
  EDUCATION_FALLBACK_ICON,
  EDUCATION_ICONS,
} from '@/constants';
import { getEducationDetails, getEducationIcon } from '@/helpers/education';

describe('getEducationIcon', () => {
  it('returns the icon for a 1-based position', () => {
    expect(getEducationIcon(1)).toBe(EDUCATION_ICONS[0]);
    expect(getEducationIcon(2)).toBe(EDUCATION_ICONS[1]);
    expect(getEducationIcon(EDUCATION_ICONS.length)).toBe(
      EDUCATION_ICONS[EDUCATION_ICONS.length - 1],
    );
  });

  it('falls back when the position is out of range', () => {
    expect(getEducationIcon(0)).toBe(EDUCATION_FALLBACK_ICON);
    expect(getEducationIcon(EDUCATION_ICONS.length + 1)).toBe(
      EDUCATION_FALLBACK_ICON,
    );
  });
});

describe('getEducationDetails', () => {
  it('collects only existing translated details', () => {
    const translate = Object.assign(
      vi.fn((key: string) => `t:${key}`),
      {
        has: vi.fn((key: string) => key.endsWith('.1') || key.endsWith('.2')),
      },
    );

    const details = getEducationDetails(
      translate as unknown as Parameters<typeof getEducationDetails>[0],
      2,
    );

    expect(EDUCATION_DETAIL_COUNT).toBe(3);
    expect(details).toEqual(['t:items.2.details.1', 't:items.2.details.2']);
    expect(translate.has).toHaveBeenCalledTimes(3);
    expect(translate).toHaveBeenCalledTimes(2);
    expect(translate).toHaveBeenCalledWith('items.2.details.1');
    expect(translate).toHaveBeenCalledWith('items.2.details.2');
  });

  it('returns an empty array when no detail keys exist', () => {
    const translate = Object.assign(
      vi.fn((key: string) => key),
      {
        has: vi.fn(() => false),
      },
    );

    expect(
      getEducationDetails(
        translate as unknown as Parameters<typeof getEducationDetails>[0],
        1,
      ),
    ).toEqual([]);
    expect(translate).not.toHaveBeenCalled();
  });
});
