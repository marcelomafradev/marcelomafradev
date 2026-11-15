import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CaseStudies } from '@/components/organisms/sections/case-studies';
import { CASE_STUDIES } from '@/constants';
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

  it('marks exactly the first case study as featured', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    expect(container.querySelectorAll('[data-featured="true"]')).toHaveLength(
      1,
    );
  });

  it('spans the featured card across both columns and keeps the rest single', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = Array.from(
      (container.querySelector('.grid') as HTMLElement).children,
    ) as HTMLElement[];

    expect(cards).toHaveLength(CASE_STUDIES.length);
    expect(cards[0]).toHaveAttribute('data-featured', 'true');
    expect(cards[0]).toHaveClass('xl:col-span-2');

    for (const card of cards.slice(1)) {
      expect(card).not.toHaveAttribute('data-featured');
      expect(card).not.toHaveClass('xl:col-span-2');
    }
  });
});
