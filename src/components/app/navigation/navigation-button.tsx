import { Button } from '@/components/ui/button';
import { SidebarItem } from '@/helpers/constants';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface NavigationButtonProps extends SidebarItem {
  onClick: () => void;
  pathname: string;
  hasArrowIcon: boolean;
}

const NavigationButton = ({
  icon: Icon,
  name,
  href,
  isInactive,
  pathname,
  hasArrowIcon,
  onClick,
}: NavigationButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      className={cn('group justify-between', pathname === href && 'bg-accent')}
      onClick={onClick}
      disabled={isInactive}
    >
      <div className="flex gap-2">
        <Icon
          className={cn(
            'transition-all group-hover:text-primary/80',
            pathname === href && 'text-primary/80',
          )}
          size={15}
        />
        <span className="text-xs">{name}</span>
      </div>

      {hasArrowIcon && (
        <ArrowUpRight
          size={15}
          className="transition-all group-hover:rotate-45 group-hover:text-primary/80"
        />
      )}
    </Button>
  );
};

export default NavigationButton;
