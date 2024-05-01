/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import {
  HrefValue,
  Link as NavigationLink,
  localesType,
} from '@/lib/navigation';
import NextLink from 'next/link';
import { LinkProps } from 'next/link';
import { ComponentProps } from 'react';

interface CustomLinkProps extends Omit<LinkProps, 'href'>, ComponentProps<'a'> {
  href: HrefValue | string;
  type?: 'internal' | 'external';
}

const Link = ({
  type = 'internal',
  href,
  children,
  ...props
}: CustomLinkProps) => {
  const { ref, locale, ...otherProps } = props;

  const sanitizedLocale = typeof locale === 'string' ? locale : 'en';

  return type === 'internal' ? (
    <NavigationLink
      href={href as HrefValue}
      locale={sanitizedLocale as localesType}
      {...otherProps}
    >
      {children}
    </NavigationLink>
  ) : (
    <NextLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...otherProps}
    >
      {children}
    </NextLink>
  );
};

export default Link;
