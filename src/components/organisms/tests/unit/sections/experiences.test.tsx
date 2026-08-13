import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTranslator } from 'next-intl';
import ptBr from '../../../../../../messages/pt-br.json';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
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

describe('Experiences', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async (namespace: string) => {
      return createTranslator({
        locale: 'pt-br',
        messages: ptBr,
        namespace: namespace as 'homepage.experiences',
      });
    });
  });

  it('renders the experiences heading from translations', async () => {
    const { Experiences } =
      await import('@/components/organisms/sections/experiences');

    const ui = await Experiences();
    render(ui);

    expect(
      screen.getByRole('heading', { name: 'Experiências' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Ver currículo completo/i }),
    ).toBeInTheDocument();
  });
});
