import { HrefValue, Link as NavigationLink, Locale } from '@/lib/navigation';
import NextLink from 'next/link';
import { LinkProps } from 'next/link';
import { ComponentProps } from 'react';

type SharedProps = {
  children?: React.ReactNode;
  className?: string;
  prefetch?: boolean;
};

type InternalLinkProps = SharedProps &
  Omit<
    ComponentProps<typeof NavigationLink>,
    'href' | 'locale' | 'children'
  > & {
    type?: 'internal';
    href: HrefValue;
    locale?: Locale;
  };

type ExternalLinkProps = SharedProps &
  Omit<LinkProps, 'href' | 'prefetch' | 'children'> &
  Omit<ComponentProps<'a'>, 'href' | 'children' | 'type'> & {
    type: 'external';
    href: string;
    locale?: never;
  };

export type CustomLinkProps = InternalLinkProps | ExternalLinkProps;

export const Link = (props: CustomLinkProps) => {
  if (props.type === 'external') {
    const { type, href, children, locale, ...rest } = props;
    void type;
    void locale;

    return (
      <NextLink href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </NextLink>
    );
  }

  const { type, href, children, locale, ...rest } = props;
  void type;

  return (
    <NavigationLink href={href} {...(locale ? { locale } : {})} {...rest}>
      {children}
    </NavigationLink>
  );
};
