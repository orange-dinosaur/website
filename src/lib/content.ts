import { getCollection } from 'astro:content';

export const published = ({ data }: { data: { draft: boolean } }) =>
  !import.meta.env.PROD || !data.draft;

export async function getPosts() {
  const all = await getCollection('posts');
  // Astro only logs a broken reference, so fail the build here instead.
  // Drafts are checked too, so a typo surfaces before the Post is published.
  const projectIds = new Set(
    (await getCollection('projects')).map((p) => p.id),
  );
  for (const post of all) {
    const ref = post.data.project;
    if (ref && !projectIds.has(ref.id)) {
      throw new Error(`Post "${post.id}": project "${ref.id}" does not exist`);
    }
  }
  return all
    .filter(published)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getProjects() {
  const projects = await getCollection('projects', published);
  return projects.sort((a, b) => b.data.startYear - a.data.startYear);
}

export function readingTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes === 1 ? '1 minuto' : `${minutes} minuti`;
}

export function formatDate(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getUTCFullYear()}`;
}
