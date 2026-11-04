# Publication — étape future séparée

Aucune mise en ligne n’a encore été vérifiée. L’utilisateur a autorisé la publication de la démonstration sur GitHub Pages le 4 novembre 2026. Le dépôt public est `YannickTchagwo/cfps-edea-vitrine`.

Le workflow `.github/workflows/pages.yml` prépare cette publication. Il se déclenche manuellement dans Actions après activation de Pages avec la source **GitHub Actions** dans les paramètres du dépôt. Il conserve les contenus de démonstration, le bandeau et `noindex`, exécute les contrôles et les tests navigateur avant le déploiement, puis utilise l’environnement `github-pages`. Configurer les règles de protection souhaitées sur cet environnement dans GitHub.

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
