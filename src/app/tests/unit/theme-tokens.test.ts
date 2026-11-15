import { describe, expect, it } from 'vitest';

import {
  contrastRatio,
  isIndigoHue,
  readAllThemeTokens,
  type Hsl,
  type ThemeName,
} from '@/tests/utils/theme-tokens';

const tokens = readAllThemeTokens();

const themes: ThemeName[] = ['light', 'dark'];

const hueCheckedTokens = [
  'background',
  'foreground',
  'card',
  'popover',
  'primary',
  'secondary',
  'muted',
  'accent',
  'border',
  'input',
  'ring',
  'sidebar',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
];

const contrastPairs: [string, string][] = [
  ['foreground', 'background'],
  ['card-foreground', 'card'],
  ['primary-foreground', 'primary'],
  ['secondary-foreground', 'secondary'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['accent-foreground', 'accent'],
  ['destructive-foreground', 'destructive'],
  ['sidebar-foreground', 'sidebar'],
  ['sidebar-accent-foreground', 'sidebar-accent'],
];

const token = (theme: ThemeName, name: string): Hsl => {
  const value = tokens[theme][name];

  if (!value) {
    throw new Error(`Missing token --${name} in ${theme} theme`);
  }

  return value;
};

describe('theme tokens', () => {
  it('parses both theme blocks with a non-empty token map', () => {
    expect(Object.keys(tokens.light).length).toBeGreaterThan(20);
    expect(Object.keys(tokens.dark).length).toBeGreaterThan(15);
  });

  it('uses the Ritmar olive as the light primary', () => {
    expect(token('light', 'primary')).toEqual({ h: 85, s: 15, l: 32 });
  });

  it('uses the Ritmar caramel as the dark primary', () => {
    expect(token('dark', 'primary')).toEqual({ h: 31, s: 53, l: 64 });
  });

  describe.each(themes)('%s theme', (theme) => {
    it.each(hueCheckedTokens)(
      'keeps --%s out of the indigo/purple hue range',
      (name) => {
        expect(isIndigoHue(token(theme, name))).toBe(false);
      },
    );

    it.each(contrastPairs)(
      'reaches WCAG AA contrast for %s on %s',
      (foreground, background) => {
        expect(
          contrastRatio(token(theme, foreground), token(theme, background)),
        ).toBeGreaterThanOrEqual(4.5);
      },
    );
  });
});
