'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  CotizaProvider,
  useInstantQuote,
  useCheckout,
  useProviderInfo,
  formatCurrency,
  formatEstimatedTime,
  formatPaymentMethod,
  PAYMENT_METHOD_ICONS,
  type ManufacturingProcess,
  type Material,
  type Currency,
  type InstantQuoteResult,
  type PaymentMethod,
} from '@/lib/cotiza-stub';

// ============================================================================
// Constants
// ============================================================================

const PROCESSES: { id: ManufacturingProcess; name: string; description: string }[] = [
  {
    id: 'fdm',
    name: 'FDM 3D Printing',
    description: 'Fused Deposition Modeling - Best for prototypes',
  },
  { id: 'sla', name: 'SLA 3D Printing', description: 'Stereolithography - High detail parts' },
  { id: 'cnc', name: 'CNC Machining', description: 'Precision metal & plastic parts' },
  { id: 'laser', name: 'Laser Cutting', description: '2D cutting for flat materials' },
];

const MATERIALS: Record<ManufacturingProcess, { id: Material; name: string }[]> = {
  fdm: [
    { id: 'pla', name: 'PLA' },
    { id: 'abs', name: 'ABS' },
    { id: 'petg', name: 'PETG' },
    { id: 'tpu', name: 'TPU (Flexible)' },
    { id: 'nylon', name: 'Nylon' },
  ],
  sla: [
    { id: 'resin_standard', name: 'Standard Resin' },
    { id: 'resin_tough', name: 'Tough Resin' },
  ],
  cnc: [
    { id: 'aluminum', name: 'Aluminum 6061' },
    { id: 'steel', name: 'Stainless Steel' },
  ],
  laser: [
    { id: 'acrylic', name: 'Acrylic' },
    { id: 'wood', name: 'Wood/Plywood' },
    { id: 'mdf', name: 'MDF' },
  ],
};

// ============================================================================
// Payment Method Selection Component
// ============================================================================

