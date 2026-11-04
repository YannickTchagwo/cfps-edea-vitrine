# CFPS d’Édéa — prototype vitrine

Site français statique avec Astro 7.4.5 et TypeScript strict. Accueil, catalogue filtrable, six fiches **de démonstration**, centre, admissions, entreprises, actualités en état vide, contact, mentions et 404. Aucune collecte, inscription, authentification ou paiement. Aucune publication effectuée.

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
- Exemples : `src/data/demo-formations.ts`. Ils sont explicitement fictifs. Durée, prérequis, modalités et date de validation inconnus restent `null`.
- Offres officielles : tableau séparé `validatedFormations` dans `src/data/formations.ts`. Avant de le remplir, faire évoluer les libellés des composants pour afficher le statut validé et ajouter uniquement des contenus sourcés et approuvés. Ne pas convertir automatiquement les exemples en offres officielles.
- Le build vérifie identifiants et slugs uniques, format de slug, domaine, titre, résumé, objectifs, métiers, source et statut. Une offre marquée validée exige une date de validation.
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

Les liens, scripts, styles, favicon, fiches et 404 utilisent la base Astro. Définir `SITE_URL` seulement lorsque l’origine officielle aura été choisie. Pour masquer tous les exemples : `$env:PUBLIC_CONTENT_MODE='public'` ; le catalogue reste vide en l’absence d’offres validées. Ce réglage ne retire pas le statut de prototype et n’autorise pas une publication.

Revenir au prototype local après les essais :

```powershell
$env:SITE_BASE = '/'
$env:PUBLIC_CONTENT_MODE = 'demo'
npm.cmd run build
```

## Publication séparée

La CI `.github/workflows/verify.yml` vérifie et dépose des artefacts ; elle ne déploie rien. La procédure de publication future, de configuration du sous-domaine et de retour arrière figure dans [docs/publication.md](docs/publication.md). Aucun DNS modifié, aucun push ou déploiement déclenché.

À obtenir avant diffusion : cahier des charges métier complet, formations officielles, logo et charte, photos autorisées, contacts et campus, calendrier, conditions d’admission, responsable éditorial, identité juridique et validation des mentions. Voir le [registre des contenus et licences](docs/contenus-et-licences.md) et la [conception avec captures](docs/design.md).
