import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('places the AI practices heading between the AI tools and the frontend section', () => {
    renderWithProviders(<TechnologiesTemplate />);

    const ai = screen.getByRole('heading', {
      name: ptBr.technologies.ai.title,
    });
    const practices = screen.getByRole('heading', {
      name: ptBr.technologies.ai['practices-title'],
    });
    const frontend = screen.getByRole('heading', {
      name: ptBr.technologies.frontend,
    });

    expect(ai.compareDocumentPosition(practices)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(practices.compareDocumentPosition(frontend)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('renders every AI practice from the translations as plain text', () => {
    renderWithProviders(<TechnologiesTemplate />);

    const practices = Object.values(ptBr.technologies.ai.practices);

    expect(practices).toHaveLength(8);

    for (const practice of practices) {
      const label = screen.getByText(practice);

      expect(label).toBeInTheDocument();
      expect(label.closest('a')).toBeNull();
      expect(
        screen.queryByRole('link', { name: practice }),
      ).not.toBeInTheDocument();
    }
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
