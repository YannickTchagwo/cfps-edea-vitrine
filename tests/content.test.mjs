import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  sourceFormations,
  formationSource,
  poles,
} from '../src/data/source-formations.ts';

test('la rubrique Édéa contient exactement 11 métiers dans les trois pôles du PDF', () => {
  assert.equal(sourceFormations.length, 11);
  assert.deepEqual(
    Object.fromEntries(
      poles.map((p) => [
        p.name,
        sourceFormations.filter((f) => f.domain === p.name).length,
      ]),
    ),
    {
      'Maintenance industrielle': 4,
      Transport: 3,
      Logistique: 4,
    },
  );
  assert.equal(
    sourceFormations.find((f) => f.title === 'Responsable transport').domain,
    'Logistique',
  );
  assert.ok(
    !sourceFormations.some((f) =>
      /boucher|laborantin|boulanger|traiteur|qualité/i.test(f.title),
    ),
  );
});

test('intitulés et provenance traçables sans validation institutionnelle inventée', () => {
  assert.equal(new Set(sourceFormations.map((f) => f.slug)).size, 11);
  assert.equal(new Set(sourceFormations.map((f) => f.id)).size, 11);
  assert.equal(formationSource.documentDate, null);
  assert.equal(
    formationSource.sha256,
    '9f1333aca10041b0b1ae3e3f6907a826191ea9dbdda2fdb7af71316312339c9f',
  );
  for (const f of sourceFormations) {
    assert.equal(f.status, 'documented');
    assert.equal(f.sourcePage, 1);
    assert.equal(f.validatedAt, null);
    assert.match(f.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test('aucun programme, durée, prérequis ou débouché non fourni n’est inventé', () => {
  for (const f of sourceFormations) {
    for (const field of [
      'objectives',
      'duration',
      'prerequisites',
      'careers',
      'modalities',
    ])
      assert.equal(f[field], null, `${f.slug}: ${field}`);
  }
});
