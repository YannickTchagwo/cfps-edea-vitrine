import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';
const root = resolve('dist');
const base = process.env.SITE_BASE || '/';
const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name),
      ),
    )
  ).flat();
const files = await walk(root);
let links = 0;
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  assert.match(html, /lang="fr"/, file);
  assert.match(html, /name="robots" content="noindex, nofollow"/, file);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, file);
  assert.doesNotMatch(html, /�|Ã©|â€™/, file);
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (raw.startsWith('#') || /^(https?:|data:|mailto:|tel:)/.test(raw))
      continue;
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0]);
    assert.ok(pathname.startsWith(base), `${file}: lien sans base ${raw}`);
    let target = join(root, pathname.slice(base.length));
    if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    await stat(target);
    links++;
  }
}
const weights = [];
for (const page of [
  'index.html',
  'formations/index.html',
  'formations/electricite-batiment/index.html',
]) {
  const html = await readFile(join(root, page), 'utf8');
  const inline = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .join('\n');
  weights.push({
    page,
    htmlBytes: Buffer.byteLength(html),
    inlineJsGzipBytes: gzipSync(inline).byteLength,
  });
  assert.ok(gzipSync(inline).byteLength < 60000, `${page}: budget JS`);
}
await mkdir('docs/performance', { recursive: true });
await writeFile(
  'docs/performance/weights.json',
  JSON.stringify(
    {
      base,
      htmlPages: files.filter((f) => f.endsWith('.html')).length,
      links,
      weights,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      base,
      pages: files.filter((f) => f.endsWith('.html')).length,
      links,
      weights,
    },
    null,
    2,
  ),
);
