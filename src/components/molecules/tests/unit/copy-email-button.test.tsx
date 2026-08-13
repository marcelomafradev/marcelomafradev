import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyEmailButton } from '@/components/molecules/copy-email-button';

const toastSuccess = vi.fn();
const writeText = vi.fn().mockResolvedValue(undefined);

vi.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
  },
}));

describe('CopyEmailButton', () => {
  beforeEach(() => {
    toastSuccess.mockClear();
    writeText.mockClear();
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('copies the email and shows a success toast on click', async () => {
    render(
      <CopyEmailButton
        email="hello@example.com"
        label="Copy email"
        copiedLabel="Email copied"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('hello@example.com');
    });
    expect(toastSuccess).toHaveBeenCalledWith('Email copied');
    // Copied state swaps the icon to Check.
    expect(document.querySelector('.lucide-check')).toBeInTheDocument();
  });

  it('keeps the button usable after copying', async () => {
    render(
      <CopyEmailButton
        email="hello@example.com"
        label="Copy email"
        copiedLabel="Email copied"
      />,
    );

    const button = screen.getByRole('button', { name: 'Copy email' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(2);
    });
  });

  it('resets the copied icon after the timeout', async () => {
    vi.useFakeTimers();
    try {
      render(
        <CopyEmailButton
          email="hello@example.com"
          label="Copy email"
          copiedLabel="Email copied"
        />,
      );

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));
      });

      expect(document.querySelector('.lucide-check')).toBeInTheDocument();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });

      expect(document.querySelector('.lucide-check')).not.toBeInTheDocument();
      expect(document.querySelector('.lucide-copy')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

});
