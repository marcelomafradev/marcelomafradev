import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { STACK } from '@/constants';
import { TechnologiesTemplate } from '@/components/templates/technologies-template';
import { renderWithProviders } from '@/tests/utils/render';
import ptBr from '../../../../../messages/pt-br.json';

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
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
}));

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
}));

describe('TechnologiesTemplate', () => {
  it('renders the technologies heading from translations', () => {
    renderWithProviders(<TechnologiesTemplate />);

    expect(
      screen.getByRole('heading', { name: 'Minhas tecnologias' }),
    ).toBeInTheDocument();
  });

  it('places the AI and agents section before the frontend section', () => {
    renderWithProviders(<TechnologiesTemplate />);

    const ai = screen.getByRole('heading', {
      name: ptBr.technologies.ai.title,
    });
    const frontend = screen.getByRole('heading', {
      name: ptBr.technologies.frontend,
    });

    expect(ai.compareDocumentPosition(frontend)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('exposes the AI tools and models as external links', () => {
    renderWithProviders(<TechnologiesTemplate />);

    const tools = [
      'Claude Code',
      'Claude',
      'Anthropic API',
      'OpenAI Codex',
      'MCP',
      'DeepSeek',
      'Hermes Agent',
    ];

    for (const tool of tools) {
      const link = screen.getByRole('link', { name: tool });

      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
    }
  });

  it('does not render the AI practices section', () => {
    renderWithProviders(<TechnologiesTemplate />);

    expect(
      screen.queryByRole('heading', { name: 'Como uso IA' }),
    ).not.toBeInTheDocument();

    for (const label of [
      'Spec-driven development',
      'Roteamento entre modelos',
      'Scrapers e automação de portais',
    ]) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      STACK.length + 1,
    );
  });

  it('gives the AI card the same surface as the other stack cards', () => {
    renderWithProviders(<TechnologiesTemplate />);

    const aiCard = screen
      .getByRole('heading', { name: ptBr.technologies.ai.title })
      .closest('section')?.lastElementChild as HTMLElement;
    const frontendCard = screen
      .getByRole('heading', { name: ptBr.technologies.frontend })
      .closest('section')?.lastElementChild as HTMLElement;

    expect(aiCard.className).toBe(frontendCard.className);
    expect(aiCard).not.toHaveClass('border-primary/40');
    expect(aiCard).toHaveClass('border-border/60');
  });

  it('renders the desktop, database, observability and testing additions', () => {
    renderWithProviders(<TechnologiesTemplate />);

    for (const name of [
      'Tauri',
      'Rust',
      'SQL Server',
      'Prometheus',
      'Playwright',
    ]) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
  });
});
