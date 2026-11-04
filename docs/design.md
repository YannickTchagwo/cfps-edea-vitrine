# Conception du prototype

Mise à jour du catalogue : les pôles sont Maintenance industrielle, Transport et Logistique, issus de la liste transmise. Onze fiches sourcées remplacent les six exemples. Voir [integration-metiers.md](integration-metiers.md). Les captures ci-dessous sont actualisées par les tests.

## Source et limite du relevé

Brief intégral lu le 4 novembre 2026. Dépôt initial : squelette Astro 7.4.5, TypeScript strict, aucune donnée métier ni interface CFPS existante. Pile conservée, CSS natif, aucune bibliothèque d’interface.

La consultation de https://www.aftral.com/ a renvoyé HTTP 403. Le navigateur intégré a répondu « browser access host is unavailable ». Aucun détail visuel du site AFTRAL n’est présenté comme observé. L’orientation vient donc de la composition de repli du brief : moteur visible dès l’accueil, navigation de portail, domaines, catalogue par cartes et accès par public. Aucun code ou visuel AFTRAL copié.

## Wireframe bureau

```text
Bandeau de prototype
Signature typographique | Édéa | Contact
Accueil | Centre | Formations | Admissions | Entreprises | Actualités | Contact
Titre et introduction                | Illustration technique générique
Découvrir le centre                  | Signature illustrative
              Recherche métier | Domaine | Trouver une formation
Pôles : Maintenance industrielle     Transport                 Logistique
Formations : carte                   carte                    carte
Apprenants et parents                | Entreprises
Présentation du centre               | Informations à confirmer
Actualités                           | État vide
Contact                              | Accès aux informations
Pied de page institutionnel et mentions
```

## Wireframe mobile

```text
Bandeau de prototype
CFPS Édéa | Formations | Menu
Navigation dépliable par bouton
Titre, introduction et lien centre
Illustration technique générique
Recherche métier
Sélecteur de domaine
Trouver une formation
Pôles en pile
Cartes de formation en pile
Apprenants, entreprises, centre, actualités, contact
Pied de page
```

Le catalogue présente recherche, avertissement de démonstration, compteur annoncé via aria-live, réinitialisation, cartes et état vide utile. La fiche présente fil d’Ariane, statut, objectifs, prérequis inconnus explicités, métiers illustratifs et repères. Retour au catalogue et orientation vers le contact. Aucun bouton d’inscription.

## Direction visuelle et composants

Identité provisoire : signature typographique, sans prétendre à un logo validé. Bleu nuit `#142b3d`, ivoire `#fffefa`, jaune `#f3c94f`, fond secondaire `#f2f3ee`. Police système Arial, sans téléchargement. H1 40–75 px, H2 29–40 px ; corps 16 px. Cartes à bords fins, rayons discrets, alternance de bandes claires et colorées.

Variables dans `src/styles/tokens.css`. Desktop : trois colonnes à partir de 1001 px ; tablette : deux ; mobile : une sous 701 px. Recherche en trois champs alignés puis empilés. Focus visible, états survol et menu ouvert, respect de la réduction du mouvement. Sans JavaScript : navigation visible et toutes les fiches accessibles. Le filtrage conserve `q` et `domaine` dans l’URL, sans injection HTML.

Illustrations SVG originales et locales, réservant leur espace ; légende « Illustration de démonstration ». Elles évitent de faire passer un atelier générique pour le campus réel. Remplacement possible par des photos autorisées après validation.

## Captures de recette

Captures produites par les tests navigateur, hors du dossier public :

- [Accueil mobile 390 px](captures/accueil-390-chromium.png)
- [Accueil bureau 1440 px](captures/accueil-1440-chromium.png)
- [Catalogue mobile 390 px](captures/catalogue-390-chromium.png)
- [Catalogue bureau 1440 px](captures/catalogue-1440-chromium.png)

Il s’agit d’une proposition de conception à faire approuver par le CFPS, pas d’une validation institutionnelle.
