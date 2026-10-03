// Générateurs JSON-LD (schema.org). Les nœuds sont reliés par @id et regroupés
// dans un seul @graph par page (voir Base.astro).
import { business, ENTITE, SITE_URL } from '../data/business';

export const url = (chemin = '/') => new URL(chemin, SITE_URL).href;

export const ID = {
  entreprise: url('/#entreprise'),
  site: url('/#site'),
  zone: (slug: string) => url(`/secteurs/${slug}/#zone`),
  service: (slug: string) => url(`/${slug}/#service`),
};

const WIKIDATA = {
  Landes: 'https://www.wikidata.org/wiki/Q12563',
  'Pyrénées-Atlantiques': 'https://www.wikidata.org/wiki/Q12703',
  Gironde: 'https://www.wikidata.org/wiki/Q12526',
  Gers: 'https://www.wikidata.org/wiki/Q12517',
  'Nouvelle-Aquitaine': 'https://www.wikidata.org/wiki/Q18678082',
  Louer: 'https://www.wikidata.org/wiki/Q687253',
} as const;

type Ref = { slug: string; nom: string };

export function noeudEntreprise(prestations: Ref[], secteurs: Ref[]) {
  const departements = (['Landes', 'Pyrénées-Atlantiques', 'Gironde', 'Gers'] as const).map((nom) => ({
    '@type': 'AdministrativeArea',
    name: nom,
    sameAs: WIKIDATA[nom],
  }));
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ID.entreprise,
    // Wikidata « arboriste »
    additionalType: 'https://www.wikidata.org/wiki/Q776268',
    name: business.nom,
    ...(business.exploitant ? { legalName: `${business.exploitant} EI` } : {}),
    description: ENTITE,
    url: url('/'),
    logo: url('/logo.png'),
    image: url('/og/accueil.png'),
    telephone: business.telephone.international,
    email: business.email,
    foundingDate: business.dateCreation,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIRET', value: business.siret },
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: business.siren },
      { '@type': 'PropertyValue', propertyID: 'RCS', value: business.rcs },
    ],
    iso6523Code: `0009:${business.siret}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.adresse.rue,
      postalCode: business.adresse.codePostal,
      addressLocality: business.adresse.ville,
      addressRegion: business.adresse.region,
      addressCountry: business.adresse.pays,
    },
    location: {
      '@type': 'Place',
      name: business.adresse.ville,
      sameAs: WIKIDATA.Louer,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lon,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.telephone.international,
      email: business.email,
      contactType: 'customer service',
      availableLanguage: 'fr',
      areaServed: 'FR',
    },
    knowsLanguage: 'fr',
    areaServed: [...departements, ...secteurs.map((s) => ({ '@id': ID.zone(s.slug) }))],
    knowsAbout: [
      'Obligations légales de débroussaillement (OLD)',
      'Pin maritime',
      { '@type': 'Thing', name: "Abattage d'arbres", sameAs: 'https://www.wikidata.org/wiki/Q5442467' },
      { '@type': 'Thing', name: 'Débardage', sameAs: 'https://www.wikidata.org/wiki/Q1625676' },
      { '@type': 'Thing', name: 'Élagage' },
      { '@type': 'Place', name: 'Forêt des Landes', sameAs: 'https://www.wikidata.org/wiki/Q1802044' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations',
      itemListElement: prestations.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@id': ID.service(p.slug) },
      })),
    },
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function noeudSite() {
  return {
    '@type': 'WebSite',
    '@id': ID.site,
    url: url('/'),
    name: business.nom,
    inLanguage: 'fr-FR',
    publisher: { '@id': ID.entreprise },
  };
}

export function noeudPage(o: {
  chemin: string;
  titre: string;
  description: string;
  type?: string;
  dateModified?: string;
  datePublished?: string;
  image?: string;
  principal?: string;
}) {
  return {
    '@type': o.type ?? 'WebPage',
    '@id': url(o.chemin),
    url: url(o.chemin),
    name: o.titre,
    description: o.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': ID.site },
    about: { '@id': o.principal ?? ID.entreprise },
    breadcrumb: { '@id': `${url(o.chemin)}#ariane` },
    ...(o.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: o.image } } : {}),
    ...(o.datePublished ? { datePublished: o.datePublished } : {}),
    ...(o.dateModified ? { dateModified: o.dateModified } : {}),
  };
}

export function noeudService(o: { slug: string; nom: string; serviceType: string; description: string; secteurs: Ref[] }) {
  return {
    '@type': 'Service',
    '@id': ID.service(o.slug),
    name: o.nom,
    serviceType: o.serviceType,
    description: o.description,
    url: url(`/${o.slug}/`),
    provider: { '@id': ID.entreprise },
    areaServed: o.secteurs.map((s) => ({ '@id': ID.zone(s.slug) })),
  };
}

export function noeudZone(o: {
  slug: string;
  nom: string;
  departements: readonly string[];
  centre: { lat: number; lon: number };
  communes: { nom: string; insee: string }[];
}) {
  return {
    '@type': 'Place',
    '@id': ID.zone(o.slug),
    name: o.nom,
    url: url(`/secteurs/${o.slug}/`),
    geo: { '@type': 'GeoCoordinates', latitude: o.centre.lat, longitude: o.centre.lon },
    containedInPlace: o.departements.map((d) => ({
      '@type': 'AdministrativeArea',
      name: d,
      sameAs: WIKIDATA[d as keyof typeof WIKIDATA],
    })),
    containsPlace: o.communes.map((c) => ({
      '@type': 'City',
      name: c.nom,
      identifier: { '@type': 'PropertyValue', propertyID: 'INSEE', value: c.insee },
    })),
  };
}

export function noeudArticle(o: {
  chemin: string;
  titre: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: string;
  sources: { url: string }[];
}) {
  return {
    '@type': 'Article',
    '@id': `${url(o.chemin)}#article`,
    headline: o.titre,
    description: o.description,
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    inLanguage: 'fr-FR',
    image: o.image,
    mainEntityOfPage: { '@id': url(o.chemin) },
    author: { '@id': ID.entreprise },
    publisher: { '@id': ID.entreprise },
    citation: o.sources.map((s) => s.url),
  };
}

export function noeudFaq(chemin: string, faq: { q: string; r: string }[]) {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${url(chemin)}#faq`,
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
}

export type Miette = { nom: string; chemin: string };

export function noeudAriane(chemin: string, miettes: Miette[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url(chemin)}#ariane`,
    itemListElement: miettes.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nom,
      item: url(m.chemin),
    })),
  };
}
