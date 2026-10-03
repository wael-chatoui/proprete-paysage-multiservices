import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { marqueSvg } from '../data/marque-svg';

// Icônes PNG dérivées de la marque : favicon, iOS, manifeste, logo du schema.org.
const TAILLES: Record<string, number> = {
  'favicon-32': 32,
  'apple-touch-icon': 180,
  'icone-192': 192,
  'icone-512': 512,
  logo: 512,
};

export function getStaticPaths() {
  return Object.keys(TAILLES).map((icone) => ({ params: { icone } }));
}

export const GET: APIRoute = async ({ params }) => {
  const taille = TAILLES[params.icone as string];
  const png = await sharp(Buffer.from(marqueSvg({ taille }))).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
