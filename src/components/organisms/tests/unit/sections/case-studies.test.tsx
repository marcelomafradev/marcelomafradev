import { screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CaseStudies } from '@/components/organisms/sections/case-studies';
import { CASE_STUDIES } from '@/constants';
import { renderWithProviders } from '@/tests/utils/render';
import ptBr from '../../../../../../messages/pt-br.json';

const items = ptBr.homepage['case-studies'].items;

const cardsIn = (container: HTMLElement) =>
  Array.from(container.children) as HTMLElement[];

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
      screen.getByRole('heading', {
        name: ptBr.homepage['case-studies'].title,
      }),
    ).toBeInTheDocument();
    expect(document.getElementById('case-studies')).toBeTruthy();
  });

  it('renders one card per case study with the credit AI study first and featured', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = cardsIn(container.querySelector('.grid') as HTMLElement);

    expect(cards).toHaveLength(3);
    expect(cards).toHaveLength(CASE_STUDIES.length);
    expect(container.querySelectorAll('[data-featured="true"]')).toHaveLength(
      1,
    );
    expect(cards[0]).toHaveAttribute('data-featured', 'true');
    expect(
      within(cards[0]).getByRole('heading', { level: 3 }),
    ).toHaveTextContent(items['credit-ai'].title);
  });

  it('renders exactly the credit AI, payments and real estate case studies in order', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const titles = cardsIn(container.querySelector('.grid') as HTMLElement).map(
      (card) => within(card).getByRole('heading', { level: 3 }).textContent,
    );

    expect(CASE_STUDIES.map(({ id }) => id)).toEqual([
      'credit-ai',
      'payments',
      'realestate',
    ]);
    expect(titles).toEqual([
      items['credit-ai'].title,
      items.payments.title,
      items.realestate.title,
    ]);
  });

  it('marks no card as wide because the non-featured count is even', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    expect(container.querySelectorAll('[data-wide="true"]')).toHaveLength(0);
  });

  it('spans only the featured card across two columns', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = cardsIn(container.querySelector('.grid') as HTMLElement);

    expect(cards[0]).toHaveClass('xl:col-span-2');

    for (const card of cards.slice(1)) {
      expect(card).not.toHaveClass('xl:col-span-2');
    }
  });

  it('lays the featured card highlights out in three columns and the others in a single column', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = cardsIn(container.querySelector('.grid') as HTMLElement);
    const highlightsOf = (card: HTMLElement) =>
      card.querySelectorAll('ul')[0] as HTMLElement;

    expect(highlightsOf(cards[0])).toHaveClass('xl:grid', 'xl:grid-cols-3');
    expect(highlightsOf(cards[1])).not.toHaveClass('xl:grid');
    expect(highlightsOf(cards[2])).not.toHaveClass('xl:grid');
  });

  it('lists the credit AI stack tags including Claude API and SQL Server', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = cardsIn(container.querySelector('.grid') as HTMLElement);

    expect(within(cards[0]).getByText('Claude API')).toBeInTheDocument();
    expect(within(cards[0]).getByText('SQL Server')).toBeInTheDocument();
  });

  it('states the 22 services of the payments platform in its title', () => {
    const { container } = renderWithProviders(<CaseStudies />);

    const cards = cardsIn(container.querySelector('.grid') as HTMLElement);

    expect(
      within(cards[1]).getByRole('heading', { level: 3 }),
    ).toHaveTextContent(/\b22\b/);
  });
});
