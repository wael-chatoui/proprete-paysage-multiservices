# Règles de rédaction du site

Ces règles servent à tous ceux qui écrivent ou modifient un contenu dans `src/content/`. Elles visent deux publics :
- les personnes qui cherchent un élagueur ou un bûcheron dans les Landes ;
- les moteurs de recherche et les assistants IA (ChatGPT, Perplexity, Claude, Google), qui citent les pages claires, factuelles et sourcées.

## 1. Ne rien inventer

L'entreprise a été créée le 7 février 2026. C'est une entreprise individuelle sans salarié. On n'écrit donc **jamais** :
- d'avis ou de témoignages de clients ;
- de prix, de tarifs ou de fourchettes de prix attribués à l'entreprise ;
- d'années d'expérience ;
- de certifications ou de diplômes (CS élagage, Certiphyto…) ;
- d'assurance, de label ou de crédit d'impôt ;
- « devis gratuit » ;
- « notre équipe », « nos élagueurs », « nos techniciens » ;
- de matériel précis possédé par l'entreprise (nacelle, grue, tracteur forestier, porteur, broyeur…).

On peut écrire « nous » ou « l'entreprise ».

Pour décrire une méthode de travail, on reste au niveau de la situation du client (« selon l'accès et la place disponible… »). On ne promet pas une technique ou une machine.

Un fait général sur le métier ou la réglementation est permis s'il est exact et sourcé. Une affirmation sur l'entreprise ne l'est que si elle figure dans `src/data/business.ts`.

## 2. Structure d'une page

- Pas de H1 dans le corps du texte : la mise en page l'affiche à partir du champ `h1`.
- Le corps commence par un court paragraphe d'introduction, puis des sections `##`.
- **Chaque `##` est une question réelle** que se pose l'internaute (« Faut-il une autorisation pour abattre un arbre ? »).
- **La première phrase sous chaque `##` répond directement** à la question, en 1 ou 2 phrases autonomes, compréhensibles sans le reste de la page. Les détails viennent ensuite.
- Les `###` sont permis pour découper une réponse longue.
- **Tableaux** en Markdown pour les distances, les périodes et les comparaisons (« élagage ou abattage ? »).
- Chiffres toujours avec leur unité et leur source dans la phrase (« 50 m autour des constructions, selon l'arrêté préfectoral du 22 août 2025 »).
- Liens internes en chemin absolu avec la barre finale : `/elagage/`, `/secteurs/haute-lande/`, `/guides/debroussaillement-obligatoire-landes/`.
- Liens externes uniquement vers des sources officielles ou de référence : Légifrance, préfectures, service-public.fr, OFB, IGN, Enedis, CNPF, INSEE.

## 3. Ton

- Phrases courtes, voix active, vocabulaire du terrain : pin maritime, chêne pédonculé, rémanents, chablis, houppier, souche, barthes, airial, OLD.
- Aucun superlatif ni formule de vente (« leader », « expert reconnu », « qualité irréprochable », « n'hésitez pas à »).
- On écrit pour un propriétaire qui a un problème concret : un pin penché au-dessus de la maison, une mise en demeure de débroussailler, des branches chez le voisin, une parcelle à nettoyer après une tempête.

## 4. Frontmatter

Les schémas sont définis dans `src/content.config.ts`.

- `title` : 60 caractères au plus.
- `description` : entre 70 et 155 caractères.
- `dateModified` : à mettre à jour à chaque modification réelle.
- `faq` : 3 à 5 questions qui **ne répètent pas** les `##` du corps. Chaque réponse est autonome.
- `sources` : toute source citée dans le texte, avec sa date de consultation.

## 5. Les noms à utiliser

| Type | Valeurs |
|---|---|
| Prestations | `abattage-arbres`, `elagage`, `debardage`, `debroussaillage`, `entretien-espaces-verts`, `nettoyage-proprete` |
| Secteurs | `dax-tartas-adour`, `mont-de-marsan-bas-armagnac`, `haute-lande`, `cote-sud-landes`, `marensin-born`, `chalosse-tursan`, `pays-orthe-basque-interieur`, `bearn-des-gaves`, `sud-gironde` |
| Guides | `debroussaillement-obligatoire-landes`, `branches-voisin-distances-plantation`, `periode-elagage-abattage-nidification`, `elagage-ligne-electrique-enedis`, `apres-tempete-arbre-tombe-landes` |
| Photos (champ `photo` des prestations) | même valeur que le nom de la prestation |

## 6. Mettre à jour la réglementation

Le régime des obligations légales de débroussaillement (OLD) change souvent : l'arrêté des Landes a été modifié en février 2026. **Une fois par trimestre**, il faut :
1. revérifier les sources des guides ;
2. corriger le texte si besoin ;
3. mettre à jour `dateModified`.
