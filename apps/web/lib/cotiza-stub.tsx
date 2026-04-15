'use client';

import type { ReactNode } from 'react';

// Stub for @cotiza/client/react — the actual package isn't published yet.
// These exports satisfy build-time imports. Replace with the real package
// when cotiza.studio SDK is published to npm.madfam.io.

export type ManufacturingProcess = string;
export type Material = string;
export type Currency = string;
export type InstantQuoteResult = Record<string, unknown>;
export type PaymentMethod = string;

export function CotizaProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useInstantQuote() {
  return { quote: null, isLoading: false, error: null, calculate: () => {} };
}

export function useCheckout() {
  return { checkout: () => {}, isLoading: false, error: null };
}

export function useCheckoutResult() {
  return { result: null, isLoading: true, error: null };
}

export function useProviderInfo() {
  return { provider: null, isLoading: false };
}

export function formatCurrency(amount: number, _currency?: string) {
  return `$${amount.toFixed(2)}`;
}

export function formatEstimatedTime(days: number) {
  return `${days} days`;
}

export function formatPaymentMethod(method: string) {
  return method;
}

export const PAYMENT_METHOD_ICONS: Record<string, string> = {};
