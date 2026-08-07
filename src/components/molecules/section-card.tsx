import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';
import { Link } from '@/components/atoms';
import { cn, isExternalHref } from '@/lib/utils';
import { HrefValue } from '@/lib/navigation';

interface SectionCardProps {
  href?: string;
  linkTitle?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const SectionCard = ({
  children,
  href,
  linkTitle,
  title,
  description,
  className,
  contentClassName,
}: SectionCardProps) => {
  const external = Boolean(href && isExternalHref(href));

  return (
    <Card className={cn('border-border/60 bg-card', className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="min-w-0 space-y-1.5">
          <CardTitle className="text-lg tracking-tight md:text-xl">
            {title}
          </CardTitle>
          {description ? (
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          ) : null}
        </div>

        {href && linkTitle ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground group h-8 shrink-0 gap-1 px-2 text-xs"
            render={
              external ? (
                <Link href={href} type="external" />
              ) : (
                <Link href={href as HrefValue} />
              )
            }
          >
            {linkTitle}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:rotate-45"
            />
          </Button>
        ) : null}
      </CardHeader>

      <CardContent className={cn('pt-0', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
