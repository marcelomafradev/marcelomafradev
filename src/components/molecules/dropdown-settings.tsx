'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { Icon } from '../ui/icon';
import { Link } from '@/components/atoms';
import { useMessages } from 'next-intl';
import { useTheme } from 'next-themes';
import { THEME_ICONS, THEME_OPTIONS } from '@/constants';

export const DropdownSettings = () => {
  const messages = useMessages();
  const { language, theme: themeLabels } = messages.navigation.settings;
  const { theme = 'system', setTheme } = useTheme();

  const themeOptions = THEME_OPTIONS.map((value) => ({
    value,
    label: themeLabels[value],
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={themeLabels.title}
        className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring flex size-9 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors focus-visible:ring-2"
      >
        <Settings className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(String(value))}
        >
          <DropdownMenuLabel>{themeLabels.title}</DropdownMenuLabel>

          {themeOptions.map(({ value, label }) => {
            const ThemeIcon = THEME_ICONS[value];

            return (
              <DropdownMenuRadioItem key={value} value={value}>
                <ThemeIcon className="size-4" />
                {label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{language.title}</DropdownMenuLabel>

          <DropdownMenuItem render={<Link href="/" locale="en" />}>
            <Icon.flagUs className="rounded" />
            {language.english}
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/" locale="pt-br" />}>
            <Icon.flagBr className="rounded" />
            {language.portuguese}
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/" locale="es" />}>
            <Icon.flagEs className="rounded" />
            {language.spanish}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
