// Source unique des informations sur l'entreprise.
// Tout ce qui est marqué A_COMPLETER est listé dans A-COMPLETER.md : rien n'est inventé.

export const A_COMPLETER = null;

export const SITE_URL = 'https://DOMAINE-A-DEFINIR.fr';

export const business = {
  nom: 'Propreté Paysage Multiservice',
  // Nom et prénom de l'exploitant : obligatoires dans les mentions légales d'une EI (LCEN).
  exploitant: A_COMPLETER as string | null,
  formeJuridique: 'Entreprise individuelle (EI)',
  dateCreation: '2026-02-07',
  siren: '100386564',
  siret: '10038656400015',
  rcs: 'RCS Dax 100 386 564',
  adresse: {
    rue: "704 Route des Genêts d'Or",
    codePostal: '40380',
    ville: 'Louer',
    departement: 'Landes',
    region: 'Nouvelle-Aquitaine',
    pays: 'FR',
    insee: '40159',
  },
  // Géocodage api-adresse.data.gouv.fr (score 0,946, type housenumber), 2 octobre 2026.
  geo: { lat: 43.764319, lon: -0.888621 },
  telephone: {
    affichage: '06\u00a085\u00a057\u00a006\u00a075',
    international: '+33685570675',
  },
  email: 'propretepaysagemultiservice@gmail.com',
  // Liens vers les profils publics (Google Business Profile, etc.) quand ils existeront.
  sameAs: [] as string[],
  // Informations commerciales non confirmées : laissées vides tant que le client ne les a pas validées.
  devisGratuit: A_COMPLETER as boolean | null,
  assurance: A_COMPLETER as string | null,
  experience: A_COMPLETER as string | null,
  hebergeur: A_COMPLETER as { nom: string; adresse: string; telephone: string } | null,
} as const;

// Phrase d'entité : reprise mot pour mot sur l'accueil, la page entreprise, le pied de page,
// llms.txt et la description du schema.org. Ne pas la reformuler ailleurs.
export const ENTITE =
  "Propreté Paysage Multiservice est une entreprise individuelle de travaux forestiers et d'entretien d'espaces verts basée à Louer, dans les Landes (40380), entre Dax et Mont-de-Marsan : abattage, élagage, débardage, débroussaillage, entretien de jardins et nettoyage de terrains.";

export const ENTITE_COURTE =
  'Abattage, élagage, débardage et débroussaillage dans les Landes, depuis Louer, entre Dax et Mont-de-Marsan.';

export const adresseLigne = `${business.adresse.rue}, ${business.adresse.codePostal} ${business.adresse.ville}`;

export const siretAffiche = '100 386 564 00015';

export const dateCreationAffichee = '7 février 2026';

// Modèle de demande de devis par e-mail : pré-remplit l'objet et le corps du message.
export function mailtoDevis(prestation?: string) {
  const sujet = prestation ? `Demande de devis : ${prestation}` : 'Demande de devis';
  const corps = [
    'Bonjour,',
    '',
    `Je souhaite un devis${prestation ? ` pour : ${prestation}` : ''}.`,
    '',
    'Commune du chantier :',
    "Type et nombre d'arbres ou surface :",
    'Accès (portail, pente, ligne électrique à proximité) :',
    'Délai souhaité :',
    '',
    'Je peux joindre des photos à ce message.',
    '',
    'Mon numéro de téléphone :',
  ].join('\n');
  return `mailto:${business.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

export function smsDevis(prestation?: string) {
  const corps = `Bonjour, je souhaite un devis${prestation ? ` (${prestation.toLowerCase()})` : ''}. Commune : `;
  return `sms:${business.telephone.international}?&body=${encodeURIComponent(corps)}`;
}

export const telHref = `tel:${business.telephone.international}`;
