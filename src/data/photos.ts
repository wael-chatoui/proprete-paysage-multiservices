// Manifeste des images. Le fichier est cherché automatiquement dans src/assets/photos/
// sous le nom de la clé (ex. elagage.jpg ou elagage.webp) ; `fichier` permet un autre nom.
// Prompts de génération : docs/prompts-images.md
// Pour une vraie photo de chantier : même nom de fichier, puis `type: 'reel'` et un `alt` exact.
export type Photo = {
  fichier?: string;
  alt: string;
  type: 'reel' | 'stock' | 'ia';
  credit?: string;
  licence?: { nom: string; url: string };
  source?: string;
};

export const photos: Record<string, Photo> = {
  accueil: { alt: 'Futaie de pins maritimes dans la forêt des Landes, un tronc marqué de peinture rose', type: 'ia' },
  'abattage-arbres': {
    alt: "Vérification de l'orientation du cran de chute lors d'un chantier d'abattage",
    type: 'stock',
    credit: 'Moinats / Wikimedia Commons',
    licence: { nom: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' },
    source: 'https://commons.wikimedia.org/wiki/File:V%C3%A9rification_orientation_cran_de_chute.jpg',
  },
  elagage: { alt: 'Élagueur encordé dans un chêne, casque et équipements de protection', type: 'ia' },
  debardage: { alt: 'Grumes de pin maritime empilées en bord de piste forestière', type: 'ia' },
  debroussaillage: { alt: 'Sous-bois débroussaillé autour de pins maritimes', type: 'ia' },
  'entretien-espaces-verts': { alt: 'Haie taillée et pelouse tondue dans un jardin landais', type: 'ia' },
  'nettoyage-proprete': { alt: 'Terrain nettoyé, branches ramassées en tas', type: 'ia' },
};
