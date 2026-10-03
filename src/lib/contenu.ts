import { getCollection } from 'astro:content';

const parOrdre = <T extends { data: { ordre: number } }>(a: T, b: T) => a.data.ordre - b.data.ordre;

export async function prestations() {
  return (await getCollection('prestations')).sort(parOrdre);
}

export async function secteurs() {
  return (await getCollection('secteurs')).sort(parOrdre);
}

export async function guides() {
  return (await getCollection('guides')).sort(parOrdre);
}

// Secteurs déclarés dans les données structurées : seulement ceux dont le rayon est confirmé.
export async function secteursConfirmes() {
  return (await secteurs()).filter((s) => !s.data.aConfirmer);
}

export const refs = <T extends { id: string; data: { nom: string } }>(liste: T[]) =>
  liste.map((e) => ({ slug: e.id, nom: e.data.nom }));

// Distance de la commune la plus proche et la plus éloignée d'un secteur.
export function fourchetteKm(communes: { km: number }[]) {
  const km = communes.map((c) => c.km).filter((k) => k > 0);
  return { min: Math.min(...km), max: Math.max(...km) };
}

export function dateFr(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
