import type { APIRoute } from 'astro';
import { marqueSvg } from '../data/marque-svg';
export const GET: APIRoute = () => new Response(marqueSvg({ taille: 48 }), { headers: { 'Content-Type': 'image/svg+xml' } });
