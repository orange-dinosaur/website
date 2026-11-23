import assert from 'node:assert/strict';
import { test } from 'node:test';
import { slugify } from './new.mjs';

test('accents stripped, apostrophes become hyphens', () => {
  assert.equal(
    slugify("L'estate in cui ho smesso di leggere perché"),
    'l-estate-in-cui-ho-smesso-di-leggere-perche',
  );
});

test('quotes and punctuation at the edges are dropped', () => {
  assert.equal(slugify('"Dune", di nuovo!'), 'dune-di-nuovo');
});
