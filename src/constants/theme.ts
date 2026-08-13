import { IconType } from '@/components/ui/icon';
import { Monitor, Moon, Sun } from 'lucide-react';

export type ThemeOption = 'light' | 'dark' | 'system';

export const THEME_ICONS: Record<ThemeOption, IconType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export const THEME_OPTIONS: ThemeOption[] = ['light', 'dark', 'system'];
