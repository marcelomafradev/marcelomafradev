import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AiWorkflow } from '@/components/organisms/sections/ai-workflow';
import { AI_WORKFLOW_PILLARS } from '@/constants';
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

describe('AiWorkflow', () => {
  it('renders the section heading from translations', () => {
    renderWithProviders(<AiWorkflow />);

    expect(
      screen.getByRole('heading', { name: 'IA no fluxo de engenharia' }),
    ).toBeInTheDocument();
    expect(document.getElementById('ai-workflow')).toBeTruthy();
  });

  it('renders one card per pillar with title, description and tag', () => {
    renderWithProviders(<AiWorkflow />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      AI_WORKFLOW_PILLARS.length,
    );

    expect(
      screen.getByRole('heading', { name: 'Spec e plano antes do código' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Spec-driven development')).toBeInTheDocument();
    expect(
      screen.getByText(/Spec ambígua é bug de requisito/),
    ).toBeInTheDocument();
  });

  it('renders the closing note about applying the workflow on real products', () => {
    renderWithProviders(<AiWorkflow />);

    expect(screen.getByText(/Aplicado em produto real/)).toBeInTheDocument();
  });
});
