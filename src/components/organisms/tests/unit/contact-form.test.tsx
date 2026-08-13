import { screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/organisms/contact-form';
import { CONTACT_EMAIL } from '@/constants';
import { renderWithProviders, userEvent } from '@/tests/utils/render';

const toastSuccess = vi.fn();
const toastError = vi.fn();
const toastInfo = vi.fn();

vi.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
    info: (...args: unknown[]) => toastInfo(...args),
  },
}));

const validValues = {
  name: 'Marcelo Mafra',
  email: 'marcelo@example.com',
  subject: 'Hello there',
  message: 'This message is long enough to pass validation.',
};

async function fillAndSubmit() {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Nome'), validValues.name);
  await user.type(screen.getByLabelText('E-mail'), validValues.email);
  await user.type(screen.getByLabelText('Assunto'), validValues.subject);
  await user.type(screen.getByLabelText('Mensagem'), validValues.message);
  await user.click(screen.getByRole('button', { name: /Enviar mensagem/i }));

  return user;
}

describe('ContactForm', () => {
  const originalFetch = globalThis.fetch;
  const openSpy = vi.fn();

  beforeEach(() => {
    toastSuccess.mockClear();
    toastError.mockClear();
    toastInfo.mockClear();
    openSpy.mockReset();
    vi.stubGlobal('open', openSpy);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.unstubAllGlobals();
  });

  it('renders form fields and title from translations', () => {
    renderWithProviders(<ContactForm />);

    expect(
      screen.getByRole('heading', { name: 'Enviar mensagem' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Assunto')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
  });

  it('shows a success toast and resets when fetch returns 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    globalThis.fetch = fetchMock as typeof fetch;

    renderWithProviders(<ContactForm />);
    await fillAndSubmit();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith(
        'Mensagem enviada. Respondo em breve.',
      );
    });

    expect(screen.getByLabelText('Nome')).toHaveValue('');
    expect(screen.getByLabelText('E-mail')).toHaveValue('');
  });

  it('shows a rate-limited toast when fetch returns 429', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
    });
    globalThis.fetch = fetchMock as typeof fetch;

    renderWithProviders(<ContactForm />);
    await fillAndSubmit();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        'Muitas mensagens em pouco tempo. Tente novamente mais tarde.',
      );
    });
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('opens mailto when fetch returns 503', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });
    globalThis.fetch = fetchMock as typeof fetch;

    renderWithProviders(<ContactForm />);
    await fillAndSubmit();

    await waitFor(() => {
      expect(openSpy).toHaveBeenCalled();
    });

    const mailto = String(openSpy.mock.calls[0]?.[0]);
    expect(mailto.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
    expect(mailto).toContain(encodeURIComponent(validValues.subject));
    expect(toastInfo).toHaveBeenCalledWith(
      'Envio indisponível — abri seu cliente de e-mail com a mensagem pronta.',
    );
  });

  it('shows a generic error toast when fetch returns a non-ok status', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    globalThis.fetch = fetchMock as typeof fetch;

    renderWithProviders(<ContactForm />);
    await fillAndSubmit();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        'Não consegui enviar agora. Tente de novo ou use o e-mail direto.',
      );
    });
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it('shows a generic error toast when fetch throws', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    globalThis.fetch = fetchMock as typeof fetch;

    renderWithProviders(<ContactForm />);
    await fillAndSubmit();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        'Não consegui enviar agora. Tente de novo ou use o e-mail direto.',
      );
    });
  });
});
