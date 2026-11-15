import { readFileSync } from 'node:fs';
import path from 'node:path';

export type ThemeName = 'light' | 'dark';

export type Hsl = { h: number; s: number; l: number };

export type Rgb = { r: number; g: number; b: number };

const GLOBALS_PATH = path.resolve(
  import.meta.dirname,
  '../../app/[locale]/globals.css',
);

const SELECTORS: Record<ThemeName, string> = {
  light: ':root',
  dark: '.dark',
};

const TOKEN_PATTERN =
  /--([a-z0-9-]+):\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*;/g;

const readGlobalsCss = (): string => readFileSync(GLOBALS_PATH, 'utf8');

export const extractBlock = (source: string, selector: string): string => {
  const lines = source.split('\n');
  const collected: string[] = [];
  let depth = 0;
  let active = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!active) {
      if (
        trimmed.startsWith(`${selector} {`) ||
        trimmed.startsWith(`${selector}{`)
      ) {
        active = true;
        depth = 1;
      }
      continue;
    }

    const opens = (line.match(/\{/g) ?? []).length;
    const closes = (line.match(/\}/g) ?? []).length;
    depth += opens - closes;

    if (depth <= 0) {
      break;
    }

    collected.push(line);
  }

  if (collected.length === 0) {
    throw new Error(`Theme block "${selector}" not found in globals.css`);
  }

  return collected.join('\n');
};

export const parseTokens = (block: string): Record<string, Hsl> => {
  const tokens: Record<string, Hsl> = {};
  TOKEN_PATTERN.lastIndex = 0;

  for (const match of block.matchAll(TOKEN_PATTERN)) {
    const [, name, h, s, l] = match;
    tokens[name] = { h: Number(h), s: Number(s), l: Number(l) };
  }

  return tokens;
};

export const readThemeTokens = (
  theme: ThemeName,
  source: string = readGlobalsCss(),
): Record<string, Hsl> => parseTokens(extractBlock(source, SELECTORS[theme]));

export const readAllThemeTokens = (
  source: string = readGlobalsCss(),
): Record<ThemeName, Record<string, Hsl>> => ({
  light: readThemeTokens('light', source),
  dark: readThemeTokens('dark', source),
});

export const hslToRgb = ({ h, s, l }: Hsl): Rgb => {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const sector = h / 60;
  const second = chroma * (1 - Math.abs((sector % 2) - 1));
  const offset = lightness - chroma / 2;

  let rgb: [number, number, number];

  if (sector < 1) {
    rgb = [chroma, second, 0];
  } else if (sector < 2) {
    rgb = [second, chroma, 0];
  } else if (sector < 3) {
    rgb = [0, chroma, second];
  } else if (sector < 4) {
    rgb = [0, second, chroma];
  } else if (sector < 5) {
    rgb = [second, 0, chroma];
  } else {
    rgb = [chroma, 0, second];
  }

  const [r, g, b] = rgb.map((value) => Math.round((value + offset) * 255));
  return { r, g, b };
};

export const rgbToHsl = ({ r, g, b }: Rgb): Hsl => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));

  let hue: number;

  if (max === red) {
    hue = 60 * (((green - blue) / delta) % 6);
  } else if (max === green) {
    hue = 60 * ((blue - red) / delta + 2);
  } else {
    hue = 60 * ((red - green) / delta + 4);
  }

  return {
    h: Math.round((hue + 360) % 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
};

export const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
};

export const relativeLuminance = ({ r, g, b }: Rgb): number => {
  const channel = (value: number): number => {
    const scaled = value / 255;
    return scaled <= 0.03928
      ? scaled / 12.92
      : ((scaled + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const contrastRatio = (foreground: Hsl, background: Hsl): number => {
  const foregroundLuminance = relativeLuminance(hslToRgb(foreground));
  const backgroundLuminance = relativeLuminance(hslToRgb(background));
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
};

export const isIndigoHue = ({ h, s }: Hsl): boolean =>
  h >= 200 && h <= 300 && s >= 10;
