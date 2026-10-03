import type { APIRoute } from 'astro';
import { business, ENTITE, SITE_URL, siretAffiche, adresseLigne } from '../data/business';
import { prestations, secteurs, guides } from '../lib/contenu';

// Texte intégral des pages de contenu, en Markdown, pour les assistants IA.
export const GET: APIRoute = async () => {
  const p = await prestations();
  const s = (await secteurs()).filter((e) => !e.data.aConfirmer);
  const g = await guides();
  const faq = (liste: { q: string; r: string }[]) =>
    liste.length ? `\n### Questions fréquentes\n\n${liste.map((f) => `**${f.q}**\n${f.r}`).join('\n\n')}\n` : '';
  const sources = (liste: { titre: string; url: string; editeur: string }[]) =>
    liste.length ? `\n### Sources\n\n${liste.map((x) => `- ${x.titre}, ${x.editeur} : ${x.url}`).join('\n')}\n` : '';

  const bloc = (chemin: string, e: { body?: string; data: any }) =>
    `---\n\n# ${e.data.h1}\n\nURL : ${SITE_URL}${chemin}\nMis à jour le ${e.data.dateModified}\n\n${e.data.accroche ?? e.data.resume ?? ''}\n\n${(e.body ?? '').trim()}\n${faq(e.data.faq)}${sources(e.data.sources)}`;

  const corps = `# ${business.nom} : texte intégral

${ENTITE}

${business.formeJuridique}, créée le 7 février 2026. ${business.rcs}. SIRET ${siretAffiche}. ${adresseLigne}. Téléphone ${business.telephone.affichage}. E-mail ${business.email}.

${p.map((e) => bloc(`/${e.id}/`, e)).join('\n')}
${s.map((e) => bloc(`/secteurs/${e.id}/`, e)).join('\n')}
${g.map((e) => bloc(`/guides/${e.id}/`, e)).join('\n')}`;
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
