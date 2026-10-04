// Coordonnées géographiques officielles (geo.api.gouv.fr) des 53 communes couvertes
export interface CommuneGeo {
  nom: string;
  insee: string;
  km: number;
  secteur: string;
  lon: number;
  lat: number;
  majeure?: boolean;
}

export const toutesLesCommunes: CommuneGeo[] = [
  {
    "nom": "Louer",
    "insee": "40159",
    "km": 0,
    "secteur": "dax-tartas-adour",
    "lon": -0.89,
    "lat": 43.7558,
    "majeure": true
  },
  {
    "nom": "Tartas",
    "insee": "40313",
    "km": 19,
    "secteur": "dax-tartas-adour",
    "lon": -0.7791,
    "lat": 43.8156,
    "majeure": true
  },
  {
    "nom": "Dax",
    "insee": "40088",
    "km": 21,
    "secteur": "dax-tartas-adour",
    "lon": -1.0637,
    "lat": 43.7025,
    "majeure": true
  },
  {
    "nom": "Saint-Paul-lès-Dax",
    "insee": "40279",
    "km": 21,
    "secteur": "dax-tartas-adour",
    "lon": -1.0941,
    "lat": 43.7485,
    "majeure": true
  },
  {
    "nom": "Castets",
    "insee": "40075",
    "km": 28,
    "secteur": "marensin-born",
    "lon": -1.1487,
    "lat": 43.8806,
    "majeure": true
  },
  {
    "nom": "Hagetmau",
    "insee": "40119",
    "km": 31,
    "secteur": "chalosse-tursan",
    "lon": -0.5866,
    "lat": 43.6498,
    "majeure": true
  },
  {
    "nom": "Saint-Sever",
    "insee": "40282",
    "km": 32,
    "secteur": "chalosse-tursan",
    "lon": -0.5612,
    "lat": 43.7646,
    "majeure": true
  },
  {
    "nom": "Orthez",
    "insee": "64430",
    "km": 39,
    "secteur": "bearn-des-gaves",
    "lon": -0.7777,
    "lat": 43.4945,
    "majeure": true
  },
  {
    "nom": "Morcenx-la-Nouvelle",
    "insee": "40197",
    "km": 42,
    "secteur": "haute-lande",
    "lon": -0.9147,
    "lat": 44.0318,
    "majeure": true
  },
  {
    "nom": "Mont-de-Marsan",
    "insee": "40192",
    "km": 43,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.5009,
    "lat": 43.8931,
    "majeure": true
  },
  {
    "nom": "Peyrehorade",
    "insee": "40224",
    "km": 43,
    "secteur": "pays-orthe-basque-interieur",
    "lon": -1.1106,
    "lat": 43.5612,
    "majeure": true
  },
  {
    "nom": "Soustons",
    "insee": "40310",
    "km": 45,
    "secteur": "cote-sud-landes",
    "lon": -1.3305,
    "lat": 43.754,
    "majeure": true
  },
  {
    "nom": "Capbreton",
    "insee": "40065",
    "km": 53,
    "secteur": "cote-sud-landes",
    "lon": -1.4289,
    "lat": 43.6311,
    "majeure": true
  },
  {
    "nom": "Bayonne",
    "insee": "64102",
    "km": 70,
    "secteur": "pays-orthe-basque-interieur",
    "lon": -1.4611,
    "lat": 43.4844,
    "majeure": true
  },
  {
    "nom": "Aire-sur-l'Adour",
    "insee": "40001",
    "km": 76,
    "secteur": "chalosse-tursan",
    "lon": -0.2561,
    "lat": 43.6932,
    "majeure": true
  },
  {
    "nom": "Mimizan",
    "insee": "40184",
    "km": 76,
    "secteur": "marensin-born",
    "lon": -1.2323,
    "lat": 44.1996,
    "majeure": true
  },
  {
    "nom": "Bazas",
    "insee": "33036",
    "km": 122,
    "secteur": "sud-gironde",
    "lon": -0.2177,
    "lat": 44.4409,
    "majeure": true
  },
  {
    "nom": "Langon",
    "insee": "33227",
    "km": 131,
    "secteur": "sud-gironde",
    "lon": -0.2422,
    "lat": 44.5355,
    "majeure": true
  },
  {
    "nom": "Pontonx-sur-l'Adour",
    "insee": "40230",
    "km": 7,
    "secteur": "dax-tartas-adour",
    "lon": -0.9367,
    "lat": 43.7927,
    "majeure": false
  },
  {
    "nom": "Montfort-en-Chalosse",
    "insee": "40194",
    "km": 11,
    "secteur": "dax-tartas-adour",
    "lon": -0.8367,
    "lat": 43.7065,
    "majeure": false
  },
  {
    "nom": "Mugron",
    "insee": "40201",
    "km": 13,
    "secteur": "dax-tartas-adour",
    "lon": -0.7479,
    "lat": 43.7404,
    "majeure": false
  },
  {
    "nom": "Amou",
    "insee": "40002",
    "km": 31,
    "secteur": "chalosse-tursan",
    "lon": -0.7464,
    "lat": 43.5891,
    "majeure": false
  },
  {
    "nom": "Rion-des-Landes",
    "insee": "40243",
    "km": 32,
    "secteur": "haute-lande",
    "lon": -0.9436,
    "lat": 43.9318,
    "majeure": false
  },
  {
    "nom": "Pouillon",
    "insee": "40233",
    "km": 34,
    "secteur": "dax-tartas-adour",
    "lon": -1,
    "lat": 43.6067,
    "majeure": false
  },
  {
    "nom": "Ygos-Saint-Saturnin",
    "insee": "40333",
    "km": 37,
    "secteur": "haute-lande",
    "lon": -0.7297,
    "lat": 43.9934,
    "majeure": false
  },
  {
    "nom": "Saint-Vincent-de-Tyrosse",
    "insee": "40284",
    "km": 41,
    "secteur": "cote-sud-landes",
    "lon": -1.3013,
    "lat": 43.663,
    "majeure": false
  },
  {
    "nom": "Léon",
    "insee": "40150",
    "km": 42,
    "secteur": "marensin-born",
    "lon": -1.2768,
    "lat": 43.8474,
    "majeure": false
  },
  {
    "nom": "Salies-de-Béarn",
    "insee": "64499",
    "km": 49,
    "secteur": "bearn-des-gaves",
    "lon": -0.9158,
    "lat": 43.4683,
    "majeure": false
  },
  {
    "nom": "Geaune",
    "insee": "40110",
    "km": 51,
    "secteur": "chalosse-tursan",
    "lon": -0.3698,
    "lat": 43.6322,
    "majeure": false
  },
  {
    "nom": "Seignosse",
    "insee": "40296",
    "km": 51,
    "secteur": "cote-sud-landes",
    "lon": -1.3939,
    "lat": 43.7055,
    "majeure": false
  },
  {
    "nom": "Arzacq-Arraziguet",
    "insee": "64063",
    "km": 52,
    "secteur": "bearn-des-gaves",
    "lon": -0.4299,
    "lat": 43.5425,
    "majeure": false
  },
  {
    "nom": "Bidache",
    "insee": "64123",
    "km": 54,
    "secteur": "pays-orthe-basque-interieur",
    "lon": -1.1359,
    "lat": 43.4676,
    "majeure": false
  },
  {
    "nom": "Grenade-sur-l'Adour",
    "insee": "40117",
    "km": 55,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.4232,
    "lat": 43.7902,
    "majeure": false
  },
  {
    "nom": "Labenne",
    "insee": "40133",
    "km": 57,
    "secteur": "cote-sud-landes",
    "lon": -1.4371,
    "lat": 43.5982,
    "majeure": false
  },
  {
    "nom": "Soorts-Hossegor",
    "insee": "40304",
    "km": 57,
    "secteur": "cote-sud-landes",
    "lon": -1.4084,
    "lat": 43.6679,
    "majeure": false
  },
  {
    "nom": "Sauveterre-de-Béarn",
    "insee": "64513",
    "km": 57,
    "secteur": "bearn-des-gaves",
    "lon": -0.931,
    "lat": 43.4137,
    "majeure": false
  },
  {
    "nom": "Sabres",
    "insee": "40246",
    "km": 60,
    "secteur": "haute-lande",
    "lon": -0.7332,
    "lat": 44.1532,
    "majeure": false
  },
  {
    "nom": "Saint-Julien-en-Born",
    "insee": "40266",
    "km": 60,
    "secteur": "marensin-born",
    "lon": -1.2551,
    "lat": 44.0854,
    "majeure": false
  },
  {
    "nom": "Lit-et-Mixe",
    "insee": "40157",
    "km": 61,
    "secteur": "marensin-born",
    "lon": -1.2704,
    "lat": 44.0273,
    "majeure": false
  },
  {
    "nom": "Villeneuve-de-Marsan",
    "insee": "40331",
    "km": 63,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.3057,
    "lat": 43.9087,
    "majeure": false
  },
  {
    "nom": "Navarrenx",
    "insee": "64416",
    "km": 64,
    "secteur": "bearn-des-gaves",
    "lon": -0.7363,
    "lat": 43.3291,
    "majeure": false
  },
  {
    "nom": "Tarnos",
    "insee": "40312",
    "km": 66,
    "secteur": "cote-sud-landes",
    "lon": -1.4717,
    "lat": 43.5338,
    "majeure": false
  },
  {
    "nom": "Labouheyre",
    "insee": "40134",
    "km": 70,
    "secteur": "haute-lande",
    "lon": -0.9107,
    "lat": 44.2243,
    "majeure": false
  },
  {
    "nom": "Roquefort",
    "insee": "40245",
    "km": 70,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.3287,
    "lat": 44.0378,
    "majeure": false
  },
  {
    "nom": "Nogaro",
    "insee": "32296",
    "km": 87,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.0295,
    "lat": 43.7646,
    "majeure": false
  },
  {
    "nom": "Hasparren",
    "insee": "64256",
    "km": 88,
    "secteur": "pays-orthe-basque-interieur",
    "lon": -1.3196,
    "lat": 43.3951,
    "majeure": false
  },
  {
    "nom": "Pissos",
    "insee": "40227",
    "km": 89,
    "secteur": "haute-lande",
    "lon": -0.7906,
    "lat": 44.3012,
    "majeure": false
  },
  {
    "nom": "Cazaubon",
    "insee": "32096",
    "km": 90,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": -0.0336,
    "lat": 43.9285,
    "majeure": false
  },
  {
    "nom": "Cambo-les-Bains",
    "insee": "64160",
    "km": 92,
    "secteur": "pays-orthe-basque-interieur",
    "lon": -1.3886,
    "lat": 43.3622,
    "majeure": false
  },
  {
    "nom": "Eauze",
    "insee": "32119",
    "km": 98,
    "secteur": "mont-de-marsan-bas-armagnac",
    "lon": 0.1057,
    "lat": 43.8614,
    "majeure": false
  },
  {
    "nom": "Captieux",
    "insee": "33095",
    "km": 110,
    "secteur": "sud-gironde",
    "lon": -0.2981,
    "lat": 44.2621,
    "majeure": false
  },
  {
    "nom": "Hostens",
    "insee": "33202",
    "km": 113,
    "secteur": "sud-gironde",
    "lon": -0.6616,
    "lat": 44.4834,
    "majeure": false
  },
  {
    "nom": "Saint-Symphorien",
    "insee": "33484",
    "km": 128,
    "secteur": "sud-gironde",
    "lon": -0.5505,
    "lat": 44.4261,
    "majeure": false
  }
];

export const villesMajeures: CommuneGeo[] = toutesLesCommunes.filter((c) => c.majeure);
