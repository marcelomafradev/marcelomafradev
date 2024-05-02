import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import FadeInMotion from './fade-in-motion';
import { ReactNode } from 'react';
import Link from './link';

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
  return (
    <FadeInMotion delay={delay}>
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-0 md:pb-4">
          <CardTitle className="text-lg lg:text-xl 2xl:text-2xl">
            {title}
          </CardTitle>

          <Button variant={'link'} className="group gap-1 p-0 text-xs" asChild>
            <Link href={href} type="external">
              {linkTitle}
              <ArrowUpRight
                size={15}
                className="transition-all group-hover:rotate-45"
              />
            </Link>
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
