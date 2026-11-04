import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.PERF_URL || 'http://127.0.0.1:4322/';
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH ||
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  chromeFlags: ['--headless', '--no-first-run', '--no-default-browser-check'],
});
const rows = [];
await mkdir('docs/performance', { recursive: true });
try {
  for (const [name, path] of [
    ['accueil', ''],
    ['catalogue', 'formations/'],
    ['fiche', 'formations/electricite-batiment/'],
  ]) {
    const runs = [];
    for (let i = 1; i <= 3; i++) {
      const result = await lighthouse(new URL(path, base).href, {
        port: chrome.port,
        output: 'json',
        onlyCategories: ['performance'],
        logLevel: 'error',
      });
      const lhr = result.lhr;
      await writeFile(`docs/performance/${name}-${i}.json`, result.report);
      const row = {
        page: name,
        run: i,
        performance: Math.round(lhr.categories.performance.score * 100),
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        bytes: lhr.audits['total-byte-weight'].numericValue,
        jsBytes:
          lhr.audits['resource-summary'].details.items.find(
            (r) => r.resourceType === 'script',
          )?.transferSize || 0,
      };
      runs.push(row);
      console.log(JSON.stringify(row));
    }
    rows.push(...runs);
  }
  await writeFile(
    'docs/performance/results.json',
    JSON.stringify(rows, null, 2),
  );
} finally {
  chrome.kill();
}
