'use client';

import type { ReactNode } from 'react';

// Stub for @cotiza/client/react — the actual package isn't published yet.
// These exports satisfy build-time imports and provide the type surface the
// consuming components (QuoteCalculator, QuoteCheckout, orders/success) are
// written against. Runtime behavior is intentionally inert (no network calls);
// replace with the real package when the cotiza.studio SDK is published to
// npm.madfam.io. Keep these types in sync with the intended cotiza API.

export type ManufacturingProcess = string;
export type Material = string;
export type Currency = string;
export type PaymentMethod = string;

/** Line-item cost breakdown returned with an instant quote. */
export interface QuoteBreakdown {
  materialCost: number;
  machineCost: number;
  laborCost: number;
}

/** Result of an instant quote calculation. */
export interface InstantQuoteResult {
  totalPrice: number;
  unitPrice: number;
  estimatedHours: number;
  estimatedDays: number;
  breakdown: QuoteBreakdown;
}

/** Parameters accepted by useInstantQuote().calculate(). */
export interface InstantQuoteParams {
  process: ManufacturingProcess;
  material: Material;
  quantity: number;
  volume: number;
  currency: Currency;
}

/** Simplified error surface used across cotiza hooks. */
export interface CotizaError {
  message: string;
}

/** A single payment method offered for a given country/provider. */
export interface PaymentMethodInfo {
  type: PaymentMethod;
  available: boolean;
  description: string;
  processingTime?: string;
}

/** Provider capabilities for a country, returned by useProviderInfo(). */
export interface ProviderInfo {
  provider: string;
  paymentMethods: PaymentMethodInfo[];
}

/** Terminal states for a checkout result. */
export type CheckoutStatus = 'paid' | 'pending' | 'failed' | 'canceled' | string;

/** Result of confirming a checkout session, returned by useCheckoutResult(). */
export interface CheckoutResult {
  status: CheckoutStatus;
  paymentMethod?: PaymentMethod;
  orderId?: string;
  error?: string;
}

/** A line item passed to createCheckout(). */
export interface CheckoutLineItem {
  name: string;
  description?: string;
  amount: number;
  currency: Currency;
  quantity: number;
}

/** Parameters accepted by useCheckout().createCheckout(). */
export interface CreateCheckoutParams {
  quoteId: string;
  customerEmail: string;
  customerName?: string;
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
  countryCode: string;
}

/** Handle to a created checkout session. */
export interface CheckoutSession {
  id: string;
  url?: string;
}

interface CotizaProviderConfig {
  baseUrl: string;
}

interface CotizaCheckoutConfig {
  januaApiUrl: string;
  januaPublishableKey?: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CotizaProviderProps {
  children: ReactNode;
  config: CotizaProviderConfig;
  checkoutConfig?: CotizaCheckoutConfig;
}

export function CotizaProvider({ children }: CotizaProviderProps) {
  return <>{children}</>;
}

export function useInstantQuote(): {
  quote: InstantQuoteResult | null;
  isLoading: boolean;
  error: CotizaError | null;
  calculate: (params: InstantQuoteParams) => Promise<void>;
} {
  return {
    quote: null,
    isLoading: false,
    error: null,
    calculate: async () => {},
  };
}

export function useCheckout(): {
  createCheckout: (params: CreateCheckoutParams) => Promise<CheckoutSession | null>;
  redirectToCheckout: () => void;
  isLoading: boolean;
  error: CotizaError | null;
} {
  return {
    createCheckout: async () => null,
    redirectToCheckout: () => {},
    isLoading: false,
    error: null,
  };
}

export function useCheckoutResult(): {
  result: CheckoutResult | null;
  fetchResult: (sessionId: string) => void;
  isLoading: boolean;
  error: CotizaError | null;
} {
  return {
    result: null,
    fetchResult: () => {},
    isLoading: true,
    error: null,
  };
}

export function useProviderInfo(): {
  providerInfo: ProviderInfo | null;
  fetchProviderInfo: (countryCode: string) => void;
  isLoading: boolean;
} {
  return {
    providerInfo: null,
    fetchProviderInfo: () => {},
    isLoading: false,
  };
}

export function formatCurrency(amount: number, currency?: Currency) {
  const formatted = amount.toFixed(2);
  return currency ? `$${formatted} ${currency}` : `$${formatted}`;
}

export function formatEstimatedTime(hours: number) {
  return `${hours} hours`;
}

export function formatPaymentMethod(method: PaymentMethod) {
  return method;
}

export const PAYMENT_METHOD_ICONS: Record<string, string> = {};
