const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'posts.json'), 'utf8'));
const published = data.posts.filter((post) => post.publicationAuthorized);
const errors = [];

if (published.length !== 1) errors.push(`esperado 1 artigo publicado; encontrado ${published.length}`);

for (const post of published) {
  const articlePath = path.join(dist, 'artigo', post.slug, 'index.html');
  if (!fs.existsSync(articlePath)) {
    errors.push(`artigo ausente: ${articlePath}`);
    continue;
  }

  const html = fs.readFileSync(articlePath, 'utf8');
  const checks = [
    ['CSS da raiz', html.includes('href="/styles.css"')],
    ['JavaScript da raiz', html.includes('src="/app.js"')],
    ['logo da raiz', html.includes('src="/assets/portal-sulma-logo-sanitized.svg"')],
    ['imagem aprovada', html.includes(`src="/${post.image}"`)],
    ['legenda', html.includes(post.imageCaption || 'Imagem ilustrativa')],
    ['identificação editorial', html.includes('persona editorial assistida por IA')],
    ['texto aprovado preservado', html.includes(post.content)],
    ['sem caminhos ../', !html.includes('../')]
  ];
  for (const [label, ok] of checks) if (!ok) errors.push(`${post.slug}: ${label}`);

  if (!fs.existsSync(path.join(dist, post.image))) errors.push(`${post.slug}: imagem não copiada para dist`);
}

const articleRoot = path.join(dist, 'artigo');
const articleDirs = fs.existsSync(articleRoot)
  ? fs.readdirSync(articleRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  : [];
const allowedSlugs = new Set(published.map((post) => post.slug));
for (const slug of articleDirs) if (!allowedSlugs.has(slug)) errors.push(`artigo não autorizado em dist: ${slug}`);

const content = fs.readFileSync(path.join(dist, 'content.js'), 'utf8');
for (const post of data.posts.filter((item) => !item.publicationAuthorized)) {
  if (content.includes(post.slug)) errors.push(`rascunho exposto na capa: ${post.slug}`);
}
if (content.includes('hospital-balsas') || content.includes('combustivel-balsas-imperatriz') || content.includes('homicidios-municipios') || content.includes('chuvas-matopiba')) {
  errors.push('conteúdo fictício antigo ainda exposto em dist/content.js');
}

if (errors.length) {
  console.error('[validate-build] FALHA');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[validate-build] OK: ${published.length} artigo publicado, caminhos e assets válidos, sem rascunhos expostos.`);
