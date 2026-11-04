# Rapport de recette — 4 novembre 2026

Prototype local Astro 7.4.5, Windows, Node 26.7.0, npm 11.19.0. La version LTS 24.11.0 est épinglée pour la reprise, mais n’a pas été exécutée sur ce poste. Aucune publication, modification DNS ou intégration serveur.

## Vérifications exécutées

| Contrôle                                          | Résultat                                                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`                                   | 0 erreur, 0 avertissement, 0 indication après correction                                                                             |
| `npm test`                                        | 3 tests réussis : accents/casse/espaces, critères cumulés et paramètres hostiles                                                     |
| Build statique à la racine                        | Réussi, 15 pages                                                                                                                     |
| Build statique sous `/cfps-edea-vitrine/`         | Réussi, 15 pages                                                                                                                     |
| `npm run test:static`                             | 388 références internes et assets vérifiés sur chacune des deux bases, lang fr, noindex, H1 unique, contrôle d’encodage et budget JS |
| Playwright à la racine                            | 42 tests réussis, aucun ignoré, aucun instable, Chrome/Chromium, Firefox et WebKit                                                   |
| Analyse axe des pages accueil, catalogue et fiche | Aucune violation détectée sur chaque moteur, mobile 390 et bureau 1440 px                                                            |
| Inspection des captures                           | Accueil et catalogue inspectés à 390 et 1440 px ; captures dans `docs/captures/`                                                     |
| Audit npm après ajustement des outils             | 0 vulnérabilité signalée lors de l’installation finale                                                                               |
| Serveur local                                     | `npm run dev -- --background --host 127.0.0.1` démarré ; HTTP 200 sur `http://127.0.0.1:4321/`                                       |

La suite navigateur vérifie le parcours accueil → recherche → catalogue → fiche → retour au catalogue aux largeurs 320, 390, 768 et 1440 px. Elle couvre le menu repliable, Échap et retour du focus, le lien d’évitement, les filtres avec/sans accents, critères cumulés, URL après rafraîchissement, zéro résultat et réinitialisation. Elle vérifie aussi le catalogue sans JavaScript, les pages secondaires, la 404, les assets, l’absence d’erreur JavaScript bloquante et l’absence de requêtes externes dans le parcours principal.

Le contrôle à 720 px simule le reflow d’un écran de 1440 px zoomé à 200 % et vérifie la réduction du mouvement. Ce n’est pas une manipulation manuelle du zoom du navigateur.

Synthèse enregistrée : [résultats des trois moteurs à la racine](tests-root.json). Les rapports détaillés Playwright sont régénérés dans `test-results/` et ne sont pas publics. La CI préparée n’a pas été exécutée sur GitHub.

Compléments de recette : **14 tests Chromium réussis sous `/cfps-edea-vitrine/`**, couvrant également les fiches directes, les assets, le rafraîchissement et la 404. [Synthèse sous préfixe](tests-prefix.json). Le mode `PUBLIC_CONTENT_MODE=public` a été construit : neuf pages, aucune carte ni route de formation de démonstration. Le build final a été rétabli en mode démonstration à la racine. `npm run format:check` et `git diff --check` ont réussi. Les serveurs démarrés pour la recette sont arrêtés à la livraison ; les commandes du README permettent de les relancer.

## Performance mobile

Lighthouse **13.5.0**, Chrome **156.0.0.0** headless sur Windows. Trois exécutions par page sur le build statique local. Profil mobile Moto G Power simulé, viewport 412 × 823, DPR 1,75 ; throttling simulé : RTT 150 ms, débit 1 638,4 kbit/s, ralentissement CPU ×4. Résultats de laboratoire, pas de mesures sur appareil physique ni réseau camerounais réel.

| Page              | Performance médiane / 100 | LCP médian | CLS médian | Transfert initial Lighthouse |
| ----------------- | ------------------------- | ---------- | ---------- | ---------------------------- |
| Accueil           | 100                       | 1,147 s    | 0          | 31 993 octets                |
| Catalogue         | 100                       | 1,080 s    | 0,000783   | 34 016 octets                |
| Fiche électricité | 100                       | 0,907 s    | 0          | 23 585 octets                |

Budgets respectés sur ces mesures : score ≥90, LCP ≤2,5 s, CLS ≤0,1, transfert ≤700 Ko. Aucun fichier JavaScript externe : scripts courts intégrés au HTML. Le contrôle gzip des scripts intégrés donne moins de 1 Ko par page, sous le budget de 60 Ko. SVG originaux intégrés, pas d’image distante, police système, aucune vidéo ou carte chargée.

Preuves : [neuf mesures synthétiques](performance/results.json), rapports complets `performance/accueil-1.json` à `fiche-3.json` et [poids du build](performance/weights.json). Les premières mesures ont révélé un CLS de 0,357 lié au repli tardif du menu ; le masquage avant premier rendu a corrigé ce défaut. Le lien d’évitement possède un tabindex explicite pour assurer sa tabulation dans WebKit.

Les rapports Lighthouse complets sont conservés localement dans `docs/performance/` ; seules leurs synthèses sont incluses dans le dépôt public. Les quatre captures Chromium référencées par le dossier de conception sont incluses dans le dépôt.

## Limites et validation restante

- AFTRAL renvoie 403 et l’hôte du navigateur intégré était indisponible. La conception suit le repli défini dans le brief, sans prétendre reproduire un relevé visuel du site.
- Aucun parcours manuel avec lecteur d’écran n’a été réalisé. Les tests axe et clavier ne constituent pas un audit WCAG. Le zoom réel à 200 %, les appareils physiques et la lecture vocale restent à contrôler.
- Les six offres et leurs objectifs sont de démonstration ; aucune durée, date, certification, condition tarifaire ou accréditation n’a été inventée. Aucun article d’actualité n’est publié faute de contenu validé ; les fiches d’actualités seront ajoutées avec des données officielles.
- Charte, photos, formations, contacts, campus, conditions d’admission, responsable éditorial et mentions doivent être validés avant toute diffusion. Le cahier des charges métier complet n’a pas été fourni séparément.
- Les en-têtes HTTPS/CSP et les DNS ne sont pas testés : aucun hébergement définitif n’a été configuré.
- La CI et le fonctionnement sur la version Node LTS épinglée restent à exécuter sur l’environnement cible.

La publication reste une étape séparée, décrite dans [publication.md](publication.md).
