// Minify overlay-bookmarklet.js with terser and inline it into overlay-bookmarklet.html.
// Usage: npm install && npm run build
import { readFile, writeFile } from 'node:fs/promises';
import { minify } from 'terser';

const SRC = 'overlay-bookmarklet.js';
const PAGE = 'overlay-bookmarklet.html';
// Characters left raw in the javascript: URL. Everything else is percent-encoded,
// so the attribute stays free of %, #, quotes, <, >, & and non-ASCII.
const SAFE = /[A-Za-z0-9\-_.!~*'(),;:\/?@$+=^`|\\[\]{} ]/;

function toUrl(code) {
  const utf8 = new TextEncoder();
  let out = '';
  for (const ch of code) {
    if (SAFE.test(ch)) { out += ch; continue; }
    for (const byte of utf8.encode(ch)) out += '%' + byte.toString(16).padStart(2, '0');
  }
  return 'javascript:' + out;
}

const source = await readFile(SRC, 'utf8');
const { code } = await minify(source, { compress: { passes: 3 }, mangle: true, format: { comments: false } });
new Function(code); // fails loudly on a syntax error instead of shipping a broken bookmarklet

const url = toUrl(code);
const page = await readFile(PAGE, 'utf8');
const anchor = /(<a class="btn" id="install" href=")[^"]*(")/;
if (!anchor.test(page)) throw new Error(`could not find the #install anchor in ${PAGE}`);
const out = page.replace(anchor, (_, before, after) => before + url + after);

await writeFile(PAGE, out);
console.log(`${SRC} → ${PAGE}: ${(code.length / 1024).toFixed(1)} kB minified, ${(url.length / 1024).toFixed(1)} kB as a bookmarklet`);
