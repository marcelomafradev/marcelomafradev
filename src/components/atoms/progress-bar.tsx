import { cn } from '@/lib/utils';

interface ProgressBarProps {
  isActive: boolean;
  progress: number | undefined;
}

export const ProgressBar = ({ isActive, progress }: ProgressBarProps) => {
  return (
    <div
      role="progressbar"
      className={cn(
        'bg-primary absolute bottom-0 left-0 z-50 mx-auto h-1 w-0 overflow-hidden transition-all ease-linear',
        isActive ? 'w-full' : 'w-0',
      )}
      style={{
        transitionDuration: isActive ? `${progress}s` : '0s',
      }}
    />
  );
};
