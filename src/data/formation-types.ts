export type Formation = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  objectives: string[] | null;
  duration: string | null;
  prerequisites: string | null;
  careers: string[] | null;
  modalities: string | null;
  status: 'documented';
  source: string;
  sourcePage: number;
  validatedAt: string | null;
  illustration: 'industry' | 'transport' | 'logistics';
};
