# Déploiement de la démonstration — 4 novembre 2026

Ce rapport conserve les preuves de la publication initiale à six exemples. L’adaptation aux onze métiers issus du document transmis et sa recette sont détaillées dans [integration-metiers.md](integration-metiers.md).

URL vérifiée : **https://yannicktchagwo.github.io/cfps-edea-vitrine/**.

Dépôt : [YannickTchagwo/cfps-edea-vitrine](https://github.com/YannickTchagwo/cfps-edea-vitrine). L’utilisateur a demandé et autorisé une démonstration publique sur GitHub Pages. Le bandeau « Prototype – informations à confirmer », les libellés de démonstration et `noindex, nofollow` sont conservés. Les informations officielles restent à valider avant une diffusion institutionnelle.

## Artefact publié

- Branche source : `main`.
- Branche de publication : `gh-pages`, dossier `/`, avec `.nojekyll`.
- Commit de l’artefact : `ac369db3ecc39efe65ce5c1c3c67c5c273ecc2b4`.
- Quinze pages statiques, une feuille CSS et le favicon provisoire.
- Base de construction : `/cfps-edea-vitrine/`.
- Réponse finale de l’API Pages : `built`, sans erreur ; fin du build le 4 novembre 2026 à 18 h 51, heure de Berlin.
- HTTPS activé ; aucun domaine personnalisé ou DNS modifié.

Les sources ont été envoyées avec le connecteur GitHub, puis les derniers ajustements documentaires et les workflows par Git. Les identifiants de la connexion GitHub existante ont été utilisés en mémoire uniquement pour les opérations API autorisées ; aucun secret n’a été inscrit dans les fichiers du projet ou le dépôt.

## Vérifications effectuées

Avant publication : typage Astro sans erreur, formatage, trois tests unitaires de recherche, build et 388 références internes vérifiées sous la base du projet. Le code de l’application correspond à la version ayant réussi les 42 tests des trois moteurs à la racine et les 14 tests Chromium sous préfixe, décrits dans [recette.md](recette.md).

Après publication, parcours HTTP récursif depuis l’accueil : **16 URL vérifiées en HTTP 200**, couvrant les 14 pages consultables depuis la navigation et les cartes, la feuille CSS et le favicon. Vérification des accès directs aux six fiches, du préfixe de tous les liens internes, de `noindex` et du bandeau sur chaque page HTML. Une URL inexistante renvoie **HTTP 404** avec le contenu personnalisé « Changeons de chemin. ».

Preuve détaillée : [verification-production.json](verification-production.json). Aucun nouveau test interactif sur navigateur distant n’est annoncé ; la recette interactive complète a été réalisée localement avant publication.

## Automatisation et mise à jour

GitHub a enregistré les workflows après un délai d’indexation. La publication initiale a conservé le mécanisme Pages depuis une branche ; elle utilise le build statique déjà vérifié localement. Les tests de l’application n’ont pas été réexécutés sur les runners GitHub pendant cette publication. Les workflows restent disponibles pour une future automatisation avec la source Pages « GitHub Actions ».

Pour actualiser la démonstration ou revenir à l’artefact précédent, suivre [publication.md](publication.md). Les captures, le brief local et les rapports techniques détaillés ne sont pas servis par le site statique ; le dépôt public comprend les quatre captures de conception et les synthèses de recette.
