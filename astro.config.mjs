// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://website-pearl-five-38.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      features: {
        gfm: { footnotes: { label: 'Note', backLabel: 'Torna al testo' } },
      },
    }),
  },
});
