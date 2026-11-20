// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://orange-dinosaur.vercel.app',
  output: 'static',
  markdown: {
    processor: satteri({
      features: {
        gfm: { footnotes: { label: 'Note', backLabel: 'Torna al testo' } },
      },
    }),
  },
});
