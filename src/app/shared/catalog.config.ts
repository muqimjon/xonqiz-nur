export type WorldId = 'elektr' | 'santexnika' | 'qurilish' | 'asboblar' | 'dizayn';
export type Accent = 'amber' | 'electric' | 'glow';

export interface WorldMeta {
  id: WorldId;
  slug: string;
  accent: Accent;
}

export const WORLDS: WorldMeta[] = [
  { id: 'elektr', slug: 'elektr', accent: 'amber' },
  { id: 'santexnika', slug: 'santexnika', accent: 'electric' },
  { id: 'qurilish', slug: 'qurilish', accent: 'amber' },
  { id: 'asboblar', slug: 'asboblar', accent: 'electric' },
  { id: 'dizayn', slug: 'dizayn', accent: 'glow' },
];

export const worldBySlug = (slug: string): WorldMeta | undefined =>
  WORLDS.find((w) => w.slug === slug);
