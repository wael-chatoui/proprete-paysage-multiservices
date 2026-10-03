# Site de Propreté Paysage Multiservice

Site vitrine statique (Astro) d'une entreprise de travaux forestiers basée à Louer, dans les Landes. Il est conçu pour deux usages :
- le référencement local (Google, Bing) ;
- la citation par les assistants IA : ChatGPT, Perplexity, Claude, Google AI Overviews.

**Avant la mise en ligne, lire `A-COMPLETER.md`.**

## Commandes

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances. |
| `npm run dev` | Lance le site en local sur http://localhost:4321. |
| `npm run build` | Construit le site dans `dist/`, puis lance les contrôles SEO/GEO (`scripts/check-seo.mjs`). |
| `node scripts/check-content.mjs` | Vérifie le contenu Markdown : frontmatter, questions, liens, formulations interdites. |
| `npm run indexnow` | Après une mise en ligne : signale les pages à Bing et aux autres moteurs IndexNow. |

Le dossier `dist/` se dépose tel quel chez n'importe quel hébergeur statique : Netlify, Cloudflare Pages, OVH, o2switch… Aucun serveur applicatif n'est nécessaire.

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Coordonnées, SIRET, domaine, informations à compléter | `src/data/business.ts` |
| Texte d'une prestation | `src/content/prestations/<prestation>.md` |
| Texte d'un secteur | `src/content/secteurs/<secteur>.md` |
| Texte d'un guide | `src/content/guides/<guide>.md` |
| Images | `src/assets/photos/<nom>.jpg` (voir `docs/prompts-images.md`) et `src/data/photos.ts` |
| Couleurs, typographie | `src/styles/global.css` (choix expliqués dans `docs/design.md`) |
| Données structurées schema.org | `src/lib/schema.ts` |
| Règles de rédaction (à lire avant d'écrire) | `docs/redaction.md` |

## Ce qui est généré automatiquement

- **Pages** : une page par prestation, par secteur et par guide, à partir des fichiers Markdown.
- **JSON-LD** : un `@graph` par page, avec les types WebSite, HomeAndConstructionBusiness, WebPage, BreadcrumbList, Service, Place, Article et FAQPage.
- **Fichiers pour les moteurs** :
  - `sitemap-index.xml` ;
  - `robots.txt`, qui autorise explicitement les robots IA ;
  - `llms.txt` et `llms-full.txt`, deux résumés du site destinés aux assistants IA.
- **Images** :
  - images de partage (Open Graph) 1200 × 630 pour chaque page ;
  - favicon et icônes.
