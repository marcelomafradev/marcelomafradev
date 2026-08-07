import { render, screen } from '@testing-library/react';
import { Home } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { NavItemContent } from '@/components/atoms/nav-item-content';

describe('NavItemContent', () => {
  it('renders the label and icon', () => {
    const { container } = render(<NavItemContent icon={Home} label="Home" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('omits the arrow icon by default', () => {
    const { container } = render(
      <NavItemContent icon={Home} label="Projects" />,
    );

    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('renders the arrow icon when requested', () => {
    const { container } = render(
      <NavItemContent icon={Home} label="External" hasArrowIcon />,
    );

    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});
