import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

for (const width of [320, 390, 768, 1440]) {
  test(`parcours accueil → catalogue → fiche, ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const external: string[] = [];
    page.on('request', (r) => {
      if (!r.url().startsWith('http://127.0.0.1:4322')) external.push(r.url());
    });
    const checkWidth = async () =>
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    await page.goto('./');
    await expect(page.locator('h1')).toContainText('Votre avenir');
    await checkWidth();
    mkdirSync('docs/captures', { recursive: true });
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `docs/captures/accueil-${width}-${info.project.name}.png`,
        fullPage: true,
      });
    if (width <= 700) {
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.locator('#menu-toggle')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      await page.locator('#main-nav a').first().focus();
      await page.keyboard.press('Escape');
      await expect(page.locator('#menu-toggle')).toBeFocused();
      await expect(page.locator('#menu-toggle')).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
    await page.getByLabel('Quel métier vous intéresse').fill('MECATRONICIEN');
    await page.getByRole('button', { name: 'Explorer les métiers' }).click();
    await expect(page.locator('#results-count')).toHaveText(
      '1 métier répertorié',
    );
    await expect(page.locator('[data-formation]:visible')).toHaveCount(1);
    await checkWidth();
    await page
      .getByRole('link', { name: 'Mécatronicien automobile', exact: true })
      .click();
    await expect(page.locator('h1')).toHaveText('Mécatronicien automobile');
    await expect(page.locator('.demo-tag')).toContainText('Métier répertorié');
    await checkWidth();
    await page.reload();
    await expect(page.locator('h1')).toHaveText('Mécatronicien automobile');
    await page.getByRole('link', { name: 'Retour au catalogue' }).click();
    await expect(page.locator('[data-formation]:visible')).toHaveCount(11);
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `docs/captures/catalogue-${width}-${info.project.name}.png`,
        fullPage: true,
      });
    await expect(page.locator('[data-formation]')).toHaveCount(11);
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
}

test('filtres cumulés, URL, état vide, réinitialisation et retour navigateur', async ({
  page,
}) => {
  await page.goto(
    'formations/?q=mecatronicien&domaine=Maintenance+industrielle',
  );
  await expect(page.locator('[data-formation]:visible')).toHaveCount(1);
  await page.getByLabel('Votre pôle').selectOption('Transport');
  await expect(page.locator('#empty-results')).toBeVisible();
  await expect(page).toHaveURL(/domaine=Transport/);
  await page.reload();
  await expect(page.locator('#empty-results')).toBeVisible();
  await page.getByRole('button', { name: 'Voir tous les métiers' }).click();
  await expect(page.locator('[data-formation]:visible')).toHaveCount(11);
  await expect(page).toHaveURL(/\/formations\/$/);
  await page.getByLabel('Votre pôle').selectOption('Maintenance industrielle');
  await expect(page.locator('[data-formation]:visible')).toHaveCount(4);
  await page.getByLabel('Quel métier vous intéresse').fill('MÉCATRONICIEN');
  await expect(page.locator('[data-formation]:visible')).toHaveCount(1);
  await page
    .getByLabel('Quel métier vous intéresse')
    .fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('#empty-results')).toBeVisible();
  expect(await page.locator('img').count()).toBe(0);
  await page.getByRole('button', { name: 'Réinitialiser les filtres' }).click();
  await expect(page.locator('[data-formation]:visible')).toHaveCount(11);
});

test('onze fiches sourcées et intitulés longs sans débordement à 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('formations/');
  const links = await page
    .locator('[data-formation] h3 a')
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).href),
    );
  expect(links).toHaveLength(11);
  for (const href of links) {
    await page.goto(href);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.source-reference')).toContainText(
      'Liste des métiers par Centres, page 1',
    );
    await expect(page.locator('.detail-main')).toContainText(
      'Information à confirmer',
    );
    await expect(page.locator('.detail-main')).not.toContainText(
      'Exemple fictif',
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test('navigation clavier, secondaires, 404 et liens internes', async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Aller au contenu' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const route of [
    'le-centre/',
    'admissions/',
    'entreprises/',
    'actualites/',
    'contact/',
    'mentions-et-confidentialite/',
    'formations/',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    const urls = await page
      .locator('a[href],link[href],script[src]')
      .evaluateAll((nodes) =>
        nodes
          .map((n) => n.getAttribute('href') || n.getAttribute('src'))
          .filter(Boolean),
      );
    for (const url of new Set(urls)) {
      if (url!.startsWith('#')) continue;
      const response = await request.get(new URL(url!, baseURL).href);
      expect(response.status(), url!).toBe(200);
    }
  }
  const response = await page.goto('page-absente/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Changeons de chemin.');
  await page.getByRole('link', { name: 'Revenir à l’accueil' }).click();
  await expect(page.locator('h1')).toContainText('Votre avenir');
});

test('catalogue et navigation sans JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}formations/`);
  await expect(page.locator('[data-formation]')).toHaveCount(11);
  await expect(
    page.getByRole('navigation', { name: 'Navigation principale' }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Mécatronicien automobile', exact: true })
    .click();
  await expect(page.locator('h1')).toHaveText('Mécatronicien automobile');
  await context.close();
});

for (const route of [
  './',
  'formations/',
  'formations/mecatronicien-automobile/',
]) {
  for (const width of [390, 1440])
    test(`accessibilité automatisée ${route} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations).toEqual([]);
    });
}

test('reflow à 200 % sur écran 1440px et réduction du mouvement', async ({
  page,
}) => {
  await page.setViewportSize({ width: 720, height: 450 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of [
    './',
    'formations/',
    'formations/mecatronicien-automobile/',
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe('auto');
  }
});
