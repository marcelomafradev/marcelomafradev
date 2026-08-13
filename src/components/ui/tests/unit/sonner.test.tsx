import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Toaster } from '@/components/ui/sonner';

const useThemeMock = vi.fn(() => ({ theme: 'dark' as string | undefined }));

vi.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

vi.mock('sonner', () => ({
  Toaster: ({ theme, className }: { theme?: string; className?: string }) => (
    <div
      data-testid="sonner-toaster"
      data-theme={theme}
      className={className}
    />
  ),
}));

describe('Toaster', () => {
  beforeEach(() => {
    useThemeMock.mockReturnValue({ theme: 'dark' });
  });

  it('renders the sonner toaster with the active theme', () => {
    render(<Toaster />);

    const toaster = screen.getByTestId('sonner-toaster');
    expect(toaster).toHaveAttribute('data-theme', 'dark');
    expect(toaster.className).toContain('toaster');
  });

  it('falls back to system theme when next-themes has no theme', () => {
    useThemeMock.mockReturnValue({ theme: undefined });

    render(<Toaster />);

    expect(screen.getByTestId('sonner-toaster')).toHaveAttribute(
      'data-theme',
      'system',
    );
  });
});
