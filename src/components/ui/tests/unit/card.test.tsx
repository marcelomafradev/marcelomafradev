import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

describe('Card', () => {
  it('renders the full card composition with title and description', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>Selected work</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Portfolio' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Selected work')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer actions')).toBeInTheDocument();
  });

  it('merges a custom className on the root card', () => {
    render(<Card className="extra-card" data-testid="card" />);

    expect(screen.getByTestId('card').className).toContain('extra-card');
  });
});
