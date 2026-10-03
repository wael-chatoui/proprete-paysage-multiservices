import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { business } from '../../data/business';
import { prestations, secteurs, guides } from '../../lib/contenu';

// Images Open Graph (1200 × 630) générées au build pour chaque page.
const police = (fichier: string) => readFileSync(`node_modules/@fontsource/${fichier}`);
const polices = [
  { name: 'Archivo', data: police('archivo/files/archivo-latin-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
  { name: 'Archivo', data: police('archivo/files/archivo-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

export async function getStaticPaths() {
  const p = await prestations();
  const s = await secteurs();
  const g = await guides();
  const fixes = [
    { cle: 'accueil', titre: 'Abattage, élagage et débroussaillage autour de Dax et Mont-de-Marsan' },
    { cle: 'prestations', titre: 'Abattage, élagage, débardage, débroussaillage, espaces verts' },
    { cle: 'secteurs', titre: "Zone d'intervention : Landes et départements voisins" },
    { cle: 'guides', titre: 'Guides pratiques : arbres, débroussaillement, voisinage' },
    { cle: 'entreprise', titre: 'Travaux forestiers à Louer, dans les Landes' },
    { cle: 'contact', titre: 'Appel, SMS ou e-mail : photos bienvenues' },
  ];
  return [
    ...fixes,
    ...p.map((e) => ({ cle: e.id, titre: e.data.h1 })),
    ...s.map((e) => ({ cle: `secteur-${e.id}`, titre: e.data.h1 })),
    ...g.map((e) => ({ cle: `guide-${e.id}`, titre: e.data.h1 })),
  ].map(({ cle, titre }) => ({ params: { cle }, props: { titre } }));
}

const cernes = (() => {
  const anneaux = [40, 90, 150, 220, 300, 390]
    .map((r, i) => `<circle cx="0" cy="0" r="${r}" fill="none" stroke="#ffffff" stroke-opacity="${0.16 - i * 0.015}" stroke-width="${i % 2 ? 1.5 : 3}"/>`)
    .join('');
  return `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="-400 -400 800 800">${anneaux}</svg>`).toString('base64')}`;
})();

const trait = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 40" width="400" height="40" preserveAspectRatio="none"><path fill="#ff2e7e" d="M4 17c9-6 22-9 41-9 30-1 61 2 92 0 33-2 66-4 99-3 31 1 62 3 93 2 20-1 41-3 62 0 5 1 8 6 5 10-2 3 2 6-1 9-4 5-12 4-19 5-28 2-56 1-84 3-35 2-70 3-105 2-31-1-62 2-93 1-23-1-47 1-68-2-8-1-17-3-20-8-2-4 0-7-2-10z"/></svg>`,
).toString('base64')}`;

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const titre = props.titre as string;
  const taille = titre.length > 70 ? 62 : titre.length > 45 ? 72 : 84;
  const arbre = el(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#1e3a2b', color: '#ffffff', fontFamily: 'Archivo', position: 'relative' },
    [
      { type: 'img', props: { src: cernes, width: 800, height: 800, style: { position: 'absolute', right: -260, top: -170 } } },
      el('div', { display: 'flex', fontSize: 28, fontWeight: 600, color: '#e6dab8' }, `${business.nom}, Louer (Landes)`),
      el('div', { display: 'flex', fontSize: taille, fontWeight: 800, lineHeight: 1.04, maxWidth: 960, letterSpacing: -1 }, titre),
      el('div', { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }, [
        el('div', { display: 'flex', flexDirection: 'column', position: 'relative' }, [
          el('div', { display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: 1 }, business.telephone.affichage),
          { type: 'img', props: { src: trait, width: 420, height: 18, style: { marginTop: 4 } } },
        ]),
        el('div', { display: 'flex', fontSize: 26, fontWeight: 600, color: '#e6dab8' }, 'Appel, SMS ou e-mail'),
      ]),
    ],
  );
  const svg = await satori(arbre as any, { width: 1200, height: 630, fonts: polices });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
