# Intégration de la liste des métiers — 4 novembre 2026

## Source et portée

Document transmis par l’utilisateur : `liste_des_métiers_par_centres_VF.pdf`, une page, titre visible **Liste des métiers par Centres**. Empreinte SHA-256 : `9f1333aca10041b0b1ae3e3f6907a826191ea9dbdda2fdb7af71316312339c9f`.

La page entière a été extraite puis rendue en image et contrôlée visuellement : la couche texte contient des caractères accentués mal encodés, ce qui impose de vérifier les libellés sur le rendu. Aucune date ni aucun organisme émetteur ne figure sur cette page. Le document fourni est traité comme une source d’intitulés et de rattachements, sans lui attribuer une validation institutionnelle supplémentaire.

Seule la rubrique **CFPS / Édéa** alimente le site. La rubrique CFPS / Douala (agro-industrie) et la matrice des CFM ne sont pas intégrées au catalogue d’Édéa. Le PDF complet n’est pas redistribué sur le site ou dans le dépôt public ; la provenance, sa page et son empreinte sont consignées.

## Intitulés repris

| Pôle du document         | Métier                                                              |
| ------------------------ | ------------------------------------------------------------------- |
| Maintenance industrielle | Mécatronicien automobile                                            |
| Maintenance industrielle | Technicien en froid industriel                                      |
| Maintenance industrielle | Électromécanicien de maintenance industrielle                       |
| Maintenance industrielle | Mécanicien-réparateur des véhicules et engins industriels           |
| Transport                | Conducteur professionnel de poids lourds                            |
| Transport                | Contrôleur technique des véhicules                                  |
| Transport                | Gestionnaire d’entreprise de transport routier pour compte d’autrui |
| Logistique               | Technicien logistique                                               |
| Logistique               | Chef de quai et magasinier                                          |
| Logistique               | Technicien de transit et douane                                     |
| Logistique               | Responsable transport                                               |

Onze métiers, répartition **4 / 3 / 4**. « Responsable transport » reste dans le pôle Logistique conformément au document. La casse et les accents sont normalisés pour la lecture en français ; aucun métier n’est ajouté ou déplacé.

## Comportement du site

- Les six fiches fictives et leurs données sont retirées du catalogue ; leurs anciennes URL ne constituent plus des offres et renvoient à la 404 du site.
- L’accueil présente les trois pôles et une fiche représentative par pôle.
- Catalogue et filtres reprennent les trois pôles. Les compteurs annoncent des **métiers répertoriés**, sans les présenter comme onze sessions de formation ouvertes.
- Chaque fiche précise la source et la page. Objectifs, programmes, durée, prérequis, débouchés, modalités et date de validation inconnus restent `null` dans les données. Les lacunes utiles à l’orientation sont expliquées sans inventer de programme.
- Le statut `documented` signifie « répertorié dans le document transmis ». Les badges « Métier répertorié » remplacent les badges « Démonstration » des anciennes cartes.
- L’identité graphique, les illustrations et le reste des contenus non validés demeurent provisoires. Le bandeau de prototype et `noindex` sont conservés.
- `PUBLIC_CONTENT_MODE` n’est plus utilisé : le site ne contient plus les exemples fictifs du premier catalogue.

## Vérification de cette version

Contrôles exécutés :

- `npm run check` : 0 erreur, 0 avertissement, 0 indication.
- `npm test` : 6 tests réussis, dont les 11 métiers, la répartition 4/3/4, la provenance, les champs inconnus nuls et le filtrage.
- `npm run format:check` et `git diff --check` : réussis.
- `npm run build` : 20 pages à la racine et 20 pages sous `/cfps-edea-vitrine/`.
- `npm run test:static` : 523 références internes vérifiées sur chaque base ; scripts intégrés sous 1 Ko gzip par page contrôlée.
- Playwright : **45 tests réussis** sur Chromium, Firefox et WebKit à la racine ; **15 tests supplémentaires réussis** sur Chromium sous le préfixe Pages. Synthèses : [racine](tests-metiers-root.json) et [préfixe](tests-metiers-prefix.json).
- Les tests couvrent la recherche avec/sans accents, les trois pôles, le zéro résultat et la réinitialisation, les onze fiches à 320 px, les accès directs, la 404, le clavier, le fonctionnement sans JavaScript et les analyses axe sur l’accueil, le catalogue et une fiche à 390 et 1440 px. Aucune violation axe détectée.
- Les quatre captures d’accueil et catalogue aux formats mobile et bureau ont été actualisées et inspectées. Les illustrations de transport et les titres longs restent lisibles sans débordement.

Ces contrôles automatisés ne remplacent pas une lecture manuelle avec un lecteur d’écran ni un audit complet. Les résultats Lighthouse de la première maquette conservés dans `recette.md` décrivent la version précédente ; ils ne sont pas présentés comme des mesures de performance de cette version.

## Publication et vérification en ligne

La mise à jour a été commitéе dans le dépôt local principal puis poussée sur `main` : `061cc6f`. Le build statique vérifié est publié sur `gh-pages`, commit `3b09ade7517cc4453846812e971a25aa573515a9`. L’API Pages a confirmé l’état `built`, sans erreur, le 4 novembre 2026.

URL : **https://yannicktchagwo.github.io/cfps-edea-vitrine/**.

Vérification HTTP après déploiement : **21 URL en HTTP 200**, incluant les onze fiches, le catalogue, l’accueil, les pages secondaires et les ressources. Le catalogue contient bien onze cartes et tous les intitulés attendus. La source, `noindex` et le bandeau sont présents. Une URL inexistante et les six anciennes URL fictives renvoient à la 404 personnalisée. Preuves : [verification-production-metiers.json](verification-production-metiers.json).
