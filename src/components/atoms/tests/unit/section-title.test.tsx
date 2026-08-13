import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionTitle } from '@/components/atoms/section-title';

describe('SectionTitle', () => {
  it('renders children as an h2 by default', () => {
    render(<SectionTitle>Experience</SectionTitle>);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Experience' }),
    ).toBeInTheDocument();
  });

  it('renders as h3 when requested', () => {
    render(<SectionTitle as="h3">Details</SectionTitle>);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Details' }),
    ).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    render(<SectionTitle className="extra-title">Title</SectionTitle>);

    expect(screen.getByRole('heading', { name: 'Title' }).className).toContain(
      'extra-title',
    );
  });
});
