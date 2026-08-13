import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeading } from '@/components/atoms/page-heading';

describe('PageHeading', () => {
  it('renders the title as an h1 by default', () => {
    render(<PageHeading title="Projects" />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();
  });

  it('renders optional eyebrow and description', () => {
    render(
      <PageHeading
        title="About"
        eyebrow="Profile"
        description="A short bio."
      />,
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('A short bio.')).toBeInTheDocument();
  });

  it('renders as h2 when requested and shows an action slot', () => {
    render(
      <PageHeading
        title="Section"
        as="h2"
        action={<button type="button">Action</button>}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Section' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('omits optional fields when not provided', () => {
    render(<PageHeading title="Only title" />);

    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
