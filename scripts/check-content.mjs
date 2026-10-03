// Vérifie le frontmatter et les règles de rédaction des fichiers de contenu.
// Usage : node scripts/check-content.mjs [prestations|secteurs|guides]
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const SLUGS = {
  prestations: ['abattage-arbres', 'elagage', 'debardage', 'debroussaillage', 'entretien-espaces-verts', 'nettoyage-proprete'],
  secteurs: ['dax-tartas-adour', 'mont-de-marsan-bas-armagnac', 'haute-lande', 'cote-sud-landes', 'marensin-born', 'chalosse-tursan', 'pays-orthe-basque-interieur', 'bearn-des-gaves', 'sud-gironde'],
  guides: ['debroussaillement-obligatoire-landes', 'branches-voisin-distances-plantation', 'periode-elagage-abattage-nidification', 'elagage-ligne-electrique-enedis', 'apres-tempete-arbre-tombe-landes'],
};

// Mots qui supposent une information non confirmée par le client.
const INTERDITS = [/devis gratuit/i, /\bavis client/i, /certifi[ée]/i, /ans d'expérience/i, /notre équipe/i, /nos équipes/i, /nos élagueurs/i, /\bleader\b/i, /n'hésitez pas/i, /€/];

const collections = process.argv[2] ? [process.argv[2]] : Object.keys(SLUGS);
let erreurs = 0;
const err = (f, m) => { erreurs++; console.log(`✗ ${f} : ${m}`); };

for (const col of collections) {
  const dir = join('src/content', col);
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.md')); } catch { continue; }
  for (const f of files) {
    const raw = readFileSync(join(dir, f), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) { err(f, 'frontmatter introuvable'); continue; }
    let fm;
    try { fm = yaml.load(m[1]); } catch (e) { err(f, `YAML invalide : ${e.message}`); continue; }
    const body = m[2];
    const slug = f.replace(/\.md$/, '');
    if (!SLUGS[col].includes(slug)) err(f, `nom de fichier inattendu (${slug})`);
    for (const k of ['title', 'description', 'h1', 'dateModified', 'nom', 'ordre']) if (fm[k] === undefined) err(f, `champ manquant : ${k}`);
    if (fm.title?.length > 60) err(f, `title trop long (${fm.title.length})`);
    if (fm.description && (fm.description.length < 70 || fm.description.length > 155)) err(f, `description hors limites (${fm.description.length})`);
    if (/^#\s/m.test(body)) err(f, 'H1 interdit dans le corps');
    const h2 = body.match(/^## .+$/gm) ?? [];
    if (h2.length < 3) err(f, `trop peu de sections ## (${h2.length})`);
    for (const h of h2) if (!h.trim().endsWith('?')) err(f, `section qui n'est pas une question : ${h}`);
    for (const re of INTERDITS) if (re.test(raw)) err(f, `formulation interdite : ${re}`);
    const refs = [...(fm.guides ?? []).map((g) => ['guides', g]), ...(fm.connexes ?? []).map((g) => ['prestations', g]), ...(fm.voisins ?? []).map((g) => ['secteurs', g]), ...(fm.prestations ?? []).map((g) => ['prestations', g]), ...(fm.secteurs ?? []).map((g) => ['secteurs', g])];
    for (const [c, s] of refs) if (!SLUGS[c].includes(s)) err(f, `référence inconnue : ${c}/${s}`);
    for (const [, lien] of body.matchAll(/\]\((\/[^)]*)\)/g)) {
      const p = lien.split('#')[0];
      const ok = p === '/' || SLUGS.prestations.some((s) => p === `/${s}/`) || SLUGS.secteurs.some((s) => p === `/secteurs/${s}/`) || SLUGS.guides.some((s) => p === `/guides/${s}/`) || ['/prestations/', '/secteurs/', '/guides/', '/contact/', '/entreprise/'].includes(p);
      if (!ok) err(f, `lien interne inconnu : ${lien}`);
    }
    const mots = body.split(/\s+/).filter(Boolean).length;
    console.log(`✓ ${col}/${f} : ${mots} mots, ${h2.length} sections, ${(fm.faq ?? []).length} FAQ, ${(fm.sources ?? []).length} sources`);
  }
}
console.log(erreurs ? `\n${erreurs} erreur(s)` : '\nAucune erreur');
process.exit(erreurs ? 1 : 0);
