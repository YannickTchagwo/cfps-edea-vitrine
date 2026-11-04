# CFPS d’Édéa — prototype vitrine

Site français statique avec Astro 7.4.5 et TypeScript strict. Le catalogue reprend **les 11 métiers d’Édéa** du document transmis « Liste des métiers par Centres », page 1, dans trois pôles : maintenance industrielle, transport et logistique. Les six exemples initiaux ont été retirés. Les programmes, durées et conditions de formation restent à confirmer. Aucune collecte, inscription, authentification ou paiement.

**Prototype publié : [ouvrir la démonstration](https://yannicktchagwo.github.io/cfps-edea-vitrine/)**. Publication et vérifications HTTPS consignées dans [docs/deploiement.md](docs/deploiement.md).

Adaptation du catalogue à la liste transmise : [source, transcription des onze métiers et tests](docs/integration-metiers.md).

## Ouvrir en local

Prérequis : Node LTS 24.11.0 (`.nvmrc`, minimum compatible Astro 22.23.4) et npm 11.19.0. La recette de cet environnement utilise Node 26.7.0 ; une exécution sur la version LTS épinglée reste à reproduire.

Dans PowerShell :

```powershell
cd C:\work\cfps-site-vitrine-prototype\cfps-edea-vitrine
npm.cmd ci
npm.cmd run dev -- --background --host 127.0.0.1
```

Ouvrir **http://127.0.0.1:4321/**, ou le port indiqué par Astro. Sous macOS/Linux, remplacer `npm.cmd` par `npm`. L’extension `.cmd` évite la restriction PowerShell sur `npm.ps1` sans modifier la politique d’exécution. Les scripts désactivent la télémétrie Astro avant son chargement.

```powershell
npm.cmd run astro -- dev status
npm.cmd run astro -- dev logs
npm.cmd run astro -- dev stop
```

Pour tester le résultat statique :

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1
```

Ouvrir l’URL affichée, généralement http://127.0.0.1:4321/. Le livrable statique est `dist/`. Le serveur de preview au premier plan s’arrête avec Ctrl+C.

## Vérifications

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run format:check
npm.cmd run build
npm.cmd run test:browser
```

Le test navigateur utilise Chrome installé. Pour ajouter Firefox et WebKit :

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/playwright"
npx.cmd playwright install firefox webkit
$env:ALL_BROWSERS = '1'
npm.cmd run test:browser
```

Les tests servent `dist/` sur le port 4322. Si un serveur de recette lancé séparément tourne déjà, définir `$env:QA_REUSE_SERVER='1'`. Ne réutiliser que le serveur de ce projet avec la bonne base. Pour les performances, démarrer `node tests/serve.mjs` dans un autre terminal puis lancer `npm.cmd run test:performance` ; Chrome est requis, son chemin peut être fourni avec `CHROME_PATH`. Rapports dans `docs/performance/`, captures dans `docs/captures/` et résultats détaillés Playwright dans `test-results/`.

Il n’existe pas de commande lint autonome : la vérification syntaxique et TypeScript est `check`, et les conventions sont contrôlées par Prettier. Le [rapport de recette](docs/recette.md) distingue les contrôles exécutés des limites restantes.

## Ajouter des contenus

- Configuration centrale : `src/data/site.ts` pour l’identité et les contacts, `src/styles/tokens.css` pour la palette.
- Métiers et provenance : `src/data/source-formations.ts`. Les intitulés et pôles viennent du PDF transmis ; le résumé est une phrase éditoriale de rattachement au pôle. Les trois métiers d’accueil représentent chacun un pôle.
- Modèle : `src/data/formation-types.ts`. Le statut `documented` signifie « répertorié dans le document », pas « formation ouverte » ni « validation institutionnelle ». Objectifs, durée, prérequis, débouchés, modalités et date de validation restent `null` faute d’informations transmises.
- Le build vérifie identifiants et slugs uniques, format du slug, pôle, titre, résumé, source, page et statut. Les tests vérifient les 11 métiers, la répartition 4/3/4 et l’absence de métiers d’autres centres.
- Pages institutionnelles : `src/data/pages.ts`. Les informations non confirmées restent identifiées.
- Actualités : état vide volontaire. Quand une actualité réelle sera fournie, ajouter les données validées et un modèle de fiche `src/pages/actualites/[slug].astro`. Aucun article fictif n’est généré à ce stade.

## Deux bases de construction

Racine d’un sous-domaine, sans affecter le DNS :

```powershell
$env:SITE_BASE = '/'
npm.cmd run build
```

Projet GitHub Pages :

```powershell
$env:SITE_BASE = '/cfps-edea-vitrine/'
npm.cmd run build
npm.cmd run test:browser
```

Les liens, scripts, styles, favicon, fiches et 404 utilisent la base Astro. Définir `SITE_URL` pour l’origine de publication. Les 11 métiers documentés sont présents dans tous les builds ; l’ancien réglage `PUBLIC_CONTENT_MODE` n’est plus utilisé. Le bandeau de prototype et `noindex` restent actifs.

Revenir au prototype local après les essais :

```powershell
$env:SITE_BASE = '/'
npm.cmd run build
```

## Publication séparée

GitHub Pages est configuré sur la branche `gh-pages`, à la racine. La branche `main` contient les sources ; `gh-pages` contient uniquement l’artefact statique vérifié et `.nojekyll`.

Le dépôt public est [YannickTchagwo/cfps-edea-vitrine](https://github.com/YannickTchagwo/cfps-edea-vitrine). Les workflows de vérification et de déploiement manuel sont disponibles dans GitHub Actions. Avant d’utiliser `pages.yml`, sélectionner la source **GitHub Actions** dans les paramètres Pages. La publication initiale conserve la branche statique `gh-pages` et l’artefact construit et testé localement. La configuration et le retour arrière sont décrits dans [docs/publication.md](docs/publication.md). Aucun DNS de domaine personnalisé n’est modifié.

À obtenir avant diffusion : cahier des charges métier complet, formations officielles, logo et charte, photos autorisées, contacts et campus, calendrier, conditions d’admission, responsable éditorial, identité juridique et validation des mentions. Voir le [registre des contenus et licences](docs/contenus-et-licences.md) et la [conception avec captures](docs/design.md).
