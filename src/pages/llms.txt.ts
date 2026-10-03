import type { APIRoute } from 'astro';
import { business, ENTITE, SITE_URL, siretAffiche } from '../data/business';
import { prestations, secteurs, guides, fourchetteKm } from '../lib/contenu';

// Résumé du site pour les assistants IA (format llmstxt.org).
export const GET: APIRoute = async () => {
  const p = await prestations();
  const s = await secteurs();
  const g = await guides();
  const maj = [...p, ...s, ...g].map((e) => e.data.dateModified).sort().at(-1) ?? business.dateCreation;
  const lien = (chemin: string) => `${SITE_URL}${chemin}`;

  const corps = `# ${business.nom}

> ${ENTITE}

- Entreprise individuelle créée le 7 février 2026, immatriculée au ${business.rcs}, SIRET ${siretAffiche}.
- Adresse : ${business.adresse.rue}, ${business.adresse.codePostal} ${business.adresse.ville} (Landes, Nouvelle-Aquitaine, France).
- Contact : appel ou SMS au ${business.telephone.affichage} (${business.telephone.international}), e-mail ${business.email}. Pas de formulaire en ligne.
- Le site ne publie ni tarifs, ni avis clients, ni certifications : ces informations sont à demander directement à l'entreprise.
- Les guides citent leurs sources officielles (Légifrance, préfectures, service-public.fr, OFB, IGN, Enedis).
- Dernière mise à jour du contenu : ${maj}.

## Prestations

${p.map((e) => `- [${e.data.nom}](${lien(`/${e.id}/`)}): ${e.data.accroche}`).join('\n')}

## Zone d'intervention

${s
  .filter((e) => !e.data.aConfirmer)
  .map((e) => {
    const { min, max } = fourchetteKm(e.data.communes);
    return `- [${e.data.nom}](${lien(`/secteurs/${e.id}/`)}): ${min} à ${max} km de Louer par la route. Communes : ${e.data.communes.map((c) => c.nom).join(', ')}.`;
  })
  .join('\n')}

## Guides

${g.map((e) => `- [${e.data.h1}](${lien(`/guides/${e.id}/`)}): ${e.data.resume}`).join('\n')}

## Optional

- [L'entreprise](${lien('/entreprise/')})
- [Contact](${lien('/contact/')})
- [Mentions légales](${lien('/mentions-legales/')})
- [Texte intégral du site](${lien('/llms-full.txt')})
`;
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
