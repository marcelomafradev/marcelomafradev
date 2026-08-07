import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../messages/pt-br.json';
import type { ChessComSnapshot } from '@/lib/chesscom';

const { getTranslationsMock, fetchChessComProfileMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
  fetchChessComProfileMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}));

vi.mock('@/lib/chesscom', () => ({
  fetchChessComProfile: fetchChessComProfileMock,
}));

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

const snapshot: ChessComSnapshot = {
  username: 'marcelomafradev',
  profileUrl: 'https://www.chess.com/member/marcelomafradev',
  avatarUrl: null,
  league: 'Gold',
  rapidRating: 1200,
  rapidBest: 1300,
  rapidRecord: { win: 10, loss: 5, draw: 5 },
  blitzRating: 1100,
  blitzRecord: { win: 4, loss: 2, draw: 1 },
  streakDays: 12,
  streakUpdatedToday: true,
};

describe('ChessComCard', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    fetchChessComProfileMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'about.chess',
      });
    });
  });

  it('returns null when the chess snapshot is unavailable', async () => {
    fetchChessComProfileMock.mockResolvedValue(null);
    const { ChessComCard } =
      await import('@/components/organisms/chess-com-card');

    const ui = await ChessComCard();
    const { container } = render(ui);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders chess heading and stats from translations', async () => {
    fetchChessComProfileMock.mockResolvedValue(snapshot);
    const { ChessComCard } =
      await import('@/components/organisms/chess-com-card');

    const ui = await ChessComCard();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Xadrez todo dia' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Sequência')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Rapid')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Ver perfil no Chess.com/i }),
    ).toHaveAttribute('href', snapshot.profileUrl);
  });

  it('omits optional tiles when league, streak, and ratings are missing', async () => {
    fetchChessComProfileMock.mockResolvedValue({
      ...snapshot,
      league: null,
      streakDays: null,
      rapidRating: null,
      rapidBest: null,
      rapidRecord: null,
      blitzRating: null,
      blitzRecord: null,
    });
    const { ChessComCard } =
      await import('@/components/organisms/chess-com-card');

    const ui = await ChessComCard();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Xadrez todo dia' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Gold')).not.toBeInTheDocument();
    expect(screen.queryByText('Sequência')).not.toBeInTheDocument();
    expect(screen.queryByText('Rapid')).not.toBeInTheDocument();
    expect(screen.queryByText('Blitz')).not.toBeInTheDocument();
  });

  it('still shows rapid/blitz tiles from game counts without current ratings', async () => {
    fetchChessComProfileMock.mockResolvedValue({
      ...snapshot,
      league: null,
      streakDays: null,
      rapidRating: null,
      rapidBest: null,
      blitzRating: null,
      rapidRecord: { win: 2, loss: 1, draw: 1 },
      blitzRecord: { win: 1, loss: 0, draw: 0 },
    });
    const { ChessComCard } =
      await import('@/components/organisms/chess-com-card');

    const ui = await ChessComCard();
    render(ui);

    expect(screen.getByText('Rapid')).toBeInTheDocument();
    expect(screen.getByText('Blitz')).toBeInTheDocument();
    expect(screen.getAllByText(/4 partidas/i).length).toBeGreaterThan(0);
  });
});
