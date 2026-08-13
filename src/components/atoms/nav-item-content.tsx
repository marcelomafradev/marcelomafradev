import { IconType } from '@/components/ui/icon';
import { ArrowUpRight } from 'lucide-react';

interface NavItemContentProps {
  icon: IconType;
  label: string;
  hasArrowIcon?: boolean;
}

export const NavItemContent = ({
  icon: Icon,
  label,
  hasArrowIcon,
}: NavItemContentProps) => {
  return (
    <>
      <span className="flex items-center gap-2.5">
        <Icon className="size-4 opacity-80" />
        <span className="text-sm">{label}</span>
      </span>

      {hasArrowIcon ? <ArrowUpRight className="size-3.5 opacity-60" /> : null}
    </>
  );
};
