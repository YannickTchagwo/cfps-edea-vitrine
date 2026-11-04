# Publication et exploitation

La démonstration a été publiée et vérifiée le 4 novembre 2026, avec l’autorisation de l’utilisateur. Le dépôt public est `YannickTchagwo/cfps-edea-vitrine`. [Ouvrir le prototype](https://yannicktchagwo.github.io/cfps-edea-vitrine/) · [Rapport de déploiement](deploiement.md).

## Configuration retenue pour la démonstration

Le site est configuré avec la source **Deploy from a branch**, branche `gh-pages`, dossier `/`. Cette branche contient uniquement `dist/` et `.nojekyll` ; `main` contient le code et la documentation. HTTPS est activé. Les 15 pages conservent le bandeau, les exemples explicitement signalés et `noindex`.

Les workflows ont été enregistrés après un délai d’indexation de GitHub (les premiers déclenchements renvoyaient HTTP 404). La publication initiale conserve le build statique vérifié localement, servi depuis `gh-pages` par le traitement Pages généré par GitHub. Aucun succès de la suite de tests sur les runners GitHub n’est annoncé.

Pour une mise à jour, reconstruire avec `SITE_BASE=/cfps-edea-vitrine/`, exécuter les contrôles du README puis mettre à jour `gh-pages` avec le contenu de `dist/` en conservant `.nojekyll`. Ne pas fusionner `main` dans `gh-pages`. Conserver l’artefact précédent avant de le remplacer.

Le workflow `.github/workflows/pages.yml` reste disponible pour une future automatisation. Il faut alors sélectionner la source **GitHub Actions** dans les paramètres Pages et vérifier que GitHub l’enregistre avant de le déclencher. Il conserve les contenus de démonstration, le bandeau et `noindex`, exécute les contrôles et les tests navigateur avant le déploiement, puis utilise l’environnement `github-pages`.

## Conditions éditoriales

Faire valider les contenus et l’identité, les droits des photos, les coordonnées, la liste officielle des formations et les mentions. La maquette n’utilise aucune photo de campus. Les exemples sont exclus par `PUBLIC_CONTENT_MODE=public`, mais le statut validé doit être pris en charge par les composants avant de publier des offres officielles (voir README). Ne retirer `noindex` et le bandeau qu’après accord explicite et choix de l’URL officielle. `noindex` n’est pas une protection d’accès.

## GitHub Pages sous un projet

1. Choisir le dépôt et son chemin réel. Configurer Pages sur GitHub Actions. Protéger l’environnement `github-pages` avec les règles de revue adaptées.
2. Exécuter `npm ci`, `npm run check`, `npm run format:check`, `npm test`, puis construire avec `SITE_BASE=/<depot>/`. Contrôler les parcours, liens directs, rafraîchissements, assets et 404 sous cette base.
3. La CI de vérification dépose un artefact téléchargeable sans droits de publication. Le workflow manuel séparé `pages.yml` utilise `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4` puis `actions/deploy-pages@v4` dans un job dépendant du build. Seul le job de déploiement reçoit `pages: write` et `id-token: write`, dans l’environnement `github-pages`.
4. Une fois le dépôt configuré et les fichiers transmis, lancer ce workflow manuel ; contrôler HTTPS, navigation, partage et page inexistante sur l’URL retournée. Aucun workflow ne publie automatiquement sur un push.

Référence : [workflows personnalisés GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Sous-domaine ABC INTER

1. Faire attribuer le nom exact et identifier l’hébergeur. Construire avec `SITE_BASE=/` et `SITE_URL=https://<nom-confirmé>`.
2. Préparer le dépôt du seul contenu de `dist/` sur l’hébergement statique choisi, ou un domaine personnalisé GitHub Pages. La modification DNS relève d’une intervention explicitement autorisée : CNAME et éventuels enregistrements de vérification selon le fournisseur, sans inventer de cible.
3. Configurer le certificat et la redirection HTTPS ; vérifier le nom couvert, l’expiration, les assets, les liens directs et la 404.
4. Selon les capacités de l’hôte, préparer puis tester `Content-Security-Policy`, `X-Content-Type-Options: nosniff` et `Referrer-Policy: strict-origin-when-cross-origin`. Une CSP doit être vérifiée sur le build exact (scripts Astro intégrés, styles SVG). Ne pas annoncer d’en-têtes non contrôlés. GitHub Pages ne fournit pas de configuration arbitraire de ces en-têtes via le dépôt.

Référence : [domaines personnalisés GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Retour arrière

Conserver l’artefact validé précédent et le commit ou tag source associé. Si une publication future régresse, redéployer cet artefact avec la même base et la même origine, ou reconstruire le tag validé avec son verrouillage (`npm ci`). Contrôler de nouveau accueil, catalogue, fiche et 404. Ne pas modifier les DNS pour corriger un problème de contenu.
