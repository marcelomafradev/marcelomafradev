import { render, screen } from '@testing-library/react';
import { Trophy } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { StatTile } from '@/components/molecules/stat-tile';

describe('StatTile', () => {
  it('renders label, value, and icon inside a definition list', () => {
    render(
      <dl>
        <StatTile icon={Trophy} label="Rating" value="1840" />
      </dl>,
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('1840')).toBeInTheDocument();
  });

  it('renders optional hint and footnote', () => {
    render(
      <dl>
        <StatTile
          icon={Trophy}
          label="Wins"
          value="12"
          hint="+3"
          footnote="Last 30 days"
        />
      </dl>,
    );

    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  it('omits optional fields when not provided', () => {
    render(
      <dl>
        <StatTile icon={Trophy} label="Losses" value="2" />
      </dl>,
    );

    expect(screen.queryByText('+3')).not.toBeInTheDocument();
    expect(screen.queryByText('Last 30 days')).not.toBeInTheDocument();
  });
});
