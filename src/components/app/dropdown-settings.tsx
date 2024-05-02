import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { Icon } from '../ui/icon';
import Link from './link';
import { useMessages } from 'next-intl';

const DropdownSettings = () => {
  const messages = useMessages();
  // @ts-expect-error because 'personal-info' is a dynamic key in the messages object
  const { language } = messages.navigation.settings;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-all hover:animate-spin-slow hover:text-primary/80">
        <Settings size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mb-2 mr-6 lg:mb-0 lg:mr-0">
        <DropdownMenuLabel>{language.title}</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link href="/" locale="en">
            <Icon.flagUs className="rounded" /> {language.english}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/" locale="pt-br">
            <Icon.flagBr className="rounded" />
            {language.portuguese}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/" locale="es">
            <Icon.flagEs className="rounded" />
            {language.spanish}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSettings;
