# Direction artistique

Notes de conception, rédigées en suivant le skill `frontend-design`.

## Le brief

- **Sujet** : les travaux forestiers dans la forêt landaise (abattage, élagage, débardage, débroussaillage OLD), autour de Louer, entre Dax et Mont-de-Marsan.
- **Public** :
  - propriétaires de maisons sous les pins ;
  - résidences secondaires de la côte ;
  - propriétaires forestiers ;
  - mairies.

  Ce public est souvent sur mobile, souvent pressé : un pin penché, une mise en demeure OLD.
- **Rôle du site** : faire appeler, et être cité par les moteurs et les assistants IA.

## Première passe

- **Couleurs** :
  - Vert pin `#1E3A2B`
  - Sable landais `#E6DAB8`
  - Écorce `#5E4232`
  - Blanc `#FFFFFF`
  - Rose marquage `#FF2E7E`
- **Typographie** : Archivo, avec un axe de largeur variable. On l'utilise condensé (`font-stretch` 70–75 %) et en graisse forte pour les titres et le numéro de téléphone. Literata, avec un axe de taille optique, pour le texte courant.
- **Mise en page** : tout est aligné à gauche, avec une colonne de lecture de 66 caractères environ. Les surfaces vert pin servent à l'en-tête de page et au pied de page ; le reste est blanc. Le sable est réservé à la carte et aux tableaux.

```
┌──────────────────────────────────────────────────────────────┐
│ ◎ Propreté Paysage Multiservice      Prestations Secteurs …  [06 85…] │
├──────────────────────────────────────────────────────────────┤
│ H1 condensé blanc sur vert pin                 │  photo pins     │
│ phrase d'entité                                │  (illustration) │
│ 06 85 57 06 75  ← très grand, trait rose dessous │                 │
│ SMS avec photos · e-mail                       │                 │
├──────────────────────────────────────────────────────────────┤
│ Prestations en liste (pas en cartes) : nom condensé + une phrase │
│ Déroulé d'une demande : 4 étapes numérotées (vraie séquence)   │
│ Carte en cernes autour de Louer  │  liste des 9 secteurs + km  │
│ Guides (réglementation)                                         │
│ Fiche entreprise (SIRET, RCS, adresse) · FAQ                   │
└──────────────────────────────────────────────────────────────┘
```

## Deuxième passe : relecture contre les clichés

**Test du site d'élagueur générique.** Si on demande « un site d'élagueur » sans autre précision, on obtient en général :
- un vert forêt avec du beige ;
- un accent orange ;
- une photo plein écran avec un voile sombre ;
- trois cartes à icônes ;
- des chiffres (« 500 chantiers ») ;
- des témoignages en carrousel.

**Corrections apportées :**
- **Le vert pin est gardé** parce qu'il nomme le métier. En revanche, l'accent n'est pas orange : c'est le **rose de marquage forestier**, la peinture que le forestier pose sur un tronc pour le désigner à l'abattage. Il ne sert qu'aux traits graphiques. On ne l'utilise jamais pour du texte ni pour remplir des boutons.
- **Le beige comme fond général est abandonné.** Le fond est blanc, et le sable (jaune, pas crème) ne sert qu'à la carte et aux en-têtes de tableaux.
- **Le texte est vert pin**, pas un noir teinté.
- **Pas de chiffres ni de témoignages** : l'entreprise est récente et on n'invente rien. La preuve vient de la fiche d'identité (SIRET, RCS, adresse) et des sources officielles citées.
- **Les prestations sont présentées en liste**, pas en cartes. Au survol ou au focus, un trait rose « marque » la ligne. C'est un mouvement déclenché par l'utilisateur et lié au métier.
- **Pas de surtitre en capitales, pas de « → »** dans les boutons, pas de séparateur « · » dans les métadonnées. La numérotation est réservée au déroulé d'une demande, qui est une vraie séquence.

**L'élément mémorable** : la carte de la zone d'intervention dessinée comme les **cernes d'un tronc** dont le cœur est Louer. Chaque cerne vaut 20 km. Les 9 secteurs sont placés à leur position réelle. C'est la seule animation non déclenchée par l'utilisateur : les cernes se dessinent une fois, et l'animation est coupée avec `prefers-reduced-motion`.

**Le second appel visuel** : le numéro de téléphone en très grand, avec le trait rose dessous. Sur mobile, une barre fixe en bas propose « Appeler », « SMS » et « E-mail ».

## Historique des essais

- v1 (2 octobre 2026) : tokens ci-dessus.
- v2 (2 octobre 2026), après relecture sur captures d'écran :
  - **Carte** : échelle portée à 4,2 unités par km et cadre resserré. Les secteurs sont presque tous à moins de 60 km à vol d'oiseau, et les étiquettes étaient illisibles (environ 9 px). Elles sont passées à 22 unités, et l'étiquette du Pays d'Orthe est placée sous son point.
  - **Mobile** : les icônes de la barre d'appel étaient démesurées. Le style était limité au composant parent : il passe en `:global(svg)`. L'emplacement photo de l'accueil est masqué tant qu'aucune image n'est déposée.
  - **Liste des prestations** : la fin d'accroche « dans les Landes et les départements voisins, depuis Louer » est retirée, car elle se répétait à chaque ligne. La phrase complète reste sur les pages de prestation et dans les données structurées.
- v3 (2 octobre 2026), performance :
  - **Polices** : réduites avec fonttools (`varLib.instancer` puis `pyftsubset`) aux plages réellement utilisées : Archivo en graisse 500–900 et largeur 62–100 %, Literata en graisse 400–700 et taille optique 12–36. Seuls les caractères du français sont conservés. Archivo passe de 90 à 55 Ko, Literata de 110 à 54 Ko.
  - L'italique n'est plus chargé sur l'accueil : les légendes de la carte sont en Archivo droit.
