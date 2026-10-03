// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Domaine définitif à renseigner aussi dans src/data/business.ts (SITE_URL).
const SITE = 'https://DOMAINE-A-DEFINIR.fr';

// Secteurs dont le rayon n'est pas confirmé (aConfirmer: true) : hors index, donc hors sitemap.
const secteursHorsIndex = readdirSync('src/content/secteurs')
  .filter((f) => f.endsWith('.md') && /^aConfirmer:\s*true/m.test(readFileSync(`src/content/secteurs/${f}`, 'utf8')))
  .map((f) => `/secteurs/${f.replace(/\.md$/, '')}/`);

// Date de dernière modification de chaque page de contenu, pour le sitemap.
const dates = new Map();
for (const [dossier, prefixe] of [['prestations', '/'], ['secteurs', '/secteurs/'], ['guides', '/guides/']]) {
  for (const f of readdirSync(`src/content/${dossier}`).filter((x) => x.endsWith('.md'))) {
    const d = readFileSync(`src/content/${dossier}/${f}`, 'utf8').match(/^dateModified:\s*"?([\d-]+)"?/m)?.[1];
    if (d) dates.set(`${prefixe}${f.replace(/\.md$/, '')}/`, d);
  }
}
const derniere = [...dates.values()].sort().at(-1) ?? '2026-10-02';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  // Comportement historique : un espace est conservé entre éléments en ligne.
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !secteursHorsIndex.some((s) => page.endsWith(s)),
      serialize: (item) => {
        const chemin = new URL(item.url).pathname;
        return { ...item, lastmod: dates.get(chemin) ?? derniere };
      },
    }),
  ],
});
