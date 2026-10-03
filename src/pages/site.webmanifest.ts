import type { APIRoute } from 'astro';
import { business } from '../data/business';
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: business.nom,
      short_name: 'PPM Louer',
      lang: 'fr-FR',
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#1e3a2b',
      icons: [
        { src: '/icone-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icone-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
