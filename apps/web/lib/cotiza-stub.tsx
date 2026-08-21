'use client';

import type { ReactNode } from 'react';

// Stub for @cotiza/client/react — the actual package isn't published yet.
// These exports satisfy build-time imports and type checking. Replace with the
// real package when the cotiza.studio SDK is published to npm.madfam.io.
//
// The type surface here mirrors how QuoteCheckout.tsx consumes the SDK so that
// `tsc --noEmit` passes. Runtime behaviour is intentionally inert (no network).

export type ManufacturingProcess = string;
export type Material = string;
export type Currency = string;
export type PaymentMethod = string;

export interface QuoteBreakdown {
  materialCost: number;
  machineCost: number;
  laborCost: number;
}

export interface InstantQuoteResult {
  totalPrice: number;
  unitPrice: number;
  estimatedHours: number;
  estimatedDays: number;
  breakdown: QuoteBreakdown;
}

export interface CalculateQuoteInput {
  process: ManufacturingProcess;
  material: Material;
  quantity: number;
  volume: number;
  currency: Currency;
}

export interface CheckoutLineItem {
  name: string;
  description?: string;
  amount: number;
  currency: Currency;
  quantity: number;
}

export interface CreateCheckoutInput {
  quoteId: string;
  customerEmail: string;
  customerName?: string;
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
  countryCode: string;
}

export interface CheckoutSession {
  id: string;
  url?: string;
}

export interface ProviderPaymentMethod {
  type: PaymentMethod;
  available: boolean;
  description?: string;
  processingTime?: string;
}

export interface ProviderInfo {
  provider: string | null;
  paymentMethods: ProviderPaymentMethod[];
}

export interface CotizaConfig {
  baseUrl: string;
}

export interface CotizaCheckoutConfig {
  januaApiUrl: string;
  januaPublishableKey?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CotizaProviderProps {
  children: ReactNode;
  config?: CotizaConfig;
  checkoutConfig?: CotizaCheckoutConfig;
}

export function CotizaProvider({ children }: CotizaProviderProps) {
  return <>{children}</>;
}

export interface UseInstantQuoteResult {
  quote: InstantQuoteResult | null;
  isLoading: boolean;
  error: Error | null;
  calculate: (input: CalculateQuoteInput) => Promise<void>;
}

export function useInstantQuote(): UseInstantQuoteResult {
  return {
    quote: null,
    isLoading: false,
    error: null,
    calculate: async () => {},
  };
}

export interface UseCheckoutResult {
  createCheckout: (input: CreateCheckoutInput) => Promise<CheckoutSession | null>;
  redirectToCheckout: () => void;
  isLoading: boolean;
  error: Error | null;
}

export function useCheckout(): UseCheckoutResult {
  return {
    createCheckout: async () => null,
    redirectToCheckout: () => {},
    isLoading: false,
    error: null,
  };
}

export type CheckoutStatus = 'pending' | 'paid' | 'failed' | 'canceled';

export interface CheckoutResult {
  status: CheckoutStatus;
  orderId?: string;
  paymentMethod?: PaymentMethod;
  error?: string;
}

export interface UseCheckoutResultData {
  result: CheckoutResult | null;
  fetchResult: (sessionId: string) => void;
  isLoading: boolean;
  error: Error | null;
}

export function useCheckoutResult(): UseCheckoutResultData {
  return { result: null, fetchResult: () => {}, isLoading: true, error: null };
}

export interface UseProviderInfoResult {
  providerInfo: ProviderInfo | null;
  fetchProviderInfo: (countryCode: string) => void;
  isLoading: boolean;
}

export function useProviderInfo(): UseProviderInfoResult {
  return {
    providerInfo: null,
    fetchProviderInfo: () => {},
    isLoading: false,
  };
}

export function formatCurrency(amount: number, _currency?: Currency): string {
  return `$${amount.toFixed(2)}`;
}

export function formatEstimatedTime(days: number): string {
  return `${days} days`;
}

export function formatPaymentMethod(method: string): string {
  return method;
}

export const PAYMENT_METHOD_ICONS: Record<string, string> = {};
