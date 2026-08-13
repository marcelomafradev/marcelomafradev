import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input bg-background flex h-11 w-full rounded-lg border px-3 py-2 text-base transition-colors',
        'placeholder:text-muted-foreground/70',
        'focus-visible:border-primary/50 focus-visible:ring-ring/40 focus-visible:outline-none focus-visible:ring-2',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/30',
        'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
