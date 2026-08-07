import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

describe('Avatar', () => {
  it('renders the root with the avatar data-slot', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>MM</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByTestId('avatar')).toHaveAttribute('data-slot', 'avatar');
  });

  it('renders the fallback text when no image is loaded', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText('JD')).toHaveAttribute(
      'data-slot',
      'avatar-fallback',
    );
  });

  it('accepts AvatarImage without throwing while image is loading', () => {
    render(
      <Avatar data-testid="avatar-with-image">
        <AvatarImage src="/avatar.png" alt="Marcelo" />
        <AvatarFallback>MM</AvatarFallback>
      </Avatar>,
    );

    // Base UI only mounts the <img> after load; fallback remains visible in jsdom.
    expect(screen.getByTestId('avatar-with-image')).toBeInTheDocument();
    expect(screen.getByText('MM')).toBeInTheDocument();
  });
});
