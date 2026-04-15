'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CotizaProvider,
  useCheckoutResult,
  formatCurrency,
  formatPaymentMethod,
  PAYMENT_METHOD_ICONS,
} from '@/lib/cotiza-stub';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { result, fetchResult, isLoading, error } = useCheckoutResult();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (sessionId && !hasFetched) {
      fetchResult(sessionId);
      setHasFetched(true);
    }
  }, [sessionId, fetchResult, hasFetched]);

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Confirming your payment...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
        <Link
          href="/quote"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Try Again
        </Link>
      </div>
    );
  }

  // Pending payment (OXXO/SPEI)
  if (result?.status === 'pending') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Pending
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Your order has been created. Please complete the payment using the instructions below.
        </p>

        {result.paymentMethod === 'oxxo' && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6 max-w-md mx-auto mb-6">
            <div className="text-4xl mb-3">🏪</div>
            <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
              Pay at OXXO
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Visit any OXXO store and show the voucher to complete your payment. You have 24 hours
              to pay.
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-500 mt-3">
              A voucher with payment instructions has been sent to your email.
            </p>
          </div>
        )}

        {result.paymentMethod === 'spei' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md mx-auto mb-6">
            <div className="text-4xl mb-3">🏦</div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Pay via SPEI
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Complete the bank transfer using your bank's app or website. Use the CLABE provided
              in your email.
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-500 mt-3">
              Payment instructions have been sent to your email.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/quote"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
          >
            Create Another Quote
          </Link>
        </div>
      </div>
    );
  }

  // Failed payment
  if (result?.status === 'failed' || result?.status === 'canceled') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {result.error || 'Your payment could not be processed. Please try again.'}
        </p>
        <Link
          href="/quote"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Try Again
        </Link>
      </div>
    );
  }

  // Success state
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Order Confirmed!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for your order. We've received your payment and will begin processing your parts
        shortly.
      </p>

      {/* Order Details */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 max-w-md mx-auto mb-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Details</h3>
        <div className="space-y-3 text-sm">
          {result?.orderId && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Order ID</span>
              <span className="font-mono text-gray-900 dark:text-white">{result.orderId}</span>
            </div>
          )}
          {result?.paymentMethod && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
              <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                <span>{PAYMENT_METHOD_ICONS[result.paymentMethod] || '💳'}</span>
                <span>{formatPaymentMethod(result.paymentMethod)}</span>
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <span className="text-green-600 dark:text-green-400 font-medium">Paid</span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md mx-auto mb-8">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">What's Next?</h3>
        <ol className="text-left text-sm text-blue-700 dark:text-blue-400 space-y-2">
          <li className="flex gap-2">
            <span>1.</span>
            <span>You'll receive a confirmation email with your order details</span>
          </li>
          <li className="flex gap-2">
            <span>2.</span>
            <span>Our team will review your order and begin production</span>
          </li>
          <li className="flex gap-2">
            <span>3.</span>
            <span>We'll notify you when your parts are ready for shipping</span>
          </li>
          <li className="flex gap-2">
            <span>4.</span>
            <span>Track your order via the link in your email</span>
          </li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/quote"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
        >
          Create Another Quote
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
          <CotizaProvider
            config={{
              baseUrl: process.env.NEXT_PUBLIC_COTIZA_API_URL || 'https://api.cotiza.studio',
            }}
            checkoutConfig={{
              januaApiUrl: process.env.NEXT_PUBLIC_JANUA_API_URL || 'https://api.janua.dev',
              januaPublishableKey: process.env.NEXT_PUBLIC_JANUA_PUBLISHABLE_KEY,
            }}
          >
            <OrderSuccessContent />
          </CotizaProvider>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Need help?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
