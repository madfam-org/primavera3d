'use client';

import { useState, useCallback } from 'react';
import {
  CotizaProvider,
  useInstantQuote,
  formatCurrency,
  formatEstimatedTime,
  type ManufacturingProcess,
  type Material,
  type Currency,
} from '@/lib/cotiza-stub';

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

interface QuoteFormProps {
  onQuoteCalculated?: (quote: { total: number; currency: Currency }) => void;
}

function QuoteForm({ onQuoteCalculated }: QuoteFormProps) {
  const { quote, isLoading, error, calculate } = useInstantQuote();

  const [process, setProcess] = useState<ManufacturingProcess>('fdm');
  const [material, setMaterial] = useState<Material>('pla');
  const [quantity, setQuantity] = useState(1);
  const [dimensions, setDimensions] = useState({ x: 50, y: 50, z: 50 });
  const [currency, setCurrency] = useState<Currency>('USD');

  // Calculate approximate volume (simplified - actual would come from file analysis)
  const volume = dimensions.x * dimensions.y * dimensions.z;

  const handleCalculate = useCallback(async () => {
    await calculate({
      process,
      material,
      quantity,
      volume,
      currency,
    });

    if (onQuoteCalculated && quote) {
      onQuoteCalculated({ total: quote.totalPrice, currency });
    }
  }, [process, material, quantity, volume, currency, calculate, onQuoteCalculated, quote]);

  const handleProcessChange = (newProcess: ManufacturingProcess) => {
    setProcess(newProcess);
    // Reset material to first available for new process
    const availableMaterials = MATERIALS[newProcess];
    if (availableMaterials && availableMaterials.length > 0) {
      const firstMaterial = availableMaterials[0];
      if (firstMaterial) {
        setMaterial(firstMaterial.id);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Instant Quote Calculator
      </h2>

      {/* Process Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Manufacturing Process
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PROCESSES.map(p => (
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Material
        </label>
        <select
          value={material}
          onChange={e => setMaterial(e.target.value as Material)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {MATERIALS[process]?.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dimensions */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dimensions (mm)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['x', 'y', 'z'] as const).map(axis => (
            <div key={axis}>
              <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">{axis}</label>
              <input
                type="number"
                value={dimensions[axis]}
                onChange={e => setDimensions(d => ({ ...d, [axis]: Number(e.target.value) || 0 }))}
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

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quantity
        </label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          min={1}
          max={1000}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Currency */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="MXN">MXN - Mexican Peso</option>
          <option value="EUR">EUR - Euro</option>
        </select>
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
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
        </div>
      )}

      {/* Quote Result */}
      {quote && (
        <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
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

          {/* CTA */}
          <a
            href="https://cotiza.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-center transition-colors"
          >
            Start Full Quote →
          </a>
        </div>
      )}
    </div>
  );
}

interface QuoteCalculatorProps {
  cotizaApiUrl?: string;
}

/**
 * QuoteCalculator - Primavera3D integration with Cotiza Studio
 *
 * Provides instant manufacturing quotes powered by digifab-quoting.
 * Part of the MADFAM dogfooding initiative.
 */
export function QuoteCalculator({ cotizaApiUrl }: QuoteCalculatorProps) {
  return (
    <CotizaProvider
      config={{
        baseUrl:
          cotizaApiUrl || process.env.NEXT_PUBLIC_COTIZA_API_URL || 'https://api.cotiza.studio',
      }}
    >
      <QuoteForm />
    </CotizaProvider>
  );
}

export default QuoteCalculator;
