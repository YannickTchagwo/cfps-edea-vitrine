import { demoFormations, type Formation } from './demo-formations';
export const validatedFormations: Formation[] = [];
export const formations =
  import.meta.env.PUBLIC_CONTENT_MODE === 'public'
    ? validatedFormations
    : demoFormations;
export const domains = ['Industrie', 'Bâtiment', 'Logistique'];
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
    !f.objectives.length ||
    !f.careers.length ||
    !f.source ||
    !['demonstration', 'validated'].includes(f.status) ||
    (f.status === 'validated' && !f.validatedAt)
  )
    throw new Error(`Formation invalide : ${f.slug}`);
  slugs.add(f.slug);
  ids.add(f.id);
}
