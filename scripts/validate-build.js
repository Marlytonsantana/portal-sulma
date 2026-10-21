'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'posts.json'), 'utf8'));
const published = data.posts.filter(post => post.publicationAuthorized === true)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)));
const drafts = data.posts.filter(post => post.publicationAuthorized !== true);
const errors = [];

function requireFile(relativePath) {
  const fullPath = path.join(dist, relativePath);
  if (!fs.existsSync(fullPath)) errors.push(`arquivo ausente: dist/${relativePath.replace(/\\/g, '/')}`);
  return fullPath;
}

function readDist(relativePath) {
  const fullPath = requireFile(relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
}

function assert(label, condition) {
  if (!condition) errors.push(label);
}

const ids = new Set();
const slugs = new Set();
for (const post of data.posts) {
  assert(`id ausente: ${post.slug || '(sem slug)'}`, Boolean(post.id));
  assert(`slug inválido: ${post.slug || '(vazio)'}`, /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug || ''));
  assert(`id duplicado: ${post.id}`, !ids.has(post.id));
  assert(`slug duplicado: ${post.slug}`, !slugs.has(post.slug));
  ids.add(post.id);
  slugs.add(post.slug);
}

const contact = data.site.contact || {};
assert('e-mail oficial incorreto em posts.json', contact.email === 'contato@portalsulma.com');
assert('WhatsApp oficial incorreto em posts.json', contact.whatsapp === '5598991072673');
assert('Instagram oficial incorreto em posts.json', data.site.social?.instagram === 'https://www.instagram.com/portalsulma/');

const index = readDist('index.html');
const content = readDist('content.js');
const sitemap = readDist('sitemap.xml');
const feedXml = readDist('feed.xml');
const feedJson = readDist('feed.json');
const publicText = [index, content, sitemap, feedXml, feedJson].join('\n');

assert('capa sem grade SSR', /<div class="story-grid" data-story-grid>\s*<article class="story-card"/.test(index) || published.length === 0);
assert('capa sem e-mail oficial', index.includes('mailto:contato@portalsulma.com'));
assert('capa sem WhatsApp oficial', index.includes('https://wa.me/5598991072673'));
assert('capa sem Instagram oficial', index.includes('https://www.instagram.com/portalsulma/'));
assert('capa sem ícones locais', index.includes('contact-icon--instagram') && index.includes('contact-icon--mail') && index.includes('contact-icon--whatsapp'));
assert('dist/data não deve ser publicado', !fs.existsSync(path.join(dist, 'data')));

const orderedPositions = published.map(post => index.indexOf(`data-article-id="${post.slug}"`));
for (let i = 0; i < orderedPositions.length; i += 1) {
  assert(`card SSR ausente ou duplicado: ${published[i].slug}`, orderedPositions[i] >= 0 && index.indexOf(`data-article-id="${published[i].slug}"`, orderedPositions[i] + 1) === -1);
  if (i > 0) assert(`ordem da capa incorreta: ${published[i - 1].slug} deve vir antes de ${published[i].slug}`, orderedPositions[i - 1] < orderedPositions[i]);
}

for (const post of drafts) {
  for (const [target, text] of [['index.html', index], ['content.js', content], ['sitemap.xml', sitemap], ['feed.xml', feedXml], ['feed.json', feedJson]]) {
    assert(`rascunho exposto em ${target}: ${post.slug}`, !text.includes(post.slug));
  }
}

for (const post of published) {
  assert(`post publicado ausente de content.js: ${post.slug}`, content.includes(`"slug": "${post.slug}"`));
  assert(`post publicado ausente do sitemap: ${post.slug}`, sitemap.includes(`/artigo/${post.slug}/`));
  assert(`post publicado ausente do RSS: ${post.slug}`, feedXml.includes(`/artigo/${post.slug}/`));
  assert(`post publicado ausente do JSON Feed: ${post.slug}`, feedJson.includes(`/artigo/${post.slug}/`));

  const articlePath = path.join('artigo', post.slug, 'index.html');
  const html = readDist(articlePath);
  const checks = [
    ['CSS da raiz', html.includes('href="/styles.css"')],
    ['JavaScript da raiz', html.includes('src="/app.js"')],
    ['logo da raiz', html.includes('src="/assets/portal-sulma-logo-sanitized.svg"')],
    ['título preservado', html.includes(post.title.replace(/&/g, '&amp;')) || html.includes(post.title)],
    ['texto aprovado preservado', html.includes(post.content)],
    ['identificação editorial', html.includes('persona editorial assistida por IA')],
    ['e-mail oficial', html.includes('mailto:contato@portalsulma.com')],
    ['WhatsApp oficial', html.includes('https://wa.me/5598991072673')],
    ['Instagram oficial', html.includes('https://www.instagram.com/portalsulma/')],
    ['sem caminhos relativos quebrados', !html.includes('../styles.css') && !html.includes('../app.js') && !html.includes('../assets/')]
  ];
  if (post.image) {
    checks.push(['imagem aprovada', html.includes(`src="/${post.image}"`)]);
    checks.push(['legenda', html.includes(post.imageCaption || 'Imagem ilustrativa.')]);
    assert(`${post.slug}: imagem não copiada para dist`, fs.existsSync(path.join(dist, post.image)));
  }
  for (const [label, ok] of checks) assert(`${post.slug}: ${label}`, ok);
}

const articleRoot = path.join(dist, 'artigo');
const articleDirs = fs.existsSync(articleRoot)
  ? fs.readdirSync(articleRoot, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name)
  : [];
const allowed = new Set(published.map(post => post.slug));
for (const slug of articleDirs) assert(`artigo não autorizado ou obsoleto em dist: ${slug}`, allowed.has(slug));
for (const slug of allowed) assert(`diretório de artigo publicado ausente: ${slug}`, articleDirs.includes(slug));

const prototypeSlugs = ['hospital-balsas', 'combustivel-balsas-imperatriz', 'homicidios-municipios', 'chuvas-matopiba'];
for (const slug of prototypeSlugs) {
  if (!allowed.has(slug)) assert(`conteúdo fictício antigo exposto: ${slug}`, !publicText.includes(slug));
}

for (const icon of ['instagram.svg', 'mail.svg', 'whatsapp.svg']) requireFile(path.join('assets', 'icons', icon));
requireFile('styles.css');
requireFile('app.js');

if (errors.length) {
  console.error('[validate-build] FALHA');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[validate-build] OK: ${published.length} artigo(s), SSR, contatos, caminhos, feeds e assets válidos; ${drafts.length} rascunho(s) não exposto(s).`);
