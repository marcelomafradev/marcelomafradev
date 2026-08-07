import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DynamicIcon, Icon } from '@/components/ui/icon';

describe('Icon', () => {
  it('renders github and linkedin icons without throwing', () => {
    const { container } = render(
      <>
        <Icon.github data-testid="github" />
        <Icon.linkedin data-testid="linkedin" />
      </>,
    );

    expect(screen.getByTestId('github')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin')).toBeInTheDocument();
    expect(container.querySelectorAll('svg').length).toBe(2);
  });

  it('renders DynamicIcon by name', () => {
    render(<DynamicIcon name="spotify" data-testid="spotify" />);

    expect(screen.getByTestId('spotify')).toBeInTheDocument();
  });

  it('renders flag and chesscom custom icons', () => {
    render(
      <>
        <Icon.flagUs data-testid="flag-us" />
        <Icon.flagBr data-testid="flag-br" />
        <Icon.flagEs data-testid="flag-es" />
        <Icon.chesscom data-testid="chesscom" />
      </>,
    );

    expect(screen.getByTestId('flag-us')).toBeInTheDocument();
    expect(screen.getByTestId('flag-br')).toBeInTheDocument();
    expect(screen.getByTestId('flag-es')).toBeInTheDocument();
    expect(screen.getByTestId('chesscom')).toBeInTheDocument();
  });
});
