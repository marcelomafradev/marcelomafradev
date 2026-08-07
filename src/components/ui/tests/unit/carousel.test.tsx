import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';


const emblaApi = {
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  canScrollPrev: vi.fn(() => true),
  canScrollNext: vi.fn(() => true),
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('embla-carousel-react', () => ({
  default: () => {
    const ref = (node: HTMLElement | null) => {
      void node;
    };
    return [ref, emblaApi];
  },
}));


beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds: readonly number[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }

  class MockResizeObserver implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });

  // Embla measures layout; jsdom has zero sizes by default.
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return 300;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 200;
    },
  });
});

describe('Carousel', () => {
  it('renders the carousel region with slides', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-roledescription',
      'carousel',
    );
    expect(screen.getAllByRole('group')).toHaveLength(2);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous slide' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' }),
    ).toBeInTheDocument();
  });

  it('exposes the embla api through setApi', () => {
    const setApi = vi.fn();

    render(
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Only slide</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(setApi).toHaveBeenCalled();
    const api = setApi.mock.calls[0]?.[0] as CarouselApi;
    expect(api).toBeTruthy();
  });

  it('handles arrow key navigation without throwing', async () => {
    const user = userEvent.setup();

    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>A</CarouselItem>
          <CarouselItem>B</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    const region = screen.getByRole('region');
    region.focus();
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');

    expect(region).toBeInTheDocument();
  });

  it('supports vertical orientation and control clicks', async () => {
    const user = userEvent.setup();
    const setApi = vi.fn();

    render(
      <Carousel orientation="vertical" setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Top</CarouselItem>
          <CarouselItem>Bottom</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(setApi).toHaveBeenCalled();
    const api = setApi.mock.calls[0]?.[0] as CarouselApi;
    expect(api).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Previous slide' }));

    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
  });

  it('ignores non-arrow key presses on the carousel region', async () => {
    const user = userEvent.setup();

    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Only</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const region = screen.getByRole('region');
    region.focus();
    await user.keyboard('{Enter}');

    expect(region).toBeInTheDocument();
  });

  it('throws when CarouselContent is rendered outside a Carousel provider', () => {
    // Suppress expected React error boundary noise
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <CarouselContent>
          <CarouselItem>orphan</CarouselItem>
        </CarouselContent>,
      ),
    ).toThrow('useCarousel must be used within a <Carousel />');
    spy.mockRestore();
  });

  it('uses vertical control placement when orientation is vertical', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Axis Y</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByText('Axis Y')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' }).className,
    ).toMatch(/rotate-90/);
  });


  it('wires previous/next controls to the embla api scroll helpers', async () => {
    const user = userEvent.setup();
    emblaApi.scrollPrev.mockClear();
    emblaApi.scrollNext.mockClear();
    emblaApi.canScrollPrev.mockReturnValue(true);
    emblaApi.canScrollNext.mockReturnValue(true);

    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Previous slide' }));

    expect(emblaApi.scrollNext).toHaveBeenCalled();
    expect(emblaApi.scrollPrev).toHaveBeenCalled();
  });


  it('invokes embla scroll helpers from arrow key handlers', () => {
    emblaApi.scrollPrev.mockClear();
    emblaApi.scrollNext.mockClear();

    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>A</CarouselItem>
          <CarouselItem>B</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const region = screen.getByRole('region');
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    fireEvent.keyDown(region, { key: 'ArrowLeft' });

    expect(emblaApi.scrollNext).toHaveBeenCalled();
    expect(emblaApi.scrollPrev).toHaveBeenCalled();
  });

});
