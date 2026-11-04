# Registre des contenus et des ressources

Version actuelle : les onze métiers du document transmis remplacent les six exemples initiaux. Voir [integration-metiers.md](integration-metiers.md) pour la transcription, le périmètre Édéa et les contrôles de cette mise à jour.

| Élément                                                                 | Statut                              | Source / validation nécessaire                                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Nom CFPS d’Édéa, ville Édéa et maîtrise d’ouvrage                       | Validé pour le cadrage du prototype | Brief utilisateur ; validation éditoriale finale avant diffusion                                                    |
| Onze métiers et leurs trois pôles                                       | Documenté                           | Document transmis « Liste des métiers par Centres », page 1, rubrique CFPS / Édéa ; `src/data/source-formations.ts` |
| Durées, prérequis officiels, modalités, certification, tarifs, sessions | À confirmer                         | Champs inconnus nuls ; aucune valeur inventée                                                                       |
| Histoire, direction, infrastructures                                    | À confirmer                         | États explicites dans la page centre                                                                                |
| Coordonnées, campus, carte                                              | À confirmer                         | Aucun téléphone, e-mail, lien de carte ou adresse fictive                                                           |
| Admissions, pièces et calendrier                                        | À confirmer                         | Repères d’orientation seulement, aucun dépôt de dossier                                                             |
| Partenariats, stages et recrutement                                     | Démonstration / à confirmer         | Pistes de discussion, aucun partenaire ou emploi annoncé                                                            |
| Actualités                                                              | À confirmer                         | État vide ; aucune fiche fictive ni fausse date                                                                     |
| Logo, palette, police                                                   | Démonstration                       | Signature typographique provisoire et police système                                                                |
| Mentions, éditeur, hébergement définitif                                | À confirmer                         | Texte de prototype, à faire valider avant diffusion                                                                 |

Les données sont définies dans `src/data/source-formations.ts` et portent le statut `documented` : seul le métier et son pôle sont attestés par le document transmis. Les champs non fournis restent nuls. Aucun ancien exemple n’est conservé dans le catalogue. Le bandeau et `noindex` restent actifs.

## Visuels et licences

| Ressource                                              | Origine                                              | Droits et usage                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `TradeVisual.astro` : industrie, transport, logistique | SVG créés dans ce dépôt pour le prototype            | Création originale, aucun emprunt à AFTRAL ; illustration générique, non photographique |
| `public/favicon.svg`                                   | Graphisme typographique original                     | Provisoire ; aucune marque institutionnelle imitée                                      |
| Arial / Helvetica / sans-serif                         | Polices du système de l’utilisateur                  | Aucun fichier de police redistribué                                                     |
| Astro et outils de développement                       | Registre npm officiel, versions dans le verrouillage | Licences fournies dans les paquets ; pas de bibliothèque UI ajoutée                     |

Aucun faux avis, chiffre de réussite, accréditation ou promesse d’emploi. Aucun démarrage en janvier annoncé. Aucun contenu réel d’apprenant, paiement, compte, formulaire actif ou stockage personnel.

Le cahier des charges métier mentionné par le brief n’a pas été fourni séparément. Toute divergence devra être arbitrée sur ce document et les contenus officiels du CFPS.
