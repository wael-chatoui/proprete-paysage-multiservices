# À compléter avant la mise en ligne

Le site ne publie rien qui n'ait été vérifié. Les informations ci-dessous manquent ou doivent être confirmées par l'entreprise. Le contrôle `npm run build` signale aussi les « [à compléter] » encore présents.

## 1. Obligatoire (bloquant)

- [ ] **Nom et prénom de l'exploitant de l'EI.** La loi (LCEN, art. 1-1) impose de les publier dans les mentions légales. Ils servent aussi de directeur de la publication. À renseigner dans `src/data/business.ts`, champ `exploitant`.
- [ ] **Hébergeur** : nom, adresse et téléphone. Champ `hebergeur` de `src/data/business.ts`.
- [ ] **Nom de domaine définitif.** À remplacer dans `src/data/business.ts` (`SITE_URL`) **et** dans `astro.config.mjs` (`SITE`). Le placeholder actuel est `DOMAINE-A-DEFINIR.fr`.

## 2. À confirmer par l'entreprise (texte déjà rédigé de façon prudente)

**Accueil, « Comment se passe une demande de devis ? »**
- [ ] Les photos par SMS ou e-mail sont-elles acceptées ?
- [ ] Un passage sur place a-t-il lieu quand la situation l'exige ?
- [ ] Le devis écrit précise-t-il ce que deviennent le bois et les déchets verts ?
- [ ] Le devis est-il gratuit ? Si oui : `devisGratuit: true` dans `business.ts`, et on pourra l'afficher. Aujourd'hui, la mention est interdite par le contrôle.

**Abattage**
- [ ] Débit du bois en bûches ou en billons ?
- [ ] Dessouchage ou rognage de souche proposé ?
- [ ] Évacuation du bois ?

**Élagage**
- [ ] Grimpe encordée pratiquée, ou travail depuis le sol ou une nacelle ? La page cite le mot-clé « élagueur grimpeur » sans l'affirmer.

**Débardage**
- [ ] Avec quels moyens (tracteur, porteur, débusqueur…) et jusqu'où les bois sont-ils amenés ?
- [ ] Que deviennent les rémanents : broyés, mis en andains ou évacués ?

**Débroussaillage et entretien**
- [ ] Broyage sur place ou évacuation ?
- [ ] Passages réguliers (contrat d'entretien) ou seulement ponctuels ?
- [ ] Gestion des résidences secondaires en l'absence du propriétaire (clé, code de portail) ?

**Nettoyage et propreté**
- [ ] Périmètre exact : uniquement l'extérieur, ou aussi des locaux (le code NAF déclaré, 81.21Z, désigne le nettoyage de bâtiments) ?
- [ ] Déchets verts emportés en déchèterie ?
- [ ] Prise en charge des encombrants, gravats et ferraille ?

**Zone d'intervention**
- [ ] Le Sud Gironde (Captieux, Bazas, Langon : 110 à 130 km) fait-il vraiment partie de la zone ? La page est en ligne mais **exclue de l'index** (`aConfirmer: true`) tant que ce n'est pas confirmé.
- [ ] Ouest du Gers (Nogaro, Cazaubon, Eauze, 87 à 98 km) : à confirmer.
- [ ] Pyrénées-Atlantiques (Orthez, Salies-de-Béarn, Bayonne, Hasparren, Cambo-les-Bains jusqu'à 92 km) : à confirmer.
- [ ] Navarrenx (64 km) a été ajoutée au secteur Béarn des Gaves : à valider.

**À afficher seulement si c'est vrai, avec justificatif**
- [ ] Assurance RC Pro (`assurance`).
- [ ] Expérience antérieure à la création de l'EI (`experience`).
- [ ] Certifications : CS taille et soins aux arbres, Certiphyto, etc.
- [ ] Statut d'entrepreneur de travaux forestiers (ETF) auprès de la MSA.

## 3. Photos

Les prompts des 7 illustrations et la marche à suivre sont dans `docs/prompts-images.md`. Il suffit de déposer les fichiers dans `src/assets/photos/` avec le bon nom.

Dès que possible, remplacez-les par de **vraies photos de chantier**, qui inspirent plus confiance et pèsent davantage dans le référencement local.

## 4. Hors site : à faire pour le référencement local et les assistants IA

- [ ] **Fiche Google Business Profile.**
  - Catégorie principale « Élagueur » ou « Service d'abattage d'arbres ».
  - Adresse masquée, puisque c'est un domicile.
  - Zones desservies : jusqu'à 20.
  - Nom, adresse et téléphone **identiques** au site.
- [ ] **Bing Places** (Bing alimente la recherche de ChatGPT), puis **Apple Business Connect**.
- [ ] **Google Search Console** et **Bing Webmaster Tools** : y déclarer `sitemap-index.xml`.
- [ ] Après chaque mise en ligne : `npm run indexnow`.
- [ ] **Code NAF** : 81.21Z (nettoyage de bâtiments) ne correspond pas à l'activité forestière. Une modification d'activité via le guichet unique (02.40Z, ou 81.30Z pour l'aménagement paysager) mettrait en cohérence les annuaires et les assistants IA.
- [ ] **Statut SIRENE « partiellement diffusible »** : le nom commercial n'est pas public dans les registres. Le rendre diffusible (démarche auprès de l'INSEE) permettrait aux annuaires de relier l'entreprise à son SIRET.
- [ ] Adresse e-mail sur le domaine (ex. `contact@<domaine>`) une fois le domaine acheté.
- [ ] **Hébergement chez Cloudflare** : désactiver le blocage par défaut des robots IA (Security > Bots), sinon ChatGPT, Claude et Perplexity ne pourront pas lire le site.

## 5. Entretien du contenu

- Revoir les guides réglementaires **chaque trimestre** : les obligations de débroussaillement (OLD) changent souvent. La marche à suivre est dans `docs/redaction.md`.
- **Haies** : le décret n° 2026-829 du 28 août 2026 (article R.412-51 du Code de l'environnement) prévoit une période d'interdiction de taille fixée par arrêté préfectoral. Dès que l'arrêté des Landes est publié, compléter le guide « Quand élaguer ou abattre un arbre ? ».
- **Code forestier** : l'article L.163-5 est indiqué « en vigueur jusqu'au 1er janvier 2029 » ; vérifier la version suivante à cette date.
- **Arrêtés OLD de la Gironde et des Pyrénées-Atlantiques** : leurs PDF sont scannés, sans texte. Les relire en cas de modification.
- **Article 750-1 du Code de procédure civile** (tentative amiable avant d'aller au tribunal) : à surveiller après la réforme de la procédure amiable de 2025.
