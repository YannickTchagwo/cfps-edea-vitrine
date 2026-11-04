import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matches, normalize } from '../src/lib/search.mjs';
test('recherche insensible aux accents, casse et espaces', () => {
  assert.equal(normalize('  ÉLECTRICITÉ  '), 'electricite');
  assert.ok(
    matches('Électricité du bâtiment', 'Bâtiment', ' ELECTRICITE ', ''),
  );
  assert.ok(
    matches(
      'Électricité du bâtiment',
      'Bâtiment',
      'batiment electricite',
      'Bâtiment',
    ),
  );
});
test('critères cumulés et absence de résultat', () => {
  assert.equal(
    matches('Électricité du bâtiment', 'Bâtiment', 'electricite', 'Industrie'),
    false,
  );
  assert.equal(
    matches('Électricité du bâtiment', 'Bâtiment', 'astronaute', ''),
    false,
  );
  assert.ok(matches('Maintenance industrielle', 'Industrie', '', ''));
});
test('paramètres hostiles traités comme texte', () => {
  assert.equal(
    matches('Électricité', 'Bâtiment', '<img src=x onerror=alert(1)>', ''),
    false,
  );
});
