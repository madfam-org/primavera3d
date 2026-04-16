'use client';

import { useEffect } from 'react';

const messages = {
  en: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try reloading the page.',
    retry: 'Try again',
  },
  es: {
    title: 'Algo salio mal',
    description: 'Ocurrio un error inesperado. Intenta recargar la pagina.',
    retry: 'Reintentar',
  },
} as const;

function getLang(): keyof typeof messages {
  if (typeof navigator === 'undefined') return 'en';
  const tag = navigator.language?.split('-')[0];
  return tag === 'es' ? 'es' : 'en';
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang = getLang();
  const m = messages[lang];

  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang={lang}>
      <body className="flex min-h-screen items-center justify-center bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 px-4 py-8 sm:p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-2">{m.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {m.description}
          </p>
          {error?.digest && (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-4">
              {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {m.retry}
          </button>
        </div>
      </body>
    </html>
  );
}
