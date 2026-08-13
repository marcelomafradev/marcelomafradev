import type { RefObject } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ScrollToTop } from '@/components/molecules/scroll-to-top';

function createScrollableRef(scrollTop = 0) {
  const node = document.createElement('div');
  Object.defineProperty(node, 'scrollTop', {
    configurable: true,
    writable: true,
    value: scrollTop,
  });
  node.scrollTo = vi.fn();

  const ref = { current: node } as RefObject<HTMLDivElement | null>;
  return { ref, node };
}

describe('ScrollToTop', () => {
  it('stays hidden until the scroll container passes the threshold', () => {
    const { ref, node } = createScrollableRef(0);

    render(<ScrollToTop scrollableDivRef={ref} />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('opacity-0');

    act(() => {
      node.scrollTop = 350;
      fireEvent.scroll(node);
    });

    expect(button.className).toContain('opacity-100');
  });

  it('scrolls the container to the top when clicked', async () => {
    const user = userEvent.setup();
    const { ref, node } = createScrollableRef(400);

    render(<ScrollToTop scrollableDivRef={ref} />);

    act(() => {
      fireEvent.scroll(node);
    });

    await user.click(screen.getByRole('button'));

    expect(node.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('handles a null scroll container ref without throwing', async () => {
    const user = userEvent.setup();
    const ref = { current: null } as RefObject<HTMLDivElement | null>;

    render(<ScrollToTop scrollableDivRef={ref} />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('opacity-0');

    await user.click(button);
    // no scrollTo available — should not throw
    expect(button).toBeInTheDocument();
  });

  it('hides again when scrolling back below the threshold', () => {
    const { ref, node } = createScrollableRef(0);

    render(<ScrollToTop scrollableDivRef={ref} />);
    const button = screen.getByRole('button');

    act(() => {
      node.scrollTop = 350;
      fireEvent.scroll(node);
    });
    expect(button.className).toContain('opacity-100');

    act(() => {
      node.scrollTop = 100;
      fireEvent.scroll(node);
    });
    expect(button.className).toContain('opacity-0');
  });

});
