# Images à générer : prompts

Ces images servent d'illustrations en attendant de vraies photos de chantier. Le site affiche automatiquement la mention « Illustration générée par IA » sous chacune.

## Mode d'emploi

1. Générez chaque image avec l'outil de votre choix (Midjourney, Firefly, Canva, ChatGPT…). Les prompts sont en anglais : les modèles d'image les comprennent mieux.
2. Enregistrez-la au format JPG ou WebP, avec **exactement** le nom indiqué, dans le dossier `src/assets/photos/`.
3. Relancez `npm run build`. Le site recadre, compresse et décline chaque image en AVIF et WebP à plusieurs tailles. Vous n'avez rien d'autre à faire.

Pour remplacer plus tard une illustration par une vraie photo, gardez le même nom de fichier. Dans `src/data/photos.ts`, passez ensuite `type` à `'reel'` et corrigez le texte `alt`.

## Règles communes à toutes les images

Ajoutez ce bloc à la fin de chaque prompt :

> Photorealistic documentary photograph, natural daylight, muted natural colours, shot on a 35mm lens, shallow depth of field. Workers wear full forestry safety gear: helmet with mesh visor and ear defenders, chainsaw-protective trousers, gloves, safety boots. No logos, no brand names, no text, no watermark. No one stands in a dangerous position.

**À vérifier sur chaque image avant de l'utiliser :**
- pas de geste dangereux (tronçonneuse tenue d'une main, personne sous un arbre qui tombe, grimpeur non encordé) ;
- pas de marque lisible sur le matériel ;
- pas de mains ni de visages déformés.

## Les 7 images

### 1. `accueil.jpg`, page d'accueil, format portrait 4:5 (minimum 1200 × 1500 px)

> Tall maritime pine forest in the Landes de Gascogne, south-west France, straight reddish-grey trunks with deeply plated bark, sandy ground covered with bracken and pine needles, low morning sun filtering between the trunks. One tree in the foreground carries a bright fluorescent pink paint mark on its trunk, the kind foresters use to designate trees for felling. No people.

### 2. `abattage-arbres.jpg`, format paysage 4:3 (minimum 1600 × 1200 px)

> A forestry worker felling a maritime pine in a Landes pine forest, seen from a safe distance and from the side. He holds the chainsaw with both hands at the base of the trunk, finishing the back cut, with a clean felling notch visible on the opposite side. Sawdust in the air, sandy soil, bracken.

### 3. `elagage.jpg`, format paysage 4:3

> An arborist climbing in a large oak tree next to a country house in south-west France, secured by a climbing rope and harness, with a second lanyard around the trunk. He prunes a dead branch with a small top-handle saw. View from the ground, sky visible through the foliage.

### 4. `debardage.jpg`, format paysage 4:3

> Freshly cut maritime pine logs stacked neatly at the edge of a sandy forest track in the Landes, ready for collection. Tyre tracks in the sand, a forestry forwarder parked in the background slightly out of focus. Late afternoon light.

### 5. `debroussaillage.jpg`, format paysage 4:3

> A worker clearing dense undergrowth (gorse, bracken, brambles) under maritime pines with a brush cutter, near a single-storey house at the edge of a Landes forest. The cleared strip in the foreground contrasts with the overgrown area behind.

### 6. `entretien-espaces-verts.jpg`, format paysage 4:3

> A neatly trimmed hedge and freshly mown lawn in the garden of a traditional Landes house with white walls and exposed timber frame, pine trees in the background. A gardener trims the top of the hedge with a hedge trimmer, standing on stable ground.

### 7. `nettoyage-proprete.jpg`, format paysage 4:3

> A plot of land after clearing and cleanup in the Landes: cut branches gathered into a tidy pile, raked sandy ground, a wheelbarrow and a rake, pine trees around. Calm, orderly, no people.

## Crédits

Le crédit et la licence de chaque image (si elle vient d'une banque d'images) se renseignent dans `src/data/photos.ts`. Ils apparaissent alors automatiquement dans les mentions légales.
