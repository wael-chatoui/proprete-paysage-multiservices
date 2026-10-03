// Contrôles SEO / GEO sur le site construit (dist/). Lancé automatiquement après `npm run build`.
// Erreurs = bloquant. Avertissements = à traiter avant la mise en ligne.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const erreurs = [];
const avertissements = [];
const err = (page, m) => erreurs.push(`${page} : ${m}`);
const avert = (page, m) => avertissements.push(`${page} : ${m}`);

const fichiers = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? fichiers(p) : [p];
  });

const html = fichiers(DIST).filter((f) => f.endsWith('.html'));
const chemin = (f) => '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const attr = (s, re) => s.match(re)?.[1]?.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const texte = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');

const titres = new Map();
const descriptions = new Map();
const textesSecteurs = new Map();

for (const f of html) {
  const page = chemin(f);
  const s = readFileSync(f, 'utf8');
  const est404 = page.startsWith('/404');
  const noindex = /<meta name="robots" content="noindex/.test(s);

  const titre = attr(s, /<title>([^<]*)<\/title>/);
  if (!titre) err(page, 'balise <title> absente');
  else {
    if (titre.length > 65) avert(page, `title long (${titre.length} caractères) : ${titre}`);
    if (!est404) titres.set(titre, [...(titres.get(titre) ?? []), page]);
  }

  const desc = attr(s, /<meta name="description" content="([^"]*)"/);
  if (!desc) err(page, 'meta description absente');
  else {
    if (desc.length < 70 || desc.length > 160) avert(page, `meta description de ${desc.length} caractères`);
    if (!est404) descriptions.set(desc, [...(descriptions.get(desc) ?? []), page]);
  }

  const h1 = (s.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) err(page, `${h1} balises <h1>`);

  const canon = attr(s, /<link rel="canonical" href="([^"]*)"/);
  if (!canon) err(page, 'URL canonique absente');
  else if (!est404 && !canon.endsWith(page)) err(page, `canonique incohérente : ${canon}`);

  if (!/property="og:image"/.test(s)) err(page, 'og:image absente');

  for (const [, bloc] of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(bloc);
      const types = (j['@graph'] ?? [j]).map((n) => n['@type']);
      if (!types.includes('HomeAndConstructionBusiness')) err(page, "JSON-LD sans l'entreprise");
      if (!types.includes('BreadcrumbList')) avert(page, 'JSON-LD sans fil d’Ariane');
    } catch (e) {
      err(page, `JSON-LD illisible : ${e.message}`);
    }
  }

  for (const [img] of s.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]+"/.test(img)) err(page, `image sans texte alternatif : ${img.slice(0, 80)}`);
  }

  for (const [, href] of s.matchAll(/href="(\/[^"#?]*)/g)) {
    const cible = join(DIST, href);
    const ok = existsSync(cible) && (statSync(cible).isFile() || existsSync(join(cible, 'index.html')));
    if (!ok) err(page, `lien interne cassé : ${href}`);
    else if (!href.endsWith('/') && !/\.[a-z0-9]+$/i.test(href)) avert(page, `lien sans barre finale : ${href}`);
  }

  const visible = texte(s);
  for (const re of [/devis gratuit/i, /avis clients?/i, /\bcertifi[ée]e?s?\b/i, /ans d'expérience/i, /notre équipe/i]) {
    if (re.test(visible)) err(page, `formulation non confirmée par le client : ${re}`);
  }
  if (/\[à compléter\]/i.test(visible)) avert(page, 'contient « [à compléter] »');

  if (page.startsWith('/secteurs/') && page !== '/secteurs/' && !noindex) {
    const article = s.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
    textesSecteurs.set(page, texte(article).toLowerCase());
  }
}

for (const [t, pages] of titres) if (pages.length > 1) err(pages.join(', '), `title en double : ${t}`);
for (const [d, pages] of descriptions) if (pages.length > 1) err(pages.join(', '), `description en double : ${d}`);

// Similarité entre pages secteur (fragments de 5 mots) : prévient les pages « portes d'entrée ».
const fragments = (t) => {
  const mots = t.split(' ').filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= mots.length; i++) set.add(mots.slice(i, i + 5).join(' '));
  return set;
};
const pagesS = [...textesSecteurs.keys()];
let maxSim = 0;
for (let i = 0; i < pagesS.length; i++) {
  for (let j = i + 1; j < pagesS.length; j++) {
    const a = fragments(textesSecteurs.get(pagesS[i]));
    const b = fragments(textesSecteurs.get(pagesS[j]));
    const inter = [...a].filter((x) => b.has(x)).length;
    const sim = inter / (a.size + b.size - inter || 1);
    maxSim = Math.max(maxSim, sim);
    if (sim > 0.12) err(`${pagesS[i]} / ${pagesS[j]}`, `pages secteur trop proches (${(sim * 100).toFixed(1)} %)`);
  }
}

// Fichiers machine
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!/Sitemap:/.test(robots)) err('/robots.txt', 'absent ou sans Sitemap');
for (const f of ['llms.txt', 'llms-full.txt', 'sitemap-index.xml', 'favicon.svg', 'logo.png', 'site.webmanifest']) {
  if (!existsSync(join(DIST, f))) err(`/${f}`, 'fichier absent');
}
if (/DOMAINE-A-DEFINIR/.test(robots)) avert('/robots.txt', 'le domaine définitif n’est pas renseigné (src/data/business.ts et astro.config.mjs)');

console.log(`\nContrôle SEO/GEO : ${html.length} pages HTML, similarité maximale entre secteurs ${(maxSim * 100).toFixed(1)} %`);
if (avertissements.length) {
  const uniques = [...new Set(avertissements.map((a) => a.replace(/^[^:]+ : /, '')))];
  console.log(`\n${avertissements.length} avertissement(s), à traiter avant la mise en ligne :`);
  for (const a of uniques) {
    const n = avertissements.filter((x) => x.endsWith(a)).length;
    console.log(`  ! ${a}${n > 1 ? ` (${n} pages)` : ` (${avertissements.find((x) => x.endsWith(a)).split(' : ')[0]})`}`);
  }
}
if (erreurs.length) {
  console.log(`\n${erreurs.length} erreur(s) :`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\nAucune erreur.');
