import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ThemeProvider from '@/providers/theme-provider';

vi.mock('next-themes', () => ({
  ThemeProvider: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
  }) => (
    <div
      data-testid="next-themes-provider"
      data-attribute={props.attribute}
      data-default-theme={props.defaultTheme}
    >
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children text through next-themes', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system">
        <span>theme child</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('theme child')).toBeInTheDocument();
    expect(screen.getByTestId('next-themes-provider')).toHaveAttribute(
      'data-attribute',
      'class',
    );
    expect(screen.getByTestId('next-themes-provider')).toHaveAttribute(
      'data-default-theme',
      'system',
    );
  });
});
