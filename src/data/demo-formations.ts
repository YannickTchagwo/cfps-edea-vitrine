export type Formation = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  objectives: string[];
  duration: string | null;
  prerequisites: string | null;
  careers: string[];
  modalities: string | null;
  status: 'demonstration' | 'validated';
  source: string;
  validatedAt: string | null;
  illustration: string;
};
// Exemples éditoriaux exclusivement : aucune offre officielle confirmée.
export const demoFormations: Formation[] = [
  {
    id: 'demo-01',
    slug: 'maintenance-industrielle',
    title: 'Maintenance industrielle',
    domain: 'Industrie',
    summary:
      'Comprendre les équipements, repérer une panne et découvrir les gestes de maintenance.',
    objectives: [
      'Identifier les composants d’un équipement industriel.',
      'Découvrir une démarche de diagnostic.',
      'Appliquer les principes de prévention lors d’une intervention.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Agent de maintenance industrielle (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'industry',
  },
  {
    id: 'demo-02',
    slug: 'electricite-batiment',
    title: 'Électricité du bâtiment',
    domain: 'Bâtiment',
    summary:
      'Explorer les installations électriques et les bases d’une intervention en sécurité.',
    objectives: [
      'Lire un schéma électrique simple.',
      'Identifier les éléments d’une installation.',
      'Reconnaître les risques et les mesures de prévention.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Électricien du bâtiment (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'electric',
  },
  {
    id: 'demo-03',
    slug: 'logistique-magasinage',
    title: 'Logistique et magasinage',
    domain: 'Logistique',
    summary:
      'Découvrir la réception des marchandises, l’organisation des stocks et la préparation des commandes.',
    objectives: [
      'Identifier les étapes de réception.',
      'Comprendre l’organisation d’un stock.',
      'Découvrir la préparation d’une commande.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Magasinier (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'logistics',
  },
  {
    id: 'demo-04',
    slug: 'soudage-assemblage',
    title: 'Soudage et assemblage',
    domain: 'Industrie',
    summary:
      'S’initier à la lecture de plans et aux principes de l’assemblage métallique.',
    objectives: [
      'Repérer les éléments d’un plan.',
      'Découvrir les procédés d’assemblage.',
      'Identifier les équipements de protection.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Soudeur (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'industry',
  },
  {
    id: 'demo-05',
    slug: 'plomberie-sanitaire',
    title: 'Plomberie et sanitaire',
    domain: 'Bâtiment',
    summary:
      'Comprendre les réseaux d’eau et découvrir les équipements sanitaires du bâtiment.',
    objectives: [
      'Reconnaître les composants d’un réseau.',
      'Découvrir les techniques de raccordement.',
      'Identifier les points de contrôle d’une installation.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Installateur sanitaire (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'electric',
  },
  {
    id: 'demo-06',
    slug: 'gestion-flux-logistiques',
    title: 'Gestion des flux logistiques',
    domain: 'Logistique',
    summary:
      'Explorer le suivi des marchandises et la coordination des opérations logistiques.',
    objectives: [
      'Décrire un flux de marchandises.',
      'Découvrir les documents de suivi.',
      'Comprendre la coordination des opérations.',
    ],
    duration: null,
    prerequisites: null,
    careers: ['Assistant logistique (exemple de métier)'],
    modalities: null,
    status: 'demonstration',
    source: 'Exemple rédigé pour le prototype, non validé par le CFPS',
    validatedAt: null,
    illustration: 'logistics',
  },
];
