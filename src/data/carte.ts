// Mise en page de la carte en cernes : étiquettes courtes et position (g : à gauche, d : à droite, b : dessous).
export const etiquettes: Record<string, { court: string; cote: 'g' | 'd' | 'b'; dy?: number }> = {
  'dax-tartas-adour': { court: 'Dax, Tartas', cote: 'g', dy: -6 },
  'mont-de-marsan-bas-armagnac': { court: 'Mont-de-Marsan', cote: 'd' },
  'haute-lande': { court: 'Haute-Lande', cote: 'd' },
  'cote-sud-landes': { court: 'Côte sud', cote: 'd', dy: 4 },
  'marensin-born': { court: 'Marensin, Born', cote: 'd' },
  'chalosse-tursan': { court: 'Chalosse, Tursan', cote: 'd' },
  'pays-orthe-basque-interieur': { court: 'Orthe, Pays basque', cote: 'b' },
  'bearn-des-gaves': { court: 'Béarn des Gaves', cote: 'd' },
  'sud-gironde': { court: 'Sud Gironde', cote: 'g' },
};

// Trait de côte simplifié (lat, lon), d'Arcachon à Hendaye.
export const cote: [number, number][] = [
  [44.66, -1.25],
  [44.55, -1.25],
  [44.45, -1.26],
  [44.33, -1.29],
  [44.21, -1.30],
  [44.09, -1.33],
  [43.95, -1.37],
  [43.85, -1.40],
  [43.73, -1.43],
  [43.64, -1.45],
  [43.55, -1.49],
  [43.49, -1.54],
  [43.45, -1.57],
  [43.39, -1.66],
  [43.37, -1.79],
];

// Cours de l'Adour simplifié, d'Aire-sur-l'Adour à l'embouchure.
export const adour: [number, number][] = [
  [43.70, -0.26],
  [43.77, -0.43],
  [43.76, -0.57],
  [43.75, -0.75],
  [43.78, -0.9],
  [43.72, -1.05],
  [43.67, -1.18],
  [43.58, -1.22],
  [43.52, -1.38],
  [43.49, -1.47],
  [43.53, -1.52],
];
