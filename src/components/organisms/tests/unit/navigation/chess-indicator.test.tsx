import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChessIndicator } from '@/components/organisms/navigation/chess-indicator';
import { renderWithProviders } from '@/tests/utils/render';

const useChessComMock = vi.fn();

vi.mock('@/hooks/use-chess-com', () => ({
  useChessCom: () => useChessComMock(),
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

describe('ChessIndicator', () => {
  beforeEach(() => {
    useChessComMock.mockReset();
  });

  it('renders nothing while loading or without stats', () => {
    useChessComMock.mockReturnValue({ data: null, loading: true });
    const { container } = renderWithProviders(<ChessIndicator />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders chess streak and rapid rating from mocked hook data', () => {
    useChessComMock.mockReturnValue({
      loading: false,
      data: {
        profileUrl: 'https://www.chess.com/member/marcelomafradev',
        streakDays: 7,
        rapidRating: 1250,
        rapidRecord: { win: 1, loss: 0, draw: 0 },
      },
    });

    renderWithProviders(<ChessIndicator />);

    const link = screen.getByRole('link', {
      name: /Ver perfil no Chess.com/i,
    });
    expect(link).toHaveAttribute(
      'href',
      'https://www.chess.com/member/marcelomafradev',
    );
    expect(screen.getByText('Chess.com')).toBeInTheDocument();
    expect(screen.getByText(/1250/)).toBeInTheDocument();
    expect(screen.getByText(/7d/)).toBeInTheDocument();
  });

  it('returns null when the snapshot has no streak, rating, or record', () => {
    useChessComMock.mockReturnValue({
      loading: false,
      data: {
        profileUrl: 'https://www.chess.com/member/marcelomafradev',
        streakDays: null,
        rapidRating: null,
        rapidRecord: null,
      },
    });

    const { container } = renderWithProviders(<ChessIndicator />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders only the available stats in the compact label', () => {
    useChessComMock.mockReturnValue({
      loading: false,
      data: {
        profileUrl: 'https://www.chess.com/member/marcelomafradev',
        streakDays: null,
        rapidRating: 980,
        rapidRecord: null,
      },
    });

    renderWithProviders(<ChessIndicator />);

    expect(screen.getByText(/980/)).toBeInTheDocument();
    expect(screen.queryByText(/d$/)).not.toBeInTheDocument();
  });

  it('renders only streak when rapid rating is unavailable', () => {
    useChessComMock.mockReturnValue({
      loading: false,
      data: {
        profileUrl: 'https://www.chess.com/member/marcelomafradev',
        streakDays: 3,
        rapidRating: null,
        rapidRecord: { win: 1, loss: 0, draw: 0 },
      },
    });

    renderWithProviders(<ChessIndicator />);

    expect(screen.getByText(/3d/)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/Sequência 3/i),
    );
  });
});
