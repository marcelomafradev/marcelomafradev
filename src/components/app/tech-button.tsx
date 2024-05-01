import Link from './link';
import Image from './image';
import { cn } from '@/lib/utils';

const TechButton = ({
  icon,
  link,
  name,
  invert,
}: {
  link: string;
  name: string;
  icon: string;
  invert?: boolean;
}) => {
  return (
    <Link
      key={name}
      href={link}
      className="flex items-center gap-3 rounded-md bg-accent/50 p-3 text-accent-foreground transition-colors hover:bg-accent/70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:backdrop-blur-2xl"
    >
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg p-2">
        <Image
          src={icon}
          alt="icon"
          width={24}
          height={24}
          className={cn('z-10', invert && 'invert')}
          loading="lazy"
        />
        <Image
          src={icon}
          alt="icon"
          width={8}
          height={8}
          className="absolute inset-0 z-0 h-[125%] w-[125%] opacity-80 blur-lg"
        />
      </div>

      <p className="text-xs md:text-sm">{name}</p>
    </Link>
  );
};

export default TechButton;
