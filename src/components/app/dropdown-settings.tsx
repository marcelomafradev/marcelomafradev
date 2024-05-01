import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { Icon } from '../ui/icon';
import Link from './link';

const DropdownSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-all hover:animate-spin-slow hover:text-primary/80">
        <Settings size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mb-2 mr-6 lg:mb-0 lg:mr-0">
        <DropdownMenuLabel>Tema</DropdownMenuLabel>

        <DropdownMenuItem>Claro</DropdownMenuItem>
        <DropdownMenuItem>Escuro</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>

        <DropdownMenuItem>Dracula</DropdownMenuItem>
        <DropdownMenuItem>Zinc</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Idioma</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link href="/" locale="en">
            <Icon.flagUs className="rounded" /> English
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/" locale="pt-br">
            <Icon.flagBr className="rounded" />
            Portuguese
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/" locale="es">
            <Icon.flagEs className="rounded" />
            Espanol
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSettings;
