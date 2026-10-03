Tu reprends un projet existant : le site vitrine de Propreté Paysage Multiservice. Il est fini, fonctionne, et vise à la fois le référencement local et la citation par les assistants IA. Ta mission : une **refonte UX/UI** (animations, couleurs, appels à l'action), confiée à un agent qui charge le skill `frontend-design`. Avant tout code, tu termines l'interrogatoire `/grill-me` commencé dans la session précédente (section 6). Tu ne codes rien tant que l'utilisateur n'a pas confirmé qu'on s'est compris.

# 1. Règles impératives

- **Parle en français.** L'utilisateur s'appelle Wael.
- **N'utilise aucun connecteur de Wael** (Canva, Google Drive, Gmail, Notion, Dropbox…). Pour tout ce qui passerait par un connecteur, par exemple générer une image, fournis le prompt ou la marche à suivre : il le fait lui-même. La recherche web, les API publiques et le navigateur intégré restent permis.
- **Avant tout téléchargement de fichier** (photo, etc.), demande l'accord explicite de Wael, en donnant le nom du fichier, la source, la taille et la licence.
- **Ne rien inventer sur l'entreprise.** Pas d'avis clients, de prix, de certifications, d'années d'expérience, d'assurance, de « devis gratuit », de « notre équipe ». L'entreprise est une entreprise individuelle sans salarié, créée le 7 février 2026. Le build échoue si ces formulations apparaissent.
- **Skills à utiliser** :
  - `grilling` : `/grill-me` ne fait qu'appeler `grilling`, installé dans `~/.claude/skills/`.
  - `frontend-design`, dans `~/.claude/skills/frontend-design/SKILL.md`. **L'agent de refonte doit le charger et suivre sa méthode en deux passes** : plan de tokens, puis relecture contre les clichés, puis code, puis autocritique sur captures d'écran.

# 2. L'entreprise (faits vérifiés)

- **Identité** :
  - Propreté Paysage Multiservice, entreprise individuelle ;
  - 704 Route des Genêts d'Or, 40380 Louer (Landes), entre Dax et Mont-de-Marsan ;
  - position GPS : 43.764319, -0.888621 ;
  - code INSEE de Louer : 40159.
- **Contact** : 06 85 57 06 75 (+33685570675), propretepaysagemultiservice@gmail.com. Le contact se fait par appel, SMS ou e-mail uniquement : **pas de formulaire**.
- **Registre** :
  - RCS Dax 100 386 564, SIRET 100 386 564 00015 ;
  - code NAF déclaré : 81.21Z, c'est-à-dire du nettoyage de bâtiments, ce qui ne correspond pas à l'activité ;
  - statut SIRENE « partiellement diffusible ».
- **Prestations** : abattage et bûcheronnage, élagage, débardage, débroussaillage et obligations légales de débroussaillement (OLD), entretien d'espaces verts, propreté et nettoyage de terrains.
- **Zone** : les Landes et les départements voisins, découpés en 9 secteurs. Le Sud Gironde n'est pas confirmé : sa page est en `noindex`.

# 3. Le projet

**Emplacement** : `/Users/wael/Documents/proprete-paysage-multiservice`. Le dossier n'est pas encore sous Git (voir Q5).

**Stack**
- Astro 7.3, sortie 100 % statique, avec `trailingSlash: 'always'` et `compressHTML: true`.
- CSS vanilla avec des variables (custom properties). Presque pas de JavaScript : un seul petit script `IntersectionObserver`, pour la carte.
- Aucun service tiers ni CDN : polices auto-hébergées, aucun cookie.
- Dépendances : `@astrojs/sitemap`, `sharp`, `satori` et `@resvg/resvg-js` pour les images Open Graph.

**Commandes**
- `npm run dev` : port 4321.
- `npm run build` : `astro build`, puis `node scripts/check-seo.mjs`.
- `npx astro preview --port 4322`.
- `node scripts/check-content.mjs` : vérifie le contenu Markdown.
- `.claude/launch.json` définit `site-dev` (4321) et `site-preview` (4322).

**Pièges connus**
- **Compilateur Rust d'Astro 7** : un HTML invalide ou une balise non fermée fait échouer la compilation.
- **Styles scopés** : ils ne s'appliquent pas aux éléments rendus par un composant enfant. Il faut `:global(...)`. Exemple déjà rencontré : les SVG d'`Icone.astro` dans la barre d'appel, restés énormes sur mobile.
- **Serveur de dev** : après l'ajout de nouveaux fichiers de contenu, il faut le redémarrer, sinon les nouvelles pages renvoient 404.
- **Polices** : elles sont réduites avec fonttools.
  - **Archivo** (`public/fonts/archivo.woff2`) ne contient que la graisse 500–900 et la largeur (`font-stretch`) 62–100 %.
  - **Literata** (`literata.woff2` et `literata-italique.woff2`) ne contient que la graisse 400–700 et la taille optique 12–36.
  - Pour une graisse ou une largeur hors de ces plages, il faut régénérer les fichiers depuis les sources variables de `node_modules/@fontsource-variable/*`. La marche à suivre :
    1. créer un environnement Python : `python3 -m venv /tmp/ftenv`, puis `/tmp/ftenv/bin/pip install fonttools brotli` ;
    2. réduire les axes avec `fonttools varLib.instancer <source> wght=…:… wdth=…:… -o x.ttf` ;
    3. réduire les caractères avec `pyftsubset x.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2009-200B,U+2010-2014,U+2018-201E,U+2022,U+2026,U+202F,U+2039-203A,U+20AC,U+2122,U+2212" --layout-features='*' --flavor=woff2`.
- **L'italique Literata pèse 56 Ko.** Ne pas l'utiliser sur l'accueil.

## Arborescence utile

**`src/data/`**
- `business.ts` : source unique des coordonnées.
  - Il contient aussi `ENTITE`, la phrase d'entité à reprendre mot pour mot partout, ainsi que `mailtoDevis()`, `smsDevis()` et `telHref`.
  - Le numéro affiché utilise des espaces insécables (` `).
  - Les champs `exploitant`, `hebergeur`, `devisGratuit`, `assurance` et `experience` valent `null` : ils sont à compléter par le client.
- `photos.ts` : manifeste des images. Le fichier est cherché sous le nom de la clé dans `src/assets/photos/`, et le champ `type` (`ia`, `stock` ou `reel`) pilote la légende.
- `carte.ts` : étiquettes de la carte, trait de côte et cours de l'Adour simplifiés.
- `indexnow.ts` : clé IndexNow.
- `marque-svg.ts` : logo en SVG.

**`src/lib/`**
- `schema.ts` : générateurs JSON-LD sous forme de `@graph` (WebSite, HomeAndConstructionBusiness avec `additionalType` Wikidata Q776268, WebPage, BreadcrumbList, Service, Place, Article, FAQPage).
- `contenu.ts` : getters des collections, `fourchetteKm`, `dateFr`, `secteursConfirmes`.

**`src/content/`**
- Trois collections Markdown : `prestations/` (6 fichiers), `secteurs/` (9), `guides/` (5).
- Leurs schémas sont dans `src/content.config.ts`.

**`src/layouts/Base.astro`** : l'en-tête HTML complet (title, meta, canonical, Open Graph, préchargement des polices, JSON-LD), ainsi que `Entete`, `Pied` et `BarreAppel`.

**`src/components/`**

| Composant | Rôle |
|---|---|
| `Entete` | Navigation, bouton d'appel ; menu `<details>` sous 68rem. |
| `Pied` | Pied de page. |
| `BarreAppel` | Barre fixe mobile Appeler / SMS / E-mail, sous 52rem. |
| `Bandeau` | En-tête vert des pages intérieures : fil d'Ariane, H1, accroche, date. |
| `EncartContact` | Encart d'appel collant dans la colonne de droite. |
| `CarteCernes` | **Élément signature** : carte SVG en cernes de 20 km autour de Louer, secteurs à leur position réelle, dessin animé une seule fois et coupé si `prefers-reduced-motion`. |
| `ListePrestations` | Liste des prestations, non des cartes ; un trait rose apparaît au survol. |
| `ListeSecteurs` | Liste des secteurs. |
| `Faq` | FAQ en `<details>`. |
| `FicheEntreprise` | Identité de l'entreprise, vérifiable. |
| `Sources` | Sources citées. |
| `Photo` | `<Picture>` en AVIF et WebP, avec un emplacement si le fichier manque. |
| `Ariane`, `Icone`, `Marque` | Fil d'Ariane, icônes, logo. |

**`src/pages/`**
- Pages : `index`, `[prestation]`, `prestations/index`, `secteurs/index` et `secteurs/[secteur]`, `guides/index` et `guides/[guide]`, `entreprise`, `contact`, `mentions-legales`, `confidentialite`, `404`.
- Points d'accès générés : `robots.txt`, `llms.txt`, `llms-full.txt`, `og/[cle].png`, `[icone].png`, `favicon.svg`, `site.webmanifest`.

**`src/styles/global.css`** : tokens, typographie, `.prose`, tableaux, et classes partagées des pages intérieures (`.page-grille`, `.page-cote`, `.page-suite`, `.page-fin`, `.liens-lies`).

**`scripts/`**
- `check-seo.mjs` (lancé par le build) contrôle :
  - title et description uniques, et de bonne longueur ;
  - un seul H1 par page, une URL canonique ;
  - JSON-LD lisible ;
  - aucun lien interne cassé, texte alternatif sur toutes les images ;
  - formulations interdites ;
  - similarité entre pages secteur sous 12 % (elle est de 1,3 % aujourd'hui).
- `check-content.mjs`, `indexnow.mjs`.

**Documentation** :
- `README.md` ;
- `A-COMPLETER.md` : ce que le client doit fournir ;
- `docs/design.md` : direction artistique et historique des versions ;
- `docs/redaction.md` : règles de rédaction ;
- `docs/prompts-images.md` : prompts des illustrations IA.

## Design actuel (à lire en entier dans `docs/design.md`)

**Couleurs**

| Variable | Valeur | Usage |
|---|---|---|
| `--pin` | `#1e3a2b` | Couleur du texte et des surfaces sombres. |
| `--pin-clair` | `#2e5642` | |
| `--sable` | `#e6dab8` | Uniquement la carte et les en-têtes de tableaux. |
| `--ecorce` | `#5e4232` | |
| `--papier` | `#ffffff` | Fond de page. |
| `--marquage` | `#ff2e7e` | Rose de peinture de marquage forestier, **uniquement pour des traits graphiques**. |
| `--texte-doux` | `#4b5f53` | |
| `--filet` | `#cfd8d1` | |

`--trait` est un SVG en data URI : un coup de pinceau rose, utilisé sous le numéro de téléphone et au survol de la navigation et des prestations.

**Typographie** : Archivo condensée (`font-stretch` de 68 à 74 %, graisse 800) pour les titres et le numéro de téléphone ; Literata pour le texte courant. Échelle 1,25 sur une base de 18 px.

**Accueil, dans l'ordre** :
1. en-tête vert : H1, phrase d'entité, numéro **géant** souligné du trait rose, liens SMS et e-mail ;
2. photo en portrait 4:5 à droite ;
3. liste des 6 prestations ;
4. « Comment se passe une demande de devis ? » en 4 étapes numérotées (une vraie séquence) ;
5. la carte en cernes et la liste des secteurs ;
6. 3 guides ;
7. la fiche d'identité de l'entreprise et la FAQ.

**Ce qu'on évite volontairement** (clichés du skill `frontend-design`) : surtitres en capitales, flèches « → » dans les boutons, séparateurs « · », cartes identiques avec ombre grise, apparitions en fondu sur chaque section, fond crème ou accent terracotta, noir teinté.

**Performance mesurée** : Lighthouse mobile 100/100/100/100 sur l'accueil, une prestation, un secteur, un guide et la page contact. LCP de 1,5 à 1,7 s, CLS 0. Le HTML est valide.

## Images

Wael a généré et déposé 6 images IA dans `src/assets/photos/` :

| Fichier | Taille | Contenu |
|---|---|---|
| `accueil.jpg` | 1536 × 1024, **paysage** | Futaie de pins maritimes, un tronc marqué d'un trait rose fluo. |
| `elagage.jpg` | 1536 × 1024 | Élagueur encordé dans un chêne près d'une maison. |
| `debardage.jpg` | 2816 × 1536 | Grumes empilées, porteur, ouvriers en orange. |
| `debroussaillage.jpg` | 2816 × 1536 | Débroussailleuse près d'une maison landaise. |
| `entretien-espaces-verts.jpg` | 2816 × 1536 | Taille de haie devant une maison à colombages. |
| `nettoyage-proprete.jpg` | 2816 × 1536 | Terrain ratissé, tas de branches, brouette. |

**À noter :**
- **Le orange fluo des équipements de protection domine toutes les photos.** C'est une donnée importante pour la palette.
- **`accueil.jpg` est en paysage, alors que l'emplacement de l'accueil est en portrait (4:5).** Le recadrage risque de couper le tronc marqué de rose.
- **`abattage-arbres.jpg` manque** : l'IA ne produit jamais une image réaliste du geste d'abattage (voir Q1).

# 4. Ce qu'il reste à faire, dans l'ordre

1. **Finir le grill-me.** Les questions Q1 à Q6 de la section 6 sont posées et attendent les réponses de Wael. Recalcule ensuite la frontière et pose la série suivante (section 7). Ne passe pas à l'action avant que Wael confirme que tout est clair.
2. **Si Wael accepte Q5** : `git init`, un `.gitignore` (déjà présent), un commit de l'état actuel (« État de référence avant refonte »), puis la branche `refonte`. Termine le message de commit par la ligne d'attribution prévue par ton environnement s'il y en a une.
3. **Image d'abattage**, selon la réponse à Q1. Pour l'option (a), fournis à Wael ce prompt :

   > Close-up of a freshly felled maritime pine stump in a Landes pine forest, south-west France: clean felling notch (face cut) and hinge wood clearly visible on the stump, fresh pale wood with resin beads, sawdust scattered on sandy ground with bracken and pine needles, the felled trunk lying behind in soft focus, a pair of orange chainsaw-protective gloves resting on the stump, low warm afternoon light. Photorealistic documentary photograph, natural daylight, muted natural colours, 35mm lens, shallow depth of field. No people, no logos, no text, no watermark.

   Format paysage, 1600 × 1200 px minimum, fichier `src/assets/photos/abattage-arbres.jpg`. Pense à ajuster l'`alt` dans `src/data/photos.ts`.
4. **Lancer l'agent de refonte**, de type general-purpose, avec un brief complet : les réponses du grill-me, cette documentation, et l'obligation de charger `frontend-design`. Il doit d'abord produire une proposition de direction (palette, CTA, animations, maquettes ASCII) si Wael a choisi Q6 (a). Tu soumets la proposition à Wael, puis l'agent code.
5. **Vérifier après la refonte** :
   - `npm run build` sans erreur, avec `check-seo` vert ;
   - `node scripts/check-content.mjs` vert ;
   - Lighthouse mobile **≥ 95 partout, idéalement 100** : `npx -y lighthouse@12 http://localhost:4322/ --chrome-flags="--headless=new" --form-factor=mobile --output=json` ;
   - captures d'écran en mobile (375 px) et en bureau (1280–1440 px) dans le navigateur intégré, sur l'accueil, une prestation, un secteur, un guide et la page contact ;
   - test des liens `tel:`, `sms:` et `mailto:` ;
   - `prefers-reduced-motion` respecté et focus clavier visible.
6. **Mettre à jour** `docs/design.md` (nouvelle version, et ce qui a changé et pourquoi), puis rendre compte à Wael.

# 5. Contraintes non négociables pour la refonte

- **Ne pas casser le SEO ni la visibilité dans les assistants IA** :
  - garder la structure des URL, un seul H1 par page, la hiérarchie des titres, la FAQ en HTML lisible (pas de contenu chargé en JavaScript), les données structurées, la phrase d'entité, les liens internes et le fil d'Ariane ;
  - ne pas toucher au contenu Markdown des collections, sauf demande de Wael.
- **Performance** :
  - aucune bibliothèque externe chargée depuis un CDN ;
  - toute bibliothèque d'animation doit être justifiée et validée par Wael (voir la série suivante du grill-me) ; par défaut, CSS et quelques lignes de JavaScript ;
  - pas de vidéo lourde ;
  - l'image principale reste prioritaire (`fetchpriority="high"`), et le CLS doit rester à 0.
- **Accessibilité** : WCAG AA, contrastes vérifiés (attention au rose `#ff2e7e` : il ne passe pas en texte normal sur blanc), cibles tactiles de 44 px minimum, animations coupées avec `prefers-reduced-motion`.
- **CTA** :
  - l'appel reste l'action principale, le SMS avec photos la secondaire, l'e-mail pré-rempli la troisième ;
  - pas de formulaire ;
  - pas de fausse urgence : ni « rappel en 5 min » ni « disponible 24h/24 », rien de non confirmé.
- **Images** : garder le pipeline `Photo.astro` et `photos.ts`, ainsi que les légendes « Illustration générée par IA ».

# 6. Questions du grill-me posées, en attente de réponse

Chaque question est suivie de la recommandation faite à Wael.

**Q1 - Image « abattage »**

L'IA échoue parce qu'elle doit montrer un geste technique : les mains, l'outil et la physique de la coupe ne sont jamais crédibles.
- (a) Changer de sujet, sans personne : gros plan d'une souche fraîche avec l'entaille et la charnière visibles, et le tronc couché derrière. Prompt en section 4.
- (b) Une vraie photo libre de droits (Wikimedia Commons, licence CC), avec le crédit affiché. On présente 2 ou 3 candidates avant tout téléchargement.
- (c) Pas de photo sur cette page : un traitement graphique à la place.

Recommandation : **(a)**, avec (b) en secours.

**Q2 - Ce qui ne plaît pas aujourd'hui**

Plusieurs réponses possibles :
- (a) trop sobre, pas assez vivant ;
- (b) les CTA ne ressortent pas assez ;
- (c) les couleurs ne collent pas aux photos ;
- (d) pas assez haut de gamme ;
- (e) autre chose de précis.

Recommandation : **(b) et (c)**. Les photos ont changé l'équilibre, et le seul bouton rempli est celui de l'en-tête.

**Q3 - Garder l'identité ou repartir de zéro ?**
- (a) Affiner l'identité actuelle : vert pin, rose de marquage (présent sur la photo d'accueil), carte en cernes, Archivo condensée et Literata.
- (b) Refonte complète.

Recommandation : **(a)**.

**Q4 - Périmètre**

Seulement l'accueil, ou tous les gabarits ?

Recommandation : **tous les gabarits**, puisque les composants et les CTA sont partagés.

**Q5 - Filet de sécurité**

`git init`, un commit de référence, puis une branche `refonte`, sans rien pousser en ligne.

Recommandation : **oui**.

**Q6 - Validation**
- (a) Proposition de direction d'abord, puis code.
- (b) Code directement, puis relecture sur captures.

Recommandation : **(a)**.

# 7. Questions prévues pour la série suivante (elles dépendent des réponses ci-dessus)

**Couleurs**
- Accorder la palette au orange fluo des équipements de protection ? Trois pistes :
  - garder le rose comme signature et ne pas utiliser d'orange ;
  - prendre l'orange comme couleur des CTA ;
  - les deux, avec des rôles distincts.
- Quel fond pour les boutons pleins ?
  - Vert pin avec texte blanc ?
  - Rose avec texte vert pin ? Le contraste est à vérifier.
  - Orange ?

**CTA**
- En-tête collant et compact au défilement sur ordinateur, avec le numéro toujours visible ?
- Bandeau d'appel au milieu des pages longues (prestations, guides) ?
- Formulation des boutons : « Appeler », « Envoyer des photos par SMS », « Écrire un e-mail ».
- Faut-il conserver le numéro géant en en-tête de l'accueil ?

**Animations**
- Quelle ambition ?
  - minimale ;
  - un temps fort au chargement de l'accueil, par exemple le trait rose qui se « peint » sous le numéro et la photo qui se dévoile, plus la carte et des micro-interactions sur les boutons ;
  - plus riche, avec défilement animé et parallaxe.
- CSS seul, ou une bibliothèque comme GSAP (environ 30 Ko) ?

**Accueil avec la photo en paysage**
- Garder la disposition en deux colonnes avec la photo en paysage ?
- Une photo pleine largeur sous le texte ?
- Ou un fond photo avec un dégradé vert ?

Dans tous les cas, garder le tronc marqué de rose visible.

**Pages intérieures** : ajouter la photo de la prestation dans l'en-tête vert, en grand, au lieu de la colonne de droite ?

**Mode sombre** : faut-il le gérer ? Recommandation : non, le site n'est pas un outil utilisé longuement.

# 8. Rappels sur le contenu (à ne pas défaire)

`A-COMPLETER.md` liste ce que le client doit encore fournir :
- le nom et prénom de l'exploitant, obligatoires dans les mentions légales ;
- l'hébergeur et le domaine (le placeholder actuel est `DOMAINE-A-DEFINIR.fr`, dans `business.ts` **et** `astro.config.mjs`) ;
- les points à confirmer : devis gratuit, dessouchage, moyens de débardage, périmètre du nettoyage, Gers, Pyrénées-Atlantiques et Sud Gironde.

Ne remplis rien de tout ça sans réponse de Wael.

Les guides réglementaires citent des sources officielles vérifiées le 2 octobre 2026 : arrêtés OLD des Landes AP 2025-1076 et AP 2026-140, Code civil 671 à 673, Code forestier L.135-2 et L.163-5, OFB, Enedis.
