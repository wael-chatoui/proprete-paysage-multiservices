// Signale les pages du site à IndexNow (Bing, Yandex, Seznam, Naver…) après une mise en ligne.
// Usage : npm run indexnow            → toutes les URL du sitemap
//         npm run indexnow -- /elagage/ /guides/debroussaillement-obligatoire-landes/
import { readFileSync } from 'node:fs';

const cle = readFileSync('src/data/indexnow.ts', 'utf8').match(/'([0-9a-f]{32})'/)[1];
const site = readFileSync('src/data/business.ts', 'utf8').match(/SITE_URL = '([^']+)'/)[1];
if (site.includes('DOMAINE-A-DEFINIR')) {
  console.error('Renseignez le domaine définitif dans src/data/business.ts avant de lancer IndexNow.');
  process.exit(1);
}
const host = new URL(site).host;
const args = process.argv.slice(2);
const urls = args.length
  ? args.map((c) => new URL(c, site).href)
  : [...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const rep = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: cle, keyLocation: `${site}/${cle}.txt`, urlList: urls }),
});
console.log(`IndexNow : ${rep.status} ${rep.statusText} pour ${urls.length} URL`);
