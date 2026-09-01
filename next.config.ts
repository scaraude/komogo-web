import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'macbook-pro-de-ludovic.angora-hadar.ts.net',
    'scaraude-g3.angora-hadar.ts.net',
  ],
  async redirects() {
    return [
      {
        // L'apex redirige vers www, sauf /.well-known : Google refuse de
        // suivre une redirection pour assetlinks.json, donc les App Links
        // sur komogo.fr sans www ne seraient jamais vérifiés.
        source: '/:path((?!\\.well-known\\/).*)',
        has: [{ type: 'host', value: 'komogo.fr' }],
        destination: 'https://www.komogo.fr/:path',
        permanent: true,
      },
      // Écrans de l'ancienne web app : les favoris et anciens liens
      // aboutissent sur la passerelle plutôt qu'en 404.
      { source: '/mes-komos', destination: '/', permanent: true },
      { source: '/connexion', destination: '/', permanent: true },
      { source: '/e/:slug/join', destination: '/e/:slug', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Le service worker ne doit jamais être mis en cache : les users
        // récupèrent toujours la dernière version (cf. guide PWA Next.js).
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
