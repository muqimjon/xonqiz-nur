import { writeFileSync } from 'node:fs';

const DOMAIN = 'https://xonqiz.uz';
const LANGS = ['uz', 'ru', 'en'];
const PATHS = [
  '',
  '/katalog',
  '/katalog/elektr',
  '/katalog/santexnika',
  // '/katalog/qurilish',
  '/katalog/asboblar',
  '/katalog/dizayn',
  '/biz-haqimizda',
  '/aloqa',
];

const urls = [];
for (const p of PATHS) {
  for (const lang of LANGS) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${DOMAIN}/${l}${p}"/>`).join('\n');
    urls.push(
      `  <url>\n    <loc>${DOMAIN}/${lang}${p}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/uz${p}"/>\n  </url>`,
    );
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

const out = process.argv[2] || 'public/sitemap.xml';
writeFileSync(out, xml);
console.log(`sitemap: ${urls.length} urls -> ${out}`);
