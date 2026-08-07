import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}));

vi.mock('@/components/organisms', () => ({
  ChessComCard: () => <div data-testid="chess-com-card" />,
  FavoriteBooksCarousel: () => (
    <section>
      <h2>Livros que indico</h2>
    </section>
  ),
  FavoriteSongsCarousel: () => (
    <section>
      <h2>Músicas favoritas do momento</h2>
    </section>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={String(src)} {...rest} />
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

describe('AboutTemplate', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'about',
      });
    });
  });

  it('renders the about heading and personal interests landmark', async () => {
    const { AboutTemplate } =
      await import('@/components/templates/about-template');

    const ui = await AboutTemplate();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Sobre mim' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Fora do teclado' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Livros que indico' }),
    ).toBeInTheDocument();
  });
});
