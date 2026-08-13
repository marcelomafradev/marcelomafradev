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
import { useMessages } from 'next-intl';
import { useTheme } from 'next-themes';
import { LANGUAGE_OPTIONS, THEME_ICONS, THEME_OPTIONS } from '@/constants';

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

          {LANGUAGE_OPTIONS.map(({ id, locale, icon: FlagIcon }) => (
            <DropdownMenuItem
              key={locale}
              render={<a href={`/${locale}`} hrefLang={locale} />}
            >
              <FlagIcon className="rounded" />
              {language[id]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
