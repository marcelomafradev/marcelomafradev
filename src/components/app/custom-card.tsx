'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import FadeInMotion from './fade-in-motion';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface CustomCardProps {
  delay?: number;
  href: string;
  linkTitle: string;
  title: string;
  children: ReactNode;
}

const CustomCard = ({
  children,
  href,
  linkTitle,
  title,
  delay = 0.3,
}: CustomCardProps) => {
  const router = useRouter();

  return (
    <FadeInMotion delay={delay}>
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-0 md:pb-4">
          <CardTitle className="text-lg lg:text-xl 2xl:text-2xl">
            {title}
          </CardTitle>

          <Button
            variant={'link'}
            className="group gap-1 p-0 text-xs"
            onClick={() => router.push(href)}
          >
            {linkTitle}
            <ArrowUpRight
              size={15}
              className="transition-all group-hover:rotate-45"
            />
          </Button>
        </CardHeader>

        <CardContent className="text-pretty font-light text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </FadeInMotion>
  );
};

export default CustomCard;
