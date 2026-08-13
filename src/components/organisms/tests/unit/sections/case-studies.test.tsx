import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CaseStudies } from '@/components/organisms/sections/case-studies';
import { renderWithProviders } from '@/tests/utils/render';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/',
}));

describe('CaseStudies', () => {
  it('renders the section heading from translations', () => {
    renderWithProviders(<CaseStudies />);

    expect(
      screen.getByRole('heading', { name: 'Case studies de engenharia' }),
    ).toBeInTheDocument();
    expect(document.getElementById('case-studies')).toBeTruthy();
  });
});
