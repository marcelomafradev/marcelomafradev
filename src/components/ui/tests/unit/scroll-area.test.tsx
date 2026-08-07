import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollArea } from '@/components/ui/scroll-area';

describe('ScrollArea', () => {
  it('renders children inside the scroll area root', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <p>Scrollable content</p>
      </ScrollArea>,
    );

    expect(screen.getByTestId('scroll-area')).toHaveAttribute(
      'data-slot',
      'scroll-area',
    );
    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('accepts vertical orientation (default) without throwing', () => {
    render(
      <ScrollArea orientation="vertical" data-testid="v-scroll">
        <div style={{ height: 200 }}>Tall content</div>
      </ScrollArea>,
    );

    expect(screen.getByTestId('v-scroll')).toBeInTheDocument();
    expect(screen.getByText('Tall content')).toBeInTheDocument();
  });

  it('accepts horizontal orientation without throwing', () => {
    render(
      <ScrollArea orientation="horizontal" data-testid="h-scroll">
        <div style={{ width: 400 }}>Wide content</div>
      </ScrollArea>,
    );

    expect(screen.getByTestId('h-scroll')).toBeInTheDocument();
    expect(screen.getByText('Wide content')).toBeInTheDocument();
  });

  it('accepts both orientation without throwing', () => {
    render(
      <ScrollArea orientation="both" data-testid="both-scroll">
        <div>Content</div>
      </ScrollArea>,
    );

    expect(screen.getByTestId('both-scroll')).toBeInTheDocument();
  });
});
