// Désactive la télémétrie avant le chargement de la CLI, y compris en environnement restreint.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
await import('../node_modules/astro/bin/astro.mjs');
