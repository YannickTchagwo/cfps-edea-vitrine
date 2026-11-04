import { poles, sourceFormations } from './source-formations';
export { formationSource, poles } from './source-formations';
export const formations = sourceFormations;
export const domains: string[] = poles.map((pole) => pole.name);
export const featuredFormations = [formations[0], formations[4], formations[7]];
const slugs = new Set<string>();
const ids = new Set<string>();
for (const f of formations) {
  if (
    !f.id ||
    ids.has(f.id) ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug) ||
    slugs.has(f.slug) ||
    !f.title ||
    !domains.includes(f.domain) ||
    !f.summary ||
    !f.source ||
    f.sourcePage !== 1 ||
    f.status !== 'documented'
  )
    throw new Error(`Formation invalide : ${f.slug}`);
  slugs.add(f.slug);
  ids.add(f.id);
}
