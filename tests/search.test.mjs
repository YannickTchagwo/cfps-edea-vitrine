import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matches, normalize } from '../src/lib/search.mjs';
test('recherche insensible aux accents, casse et espaces', () => {
  assert.equal(normalize('  MÉCATRONICIEN  '), 'mecatronicien');
  assert.ok(
    matches(
      'Mécatronicien automobile',
      'Maintenance industrielle',
      ' MECATRONICIEN ',
      '',
    ),
  );
  assert.ok(
    matches(
      'Contrôleur technique des véhicules',
      'Transport',
      'vehicules controleur',
      'Transport',
    ),
  );
});
test('critères cumulés et absence de résultat', () => {
  assert.equal(
    matches(
      'Mécatronicien automobile',
      'Maintenance industrielle',
      'mecatronicien',
      'Transport',
    ),
    false,
  );
  assert.equal(
    matches(
      'Mécatronicien automobile',
      'Maintenance industrielle',
      'astronaute',
      '',
    ),
    false,
  );
  assert.ok(matches('Technicien logistique', 'Logistique', '', ''));
});
test('paramètres hostiles traités comme texte', () => {
  assert.equal(
    matches(
      'Mécatronicien automobile',
      'Maintenance industrielle',
      '<img src=x onerror=alert(1)>',
      '',
    ),
    false,
  );
});
