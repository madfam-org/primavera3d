'use client';

import { useEffect } from 'react';

const messages = {
  en: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    retry: 'Try again',
    home: 'Go home',
  },
  es: {
    title: 'Algo salio mal',
    description: 'Ocurrio un error inesperado. Intenta de nuevo.',
    retry: 'Reintentar',
    home: 'Ir al inicio',
  },
} as const;

function getLang(): keyof typeof messages {
  if (typeof navigator === 'undefined') return 'en';
  const tag = navigator.language?.split('-')[0];
  return tag === 'es' ? 'es' : 'en';
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang = getLang();
  const m = messages[lang];

  useEffect(() => {
    console.error('[RouteError]', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
          <span className="text-lg font-bold text-red-600 dark:text-red-400" aria-hidden="true">!</span>
        </div>
        <h2 className="mt-4 text-lg font-semibold">{m.title}</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {error.message || m.description}
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 font-mono">
            {error.digest}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {m.retry}
          </button>
          <a
            href="/"
            className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {m.home}
          </a>
        </div>
      </div>
    </div>
  );
}
