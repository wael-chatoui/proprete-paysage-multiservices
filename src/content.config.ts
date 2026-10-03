import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Règles de rédaction : docs/redaction.md

const faq = z
  .array(
    z.object({
      q: z.string(),
      // Réponse autonome de 1 à 3 phrases, compréhensible sans le reste de la page.
      r: z.string(),
    }),
  )
  .default([]);

const source = z.object({
  titre: z.string(),
  url: z.url(),
  editeur: z.string(),
  // Date de consultation, AAAA-MM-JJ.
  consulte: z.string(),
});

const seo = {
  // Balise <title> : 60 caractères au plus, le nom de l'entreprise est ajouté si la place le permet.
  title: z.string().max(60),
  // Meta description : 155 caractères au plus.
  description: z.string().min(70).max(155),
  h1: z.string(),
  dateModified: z.string(),
};

const prestations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/prestations' }),
  schema: z.object({
    ...seo,
    nom: z.string(),
    ordre: z.number(),
    // Phrase de définition, réponse directe à « qu'est-ce que c'est / que faites-vous ? ».
    accroche: z.string(),
    serviceType: z.string(),
    photo: z.string(),
    guides: z.array(z.string()).default([]),
    connexes: z.array(z.string()).default([]),
    faq,
    sources: z.array(source).default([]),
  }),
});

const secteurs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/secteurs' }),
  schema: z.object({
    ...seo,
    nom: z.string(),
    ordre: z.number(),
    accroche: z.string(),
    departements: z.array(z.enum(['Landes', 'Pyrénées-Atlantiques', 'Gironde', 'Gers'])),
    // Distance routière depuis Louer, en km.
    communes: z.array(z.object({ nom: z.string(), insee: z.string(), km: z.number() })).min(4),
    // Point représentatif du secteur, pour la carte des cernes.
    centre: z.object({ lat: z.number(), lon: z.number() }),
    voisins: z.array(z.string()).default([]),
    guides: z.array(z.string()).default([]),
    // Rayon d'intervention non confirmé par le client : la page est exclue de l'index.
    aConfirmer: z.boolean().default(false),
    faq,
    sources: z.array(source).default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    ...seo,
    nom: z.string(),
    ordre: z.number(),
    datePublished: z.string(),
    // Réponse courte à la question du guide, affichée en tête.
    resume: z.string(),
    prestations: z.array(z.string()).default([]),
    secteurs: z.array(z.string()).default([]),
    faq,
    sources: z.array(source).min(2),
  }),
});

export const collections = { prestations, secteurs, guides };
