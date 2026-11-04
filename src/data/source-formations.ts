import type { Formation } from './formation-types';

export const formationSource = {
  title: 'Liste des métiers par Centres',
  fileName: 'liste_des_métiers_par_centres_VF.pdf',
  page: 1,
  centre: 'CFPS d’Édéa',
  documentDate: null,
  sha256: '9f1333aca10041b0b1ae3e3f6907a826191ea9dbdda2fdb7af71316312339c9f',
};

export const poles = [
  {
    name: 'Maintenance industrielle',
    summary: 'Entretenir les équipements et les véhicules',
    illustration: 'industry',
  },
  {
    name: 'Transport',
    summary: 'Conduire, contrôler, gérer',
    illustration: 'transport',
  },
  {
    name: 'Logistique',
    summary: 'Organiser les flux et les marchandises',
    illustration: 'logistics',
  },
] as const;

const listedTrades = [
  [
    'mecatronicien-automobile',
    'Mécatronicien automobile',
    'Maintenance industrielle',
  ],
  [
    'technicien-froid-industriel',
    'Technicien en froid industriel',
    'Maintenance industrielle',
  ],
  [
    'electromecanicien-maintenance-industrielle',
    'Électromécanicien de maintenance industrielle',
    'Maintenance industrielle',
  ],
  [
    'mecanicien-reparateur-vehicules-engins-industriels',
    'Mécanicien-réparateur des véhicules et engins industriels',
    'Maintenance industrielle',
  ],
  [
    'conducteur-professionnel-poids-lourds',
    'Conducteur professionnel de poids lourds',
    'Transport',
  ],
  [
    'controleur-technique-vehicules',
    'Contrôleur technique des véhicules',
    'Transport',
  ],
  [
    'gestionnaire-entreprise-transport-routier-compte-autrui',
    'Gestionnaire d’entreprise de transport routier pour compte d’autrui',
    'Transport',
  ],
  ['technicien-logistique', 'Technicien logistique', 'Logistique'],
  ['chef-quai-magasinier', 'Chef de quai et magasinier', 'Logistique'],
  [
    'technicien-transit-douane',
    'Technicien de transit et douane',
    'Logistique',
  ],
  ['responsable-transport', 'Responsable transport', 'Logistique'],
] as const;

// Seuls les intitulés et leur rattachement au pôle proviennent du PDF.
// Les inconnues restent nulles : pas de programme, durée ou validation inventés.
export const sourceFormations: Formation[] = listedTrades.map(
  ([slug, title, domain], index) => ({
    id: `edea-${String(index + 1).padStart(2, '0')}`,
    slug,
    title,
    domain,
    summary: `Métier répertorié pour le CFPS d’Édéa dans le pôle ${domain.toLocaleLowerCase('fr')}.`,
    objectives: null,
    duration: null,
    qualification: null,
    session: null,
    prerequisites: null,
    careers: null,
    modalities: null,
    status: 'documented',
    source: formationSource.title,
    sourcePage: formationSource.page,
    validatedAt: null,
    illustration: poles.find((pole) => pole.name === domain)!.illustration,
  }),
);
