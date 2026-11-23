// Usage: pnpm new post|project "Titolo" [slug]
import { readFileSync, writeFileSync } from 'node:fs';
import { format, resolveConfig } from 'prettier';

const FOLDERS = { post: 'src/content/posts', project: 'src/content/projects' };
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function slugify(title) {
  return title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main([kind, title, slug = slugify(title ?? '')]) {
  if (!FOLDERS[kind] || !title || !SLUG.test(slug)) {
    console.error('Usage: pnpm new post|project "Titolo" [slug]');
    if (title && !SLUG.test(slug)) console.error(`Invalid slug: "${slug}"`);
    process.exit(1);
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const raw = readFileSync(`templates/${kind}.md`, 'utf8')
    // JSON strings are valid YAML, so quotes and apostrophes in titles are safe.
    .replace('__TITLE__', JSON.stringify(title))
    .replace('__DATE__', date)
    .replace('__YEAR__', String(now.getFullYear()));

  const path = `${FOLDERS[kind]}/${slug}.md`;
  // Prettier picks the quote style, so the new file passes format:check.
  const text = await format(raw, {
    ...(await resolveConfig(path)),
    filepath: path,
  });
  try {
    writeFileSync(path, text, { flag: 'wx' });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
    console.error(`${path} already exists`);
    process.exit(1);
  }
  console.log(path);
}

if (import.meta.main) await main(process.argv.slice(2));