interface PaymentMethodSelectorProps {
  countryCode: string;
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

function PaymentMethodSelector({
  countryCode,
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  const { providerInfo, fetchProviderInfo, isLoading } = useProviderInfo();

  useEffect(() => {
    fetchProviderInfo(countryCode);
  }, [countryCode, fetchProviderInfo]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }

  if (!providerInfo) return null;

  const availableMethods = providerInfo.paymentMethods.filter((pm) => pm.available);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Payment Method
      </label>
      <div className="space-y-2">
        {availableMethods.map((pm) => (
          <button
            key={pm.type}
            onClick={() => onSelect(pm.type)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
              selectedMethod === pm.type
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">{PAYMENT_METHOD_ICONS[pm.type] || '💰'}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {formatPaymentMethod(pm.type)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {pm.description}
                {pm.processingTime && ` • ${pm.processingTime}`}
              </div>
            </div>
            {selectedMethod === pm.type && (
              <span className="text-green-500 text-xl">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Powered by {providerInfo.provider === 'conekta' ? 'Conekta' : providerInfo.provider === 'polar' ? 'Polar' : 'Stripe'} • Secure payment processing by Janua
      </p>
    </div>
  );
}

// ============================================================================
// Quote Form Component
// ============================================================================

interface QuoteFormProps {
  onQuoteCalculated?: (quote: InstantQuoteResult, currency: Currency) => void;
  onProceedToCheckout?: (quote: InstantQuoteResult, currency: Currency) => void;
}

function QuoteForm({ onQuoteCalculated, onProceedToCheckout }: QuoteFormProps) {
  const { quote, isLoading, error, calculate } = useInstantQuote();

  const [process, setProcess] = useState<ManufacturingProcess>('fdm');
  const [material, setMaterial] = useState<Material>('pla');
  const [quantity, setQuantity] = useState(1);
  const [dimensions, setDimensions] = useState({ x: 50, y: 50, z: 50 });
  const [currency, setCurrency] = useState<Currency>('MXN'); // Default to MXN for Mexico

  // Calculate approximate volume
  const volume = dimensions.x * dimensions.y * dimensions.z;

  const handleCalculate = useCallback(async () => {
    await calculate({
      process,
      material,
      quantity,
      volume,
      currency,
    });
  }, [process, material, quantity, volume, currency, calculate]);

  // Notify parent when quote is calculated
  useEffect(() => {
    if (quote) {
      onQuoteCalculated?.(quote, currency);
    }
  }, [quote, currency, onQuoteCalculated]);

  const handleProcessChange = (newProcess: ManufacturingProcess) => {
    setProcess(newProcess);
    const availableMaterials = MATERIALS[newProcess];
    if (availableMaterials && availableMaterials.length > 0) {
      const firstMaterial = availableMaterials[0];
      if (firstMaterial) {
        setMaterial(firstMaterial.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Process Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Manufacturing Process
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PROCESSES.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProcessChange(p.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                process === p.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">{p.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{p.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Material
        </label>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value as Material)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {MATERIALS[process]?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dimensions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dimensions (mm)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis}>
              <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">{axis}</label>
              <input
                type="number"
                value={dimensions[axis]}
                onChange={(e) =>
                  setDimensions((d) => ({ ...d, [axis]: Number(e.target.value) || 0 }))
                }
                min={1}
                max={500}
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Volume: {(volume / 1000).toFixed(1)} cm³
        </div>
      </div>

      {/* Quantity & Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            min={1}
            max={1000}
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="MXN">🇲🇽 MXN - Mexican Peso</option>
            <option value="USD">🇺🇸 USD - US Dollar</option>
            <option value="EUR">🇪🇺 EUR - Euro</option>
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={isLoading}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors"
      >
        {isLoading ? 'Calculating...' : 'Get Instant Quote'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
        </div>
      )}

      {/* Quote Result */}
      {quote && (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="text-center">
            <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
              Estimated Total
            </div>
            <div className="text-4xl font-bold text-green-700 dark:text-green-300">
              {formatCurrency(quote.totalPrice, currency)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {formatCurrency(quote.unitPrice, currency)} per unit × {quantity}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-green-200 dark:border-green-700">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Production Time</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {formatEstimatedTime(quote.estimatedHours)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Delivery</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                ~{quote.estimatedDays} days
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Cost Breakdown</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Material</span>
                <span className="text-gray-900 dark:text-white">
                  {formatCurrency(quote.breakdown.materialCost, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Machine Time</span>
                <span className="text-gray-900 dark:text-white">
                  {formatCurrency(quote.breakdown.machineCost, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Labor</span>
                <span className="text-gray-900 dark:text-white">
                  {formatCurrency(quote.breakdown.laborCost, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Proceed to Checkout Button */}
          <button
            onClick={() => onProceedToCheckout?.(quote, currency)}
            className="mt-6 w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
          >
            Proceed to Payment →
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Checkout Form Component
// ============================================================================

interface CheckoutFormProps {
  quote: InstantQuoteResult;
  currency: Currency;
  onBack: () => void;
}

function CheckoutForm({ quote, currency, onBack }: CheckoutFormProps) {
  const { createCheckout, redirectToCheckout, isLoading, error } = useCheckout();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  // Determine country code from currency for payment method selection
  const countryCode = currency === 'MXN' ? 'MX' : currency === 'EUR' ? 'EU' : 'US';

  const handleCheckout = useCallback(async () => {
    if (!email) return;

    const session = await createCheckout({
      quoteId: `instant_${Date.now()}`, // For instant quotes, generate a temporary ID
      customerEmail: email,
      customerName: name || undefined,
      lineItems: [
        {
          name: 'Manufacturing Order',
          description: 'Custom manufacturing service via Primavera3D',
          amount: Math.round(quote.totalPrice * 100), // Convert to cents/centavos
          currency: currency,
          quantity: 1,
        },
      ],
      successUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/orders/success`,
      cancelUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/quote`,
      countryCode,
    });

    if (session) {
      redirectToCheckout();
    }
  }, [email, name, quote, currency, countryCode, createCheckout, redirectToCheckout]);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
      >
        ← Back to Quote
      </button>

      {/* Order Summary */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {formatCurrency(quote.totalPrice, currency)}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Estimated delivery</span>
          <span>~{quote.estimatedDays} days</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <PaymentMethodSelector
        countryCode={countryCode}
        selectedMethod={selectedPaymentMethod}
        onSelect={setSelectedPaymentMethod}
      />

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || !email}
        className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay ${formatCurrency(quote.totalPrice, currency)}`
        )}
      </button>

      {/* Security Notice */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        🔒 Secure payment powered by Janua
        <br />
        {currency === 'MXN' && 'Accepting OXXO, SPEI, and credit/debit cards'}
        {currency === 'USD' && 'Accepting credit/debit cards'}
        {currency === 'EUR' && 'Accepting credit/debit cards and SEPA'}
      </p>
    </div>
  );
}

// ============================================================================
// Main QuoteCheckout Component
// ============================================================================

interface QuoteCheckoutProps {
  cotizaApiUrl?: string;
  januaApiUrl?: string;
  januaPublishableKey?: string;
}

/**
 * QuoteCheckout - Full quote-to-payment flow for Primavera3D
 *
 * Integrates Cotiza Studio quoting with Janua Payment Gateway.
 * Supports multiple currencies and payment methods:
 * - MXN: OXXO (cash), SPEI (bank transfer), Cards via Conekta
 * - USD/EUR: Cards via Stripe or Polar (MoR)
 */
export function QuoteCheckout({
  cotizaApiUrl,
  januaApiUrl,
  januaPublishableKey,
}: QuoteCheckoutProps) {
  const [step, setStep] = useState<'quote' | 'checkout'>('quote');
  const [currentQuote, setCurrentQuote] = useState<InstantQuoteResult | null>(null);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('MXN');

  const handleQuoteCalculated = useCallback((quote: InstantQuoteResult, currency: Currency) => {
    setCurrentQuote(quote);
    setCurrentCurrency(currency);
  }, []);

  const handleProceedToCheckout = useCallback((quote: InstantQuoteResult, currency: Currency) => {
    setCurrentQuote(quote);
    setCurrentCurrency(currency);
    setStep('checkout');
  }, []);

  const handleBackToQuote = useCallback(() => {
    setStep('quote');
  }, []);

  return (
    <CotizaProvider
      config={{
        baseUrl: cotizaApiUrl || process.env.NEXT_PUBLIC_COTIZA_API_URL || 'https://api.cotiza.studio',
      }}
      checkoutConfig={{
        januaApiUrl: januaApiUrl || process.env.NEXT_PUBLIC_JANUA_API_URL || 'https://api.janua.dev',
        januaPublishableKey: januaPublishableKey || process.env.NEXT_PUBLIC_JANUA_PUBLISHABLE_KEY,
        successUrl: '/orders/success',
        cancelUrl: '/quote',
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {step === 'quote' ? 'Instant Quote Calculator' : 'Complete Your Order'}
        </h2>

        {step === 'quote' && (
          <QuoteForm
            onQuoteCalculated={handleQuoteCalculated}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {step === 'checkout' && currentQuote && (
          <CheckoutForm quote={currentQuote} currency={currentCurrency} onBack={handleBackToQuote} />
        )}
      </div>
    </CotizaProvider>
  );
}

export default QuoteCheckout;
