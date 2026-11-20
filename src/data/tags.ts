export const TAGS = [
  'lavoro',
  'libri',
  'tecnologia',
  'vita',
  'progetti',
] as const;

export type Tag = (typeof TAGS)[number];
