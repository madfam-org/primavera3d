import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: resolve(__dirname, '../../'),
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: ['@repo/ui', '@repo/viewer-3d'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/*'],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          // Content-Security-Policy. Lighthouse's csp-xss audit flagged the
          // absence of any CSP. The key XSS-hardening directives are
          // `object-src 'none'` (kills legacy plugin vectors) and
          // `base-uri 'none'` (blocks <base> tag injection that rewrites
          // relative URLs). script-src/style-src keep 'unsafe-inline' because
          // Next's App Router injects inline hydration scripts and styled-jsx
          // without a nonce pipeline; img/font/connect are scoped to the origins
          // the app actually uses (the two image CDNs, data/blob for canvases
          // and inlined assets). Tightening script-src to a nonce is a larger,
          // separate change (needs middleware).
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io",
            "font-src 'self' data:",
            "connect-src 'self'",
            "worker-src 'self' blob:",
            "frame-ancestors 'none'",
            "object-src 'none'",
            "base-uri 'none'",
            "form-action 'self'",
          ].join('; '),
        },
      ],
    },
  ],
};

export default nextConfig;
