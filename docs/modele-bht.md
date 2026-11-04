# Catalogue et fiches inspirés de la BHT — 4 novembre 2026

## Références consultées

- [Catalogue des cursus BHT](https://www.bht-berlin.de/studiengaenge) : liste en tableau, informations comparables et intitulés cliquables.
- [Fiche Architecture BHT](https://www.bht-berlin.de/b-arch) : titre, visuel, tableau de repères, présentation, conditions d’accès, contenu et perspectives professionnelles.

L’adaptation reprend ces principes d’organisation. Les composants, les textes et les illustrations sont ceux du CFPS ; aucun code, logo, portrait, témoignage, photographie ou contenu pédagogique BHT n’est copié.

## Catalogue CFPS

Les onze métiers documentés apparaissent dans un tableau alphabétique avec les colonnes **Filière / métier**, **Pôle**, **Durée** et un lien d’ouverture. Les trois pôles restent ceux du document fourni : Maintenance industrielle, Transport et Logistique.

La recherche insensible à la casse et aux accents, le filtre cumulable par pôle, le compteur annoncé aux lecteurs d’écran, les critères dans l’URL, la réinitialisation et l’état vide sont conservés. Sans JavaScript, les onze fiches sont accessibles. Les URL existantes des onze métiers ne changent pas.

En bureau, toutes les colonnes sont visibles. En mobile, le tableau conserve l’intitulé cliquable et le pôle ; la durée se consulte dans la fiche. Cette disposition évite le défilement horizontal et conserve les éléments HTML natifs du tableau, les en-têtes et la légende accessible.

## Fiche de filière

La page comporte :

1. Un fil d’Ariane, le pôle, le titre, le statut documentaire et une illustration générique.
2. Le tableau « La filière en bref » : centre, pôle, durée, qualification, conditions d’accès et session.
3. Six rubriques : Présentation, Objectifs et compétences, Programme et pratique professionnelle, Prérequis et admission, Débouchés professionnels, Source et statut.
4. Un sommaire latéral en bureau, et un sommaire repliable natif en mobile.
5. Des liens vers les admissions, le contact et le retour au catalogue.

La palette bleu nuit, ivoire et jaune, la signature CFPS et les illustrations originales sont conservées. Aucun formulaire, compte ou service d’inscription n’est ajouté. Une seule feuille CSS locale regroupe les styles ; aucune police, vidéo ou bibliothèque distante n’est chargée.

## Contenus à compléter

Le PDF transmis atteste les intitulés et les pôles, pas un programme ni des sessions ouvertes. Durée, qualification, session, prérequis et débouchés restent nuls dans les données et sont présentés comme « À confirmer » lorsque la fiche les expose. Les rubriques pédagogiques expliquent ce qui reste à fournir sans inventer de modules, de diplômes, de tarifs ou de dates.

Les tests de données vérifient cette absence d’invention. La source documentaire et le statut de prototype restent visibles.

## Recette

- `npm run check` : aucune erreur, aucun avertissement.
- `npm test` : six tests de données et de recherche réussis.
- `npm run build` : vingt pages générées ; racine et préfixe GitHub Pages vérifiés.
- `npm run test:static` : 534 références internes vérifiées.
- Avec le préfixe `/cfps-edea-vitrine/` : les 17 scénarios Chromium passent sur le build final, voir [le rapport](tests-bht-prefix.json).
- À la racine : 51 scénarios validés sur Chromium, Firefox et WebKit, à 320, 390, 768 et 1440 px selon les scénarios. Le nouveau test de tableau a été corrigé pour vérifier le nom accessible sans sa flèche décorative et le dernier intitulé alphabétique. Firefox a nécessité une relance hors sandbox après un plantage au démarrage. Voir [le rapport](tests-bht-root.json).
- Navigation sans JavaScript, filtres, onze fiches à 320 px, sommaire et liens d’admission, clavier, 404, accessibilité automatisée axe, zoom à 200 % et réduction du mouvement vérifiés.
- Captures inspectées : [catalogue bureau](captures/catalogue-1440-chromium.png), [catalogue mobile](captures/catalogue-390-chromium.png), [fiche bureau](captures/fiche-1440-bht.png), [fiche mobile](captures/fiche-390-bht.png).

Les moteurs automatisés ne constituent pas un essai sur les téléphones physiques signalés précédemment ; la cause de leur page blanche n’est pas établie. La recette de la version précédente reste disponible dans [integration-metiers.md](integration-metiers.md).

## Publication vérifiée

Le code source `d1a70e07a77af15014bad8e48affac54920334f5` a été publié via le commit `68a75cc5f6f1f71a7964a97e4f21479468417350` de la branche `gh-pages`. GitHub Pages confirme le statut `built` le 4 novembre 2026 à 21:21:27 UTC.

Le contrôle HTTPS public a vérifié 21 URL, les onze métiers, le nouveau tableau, les repères et les six rubriques de chaque fiche, les liens avec le préfixe du projet, les ressources, le statut prototype et la 404 personnalisée. Les six anciennes URL de démonstration répondent toujours 404. Voir [le rapport de production](verification-production-bht.json).
