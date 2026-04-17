/* eslint-disable turbo/no-undeclared-env-vars */
/**
 * Tests for the contact form server action shipped in commit 00ab073.
 * Covers Zod validation paths, the Resend HTTP call shape, and the
 * no-send fallback when RESEND_API_KEY is absent.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { submitContactForm } from '../../app/actions/contact';

type FetchArgs = Parameters<typeof globalThis.fetch>;

function validFormData(overrides: Partial<Record<string, string>> = {}): FormData {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    name: 'Ana Mendoza',
    email: 'ana@example.com',
    subject: 'Exhibition inquiry',
    message: 'Interested in the spring collection. Please share availability.',
  };
  const merged = { ...defaults, ...overrides };
  for (const [k, v] of Object.entries(merged)) {
    if (v !== '' && v !== undefined) fd.set(k, v);
  }
  return fd;
}

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.restoreAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('submitContactForm', () => {
  it('returns success and calls Resend with correct payload when API key is set', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    // CONTACT_EMAIL / RESEND_FROM_EMAIL are captured at module load — don't
    // reassign them here; the module-level defaults are what we verify.

    const fetchSpy = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: 'email_1' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const result = await submitContactForm(validFormData());

    expect(result.success).toBe(true);
    expect(result.message).toMatch(/thank you/i);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [url, init] = fetchSpy.mock.calls[0] as FetchArgs;
    expect(url).toBe('https://api.resend.com/emails');
    expect((init as RequestInit).method).toBe('POST');
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer test-key');
    expect(headers['Content-Type']).toBe('application/json');

    const body = JSON.parse(String((init as RequestInit).body));
    expect(body.from).toBeTruthy();
    expect(Array.isArray(body.to)).toBe(true);
    expect(body.to).toHaveLength(1);
    expect(body.reply_to).toBe('ana@example.com');
    expect(body.subject).toBe('Contact Form: Exhibition inquiry');
    expect(body.html).toContain('Ana Mendoza');
    expect(body.html).toContain('Interested in the spring collection');
  });

  it('succeeds but skips the network call when RESEND_API_KEY is unset', async () => {
    delete process.env.RESEND_API_KEY;
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    // Silence the documented no-send warning
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await submitContactForm(validFormData());

    expect(result.success).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns errors for invalid email without calling Resend', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const result = await submitContactForm(validFormData({ email: 'not-an-email' }));

    expect(result.success).toBe(false);
    expect(result.errors?.email).toMatch(/invalid email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns errors for short message / name / subject', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));

    const result = await submitContactForm(
      validFormData({ name: 'A', subject: 'hi', message: 'short' })
    );

    expect(result.success).toBe(false);
    expect(result.errors?.name).toBeTruthy();
    expect(result.errors?.subject).toBeTruthy();
    expect(result.errors?.message).toBeTruthy();
  });

  it('returns a generic failure message when Resend returns a non-2xx', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('rate limited', { status: 429 }))
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await submitContactForm(validFormData());

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/try again/i);
    expect(result.errors).toBeUndefined();
  });

  it('accepts optional company + phone without touching validation', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const fetchSpy = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const result = await submitContactForm(
      validFormData({ company: 'Atelier MX', phone: '+52-555-0000' })
    );

    expect(result.success).toBe(true);
    const body = JSON.parse(String(fetchSpy.mock.calls[0]?.[1]?.body));
    expect(body.html).toContain('Atelier MX');
    expect(body.html).toContain('+52-555-0000');
  });
});
