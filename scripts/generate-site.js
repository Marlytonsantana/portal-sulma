'use strict';

const fs = require('fs');
const path = require('path');
const { renderContacts } = require('./contact-links');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'data', 'posts.json');
const DIST_DIR = path.join(ROOT, 'dist');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const { site } = data;

const publishedPosts = data.posts
  .filter(post => post.publicationAuthorized === true)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyAssets() {
  ensureDir(DIST_DIR);
  fs.rmSync(path.join(DIST_DIR, 'assets'), { recursive: true, force: true });
  fs.cpSync(path.join(ROOT, 'assets'), path.join(DIST_DIR, 'assets'), { recursive: true });
  for (const filename of ['styles.css', 'app.js']) {
    fs.copyFileSync(path.join(ROOT, filename), path.join(DIST_DIR, filename));
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function rootPath(relativePath) {
  return '/' + String(relativePath || '').replace(/^\/+/, '');
}

function formatDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateStr || ''))) return '';
  const [year, month, day] = dateStr.split('-');
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  return `${day} ${months[Number(month) - 1]} ${year}`;
}

function storyRecord(post) {
  return {
    id: post.id,
    slug: post.slug,
    section: post.section,
    tone: post.tone,
    title: post.title,
    summary: post.excerpt,
    locality: post.locality || (post.tags || []).join(' '),
    date: post.date,
    lead: post.author,
    image: post.image ? rootPath(post.image) : '',
    imageAlt: post.imageAlt || '',
    publicationAuthorized: true
  };
}

function storyMarkup(post, index) {
  const href = `/artigo/${encodeURIComponent(post.slug)}/`;
  const image = post.image
    ? `<img src="${escapeHtml(rootPath(post.image))}" alt="${escapeHtml(post.imageAlt || '')}" loading="${index === 0 ? 'eager' : 'lazy'}" width="1200" height="630">`
    : '';
  return `<article class="story-card" data-tone="${escapeHtml(post.tone || 'blue')}" data-category="${escapeHtml(post.section)}" data-article-id="${escapeHtml(post.slug)}" data-href="${href}" tabindex="0" role="link">
    <a class="story-media" data-index="${String(index + 1).padStart(2, '0')}" href="${href}" aria-label="Abrir: ${escapeHtml(post.title)}">${image}</a>
    <div class="story-content">
      <div class="card-top"><span class="tag">${escapeHtml(post.section)}</span></div>
      <h3><a href="${href}">${escapeHtml(post.title)}</a></h3>
      <p class="summary">${escapeHtml(post.excerpt)}</p>
      <div class="card-meta"><span>${escapeHtml(post.author)}</span><span>${formatDate(post.date)}</span></div>
    </div>
  </article>`;
}

function headerMarkup(assetPrefix = '') {
  const home = assetPrefix || '/';
  return `<header class="site-header">
    <div class="masthead shell">
      <a class="brand" href="${home}" aria-label="${escapeHtml(site.name)} — início"><img src="${assetPrefix}assets/portal-sulma-logo-sanitized.svg" alt="${escapeHtml(site.name)}"></a>
      ${renderContacts(site)}
      <button class="compact-button theme-toggle" type="button" aria-pressed="false"><span aria-hidden="true">◐</span><span data-theme-label>Tema escuro</span></button>
    </div>
    <nav class="section-nav" aria-label="Navegação principal"><div class="shell nav-scroll">
      <a href="${home}"${assetPrefix ? '' : ' class="active" data-category="all"'}>Início</a>
      <a href="${assetPrefix ? '/?categoria=Politica%20regional' : '#topo'}"${assetPrefix ? '' : ' data-category="Politica regional"'}>Política</a>
      <a href="${assetPrefix ? '/?categoria=Economia%20%26%20agro' : '#topo'}"${assetPrefix ? '' : ' data-category="Economia & agro"'}>Economia &amp; Agro</a>
      <a href="${assetPrefix ? '/?categoria=Sociedade' : '#topo'}"${assetPrefix ? '' : ' data-category="Sociedade"'}>Cidades</a>
      <a href="${assetPrefix ? '/?categoria=Regi%C3%A3o' : '#topo'}"${assetPrefix ? '' : ' data-category="Região"'}>Região</a>
    </div></nav>
  </header>`;
}

function footerMarkup(assetPrefix = '') {
  return `<footer class="site-footer"><div class="shell footer-grid">
    <img src="${assetPrefix}assets/portal-sulma-logo-sanitized.svg" alt="${escapeHtml(site.name)}">
    <p>Portal Sul MA — Jornalismo independente do Sul do Maranhão.</p>
    <div class="footer-links">${renderContacts(site)}<a href="#topo">Voltar ao topo ↑</a></div>
  </div></footer>`;
}

function generateContentScript() {
  return `window.PORTAL_EDITORIAL = ${JSON.stringify({ stories: publishedPosts.map(storyRecord) }, null, 2)};\n`;
}

function indexTemplate() {
  const count = publishedPosts.length;
  const cards = publishedPosts.map(storyMarkup).join('\n');
  const social = [site.social?.instagram, site.social?.facebook].filter(Boolean);
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['WebSite', 'NewsMediaOrganization'],
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/${site.logo}` } },
    sameAs: social,
    potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' }
  };
  return `<!doctype html>
<html lang="pt-BR" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escapeHtml(site.description)}"><meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0865d1" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0c1929" media="(prefers-color-scheme: dark)">
<title>${escapeHtml(site.name)} — ${escapeHtml(site.description)}</title><link rel="canonical" href="${site.url}/">
<link rel="preload" as="style" href="styles.css"><link rel="stylesheet" href="styles.css"><noscript><link rel="stylesheet" href="styles.css"></noscript>
<meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(site.name)}"><meta property="og:description" content="${escapeHtml(site.description)}"><meta property="og:url" content="${site.url}/"><meta property="og:image" content="${site.url}/${site.logo}"><meta property="og:site_name" content="${escapeHtml(site.name)}"><meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(site.name)}"><meta name="twitter:description" content="${escapeHtml(site.description)}"><meta name="twitter:image" content="${site.url}/${site.logo}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script src="content.js" defer></script><script src="app.js" defer></script><script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.min.js" defer></script><script src="https://cdn.jsdelivr.net/npm/web-vitals@latest/dist/web-vitals.attribution.iife.js" defer></script>
</head><body data-layout="pulse"><a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
${headerMarkup('')}
<main id="conteudo">
  <section class="hero shell" id="topo" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${escapeHtml(site.name)}</p><h1 id="hero-title">O jornalismo independente e a cobertura aprofundada do Sul do Maranhão</h1></div><div class="hero-signal" aria-hidden="true"><span>${String(count).padStart(2, '0')}</span><b>NOTÍCIAS</b><i></i></div></section>
  <section class="control-deck" aria-labelledby="view-title"><div class="shell controls-grid"><div><p class="control-label" id="view-title">Composição da capa</p><div class="layout-switcher" role="group" aria-labelledby="view-title"><button type="button" data-layout-choice="pulse" aria-pressed="true"><span>01</span> Pulse</button><button type="button" data-layout-choice="ledger" aria-pressed="false"><span>02</span> Ledger</button><button type="button" data-layout-choice="horizon" aria-pressed="false"><span>03</span> Horizon</button></div></div><div class="search-panel"><label for="search">Buscar notícias</label><input id="search" type="search" placeholder="Balsas, gasolina, chuva…" autocomplete="off"></div></div></section>
  <section class="stories shell" id="pautas" aria-labelledby="stories-title"><div class="section-heading"><div><p class="eyebrow">Últimas notícias</p><h2 id="stories-title">Principais manchetes</h2></div><p id="result-count" role="status" aria-live="polite">${count} ${count === 1 ? 'notícia exibida' : 'notícias exibidas'}</p></div><div class="story-grid" data-story-grid>${cards}</div><noscript><p class="noscript">As notícias permanecem disponíveis; busca, filtros e troca de layout exigem JavaScript.</p></noscript></section>
</main>
${footerMarkup('')}
<template id="empty-template"><div class="empty-state"><strong>Nenhuma notícia encontrada.</strong><span>Ajuste a busca ou o filtro.</span></div></template>
</body></html>`;
}

function articleTemplate(post) {
  const url = `${site.url}/artigo/${post.slug}/`;
  const imageUrl = post.image ? `${site.url}/${post.image}` : `${site.url}/${site.logo}`;
  const publishedAt = new Date(`${post.date}T00:00:00-03:00`).toISOString();
  const imageMarkup = post.image ? `<figure class="article-media"><img src="${escapeHtml(rootPath(post.image))}" alt="${escapeHtml(post.imageAlt || '')}" width="1200" height="630"><figcaption>${escapeHtml(post.imageCaption || 'Imagem ilustrativa.')}</figcaption></figure>` : '';
  const shareText = `${post.title} — ${url}`;
  const shareMarkup = `<nav class="article-share" aria-label="Compartilhar esta notícia"><strong>Compartilhe</strong><div class="share-links"><a class="share-button share-button--whatsapp" href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener noreferrer">WhatsApp</a><a class="share-button share-button--facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer">Facebook</a><a class="share-button share-button--x" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer">X</a><a class="share-button share-button--instagram" href="https://www.instagram.com/portalsulma/" target="_blank" rel="noopener noreferrer" title="Abra o Instagram do Portal Sul MA e compartilhe pelo aplicativo">Instagram</a><a class="share-button share-button--email" href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareText)}">E-mail</a><button class="share-button share-button--copy" type="button" data-copy-url="${escapeHtml(url)}">Copiar link</button><button class="share-button share-button--native" type="button" data-native-share data-share-title="${escapeHtml(post.title)}" data-share-url="${escapeHtml(url)}">Compartilhar</button></div><p class="share-note">No celular, “Compartilhar” abre as opções disponíveis, incluindo WhatsApp e Instagram.</p></nav>`;
  const disclosure = post.author ? `<p class="editorial-disclosure"><strong>${escapeHtml(post.author)}</strong> é uma persona editorial assistida por IA, com supervisão humana do Portal Sul MA.</p>` : '';
  return `<!doctype html>
<html lang="pt-BR" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(post.excerpt)}"><meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0865d1" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0c1929" media="(prefers-color-scheme: dark)">
<title>${escapeHtml(post.title)} — ${escapeHtml(site.name)}</title><link rel="canonical" href="${url}"><link rel="preload" as="style" href="/styles.css"><link rel="stylesheet" href="/styles.css"><noscript><link rel="stylesheet" href="/styles.css"></noscript>
<meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(post.title)}"><meta property="og:description" content="${escapeHtml(post.excerpt)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${imageUrl}"><meta property="og:site_name" content="${escapeHtml(site.name)}"><meta property="article:published_time" content="${publishedAt}"><meta property="article:modified_time" content="${publishedAt}"><meta property="article:author" content="${escapeHtml(post.author)}"><meta property="article:section" content="${escapeHtml(post.section)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(post.title)}"><meta name="twitter:description" content="${escapeHtml(post.excerpt)}"><meta name="twitter:image" content="${imageUrl}"><script type="application/ld+json">${JSON.stringify(post.structuredData)}</script>
<script src="/app.js" defer></script><script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.min.js" defer></script><script src="https://cdn.jsdelivr.net/npm/web-vitals@latest/dist/web-vitals.attribution.iife.js" defer></script>
</head><body data-layout="pulse"><a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
${headerMarkup('/')}
<main id="conteudo"><article id="topo"><header class="article-hero shell" aria-labelledby="article-title"><p class="eyebrow">${escapeHtml(post.section)}</p><h1 id="article-title">${escapeHtml(post.title)}</h1><div class="article-meta"><span>${escapeHtml(post.author)}</span><span>${formatDate(post.date)}</span></div>${shareMarkup}</header>
${imageMarkup}
<section class="article-section shell" aria-label="Texto da notícia"><div class="article-body">${post.content}</div>${disclosure}<div class="article-closing"><span>${escapeHtml(post.author)}</span><span>${formatDate(post.date)}</span></div></section></article></main>
${footerMarkup('/')}
</body></html>`;
}

function generateSitemap() {
  const urls = [{ url: `${site.url}/`, lastmod: data.lastUpdated, changefreq: 'daily', priority: '1.0' }]
    .concat(publishedPosts.map(post => ({ url: `${site.url}/artigo/${post.slug}/`, lastmod: post.date, changefreq: 'monthly', priority: '0.7' })));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(item => `  <url><loc>${item.url}</loc><lastmod>${item.lastmod}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`).join('\n')}\n</urlset>`;
}

function generateRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /scripts/\nDisallow: /data/\n\nSitemap: ${site.url}/sitemap.xml\nHost: ${site.url}\n`;
}

function generateRSS() {
  const items = publishedPosts.map(post => `<item><title><![CDATA[${post.title}]]></title><link>${site.url}/artigo/${post.slug}/</link><guid isPermaLink="true">${site.url}/artigo/${post.slug}/</guid><description><![CDATA[${post.excerpt}]]></description><pubDate>${new Date(`${post.date}T00:00:00-03:00`).toUTCString()}</pubDate><category>${escapeHtml(post.section)}</category><author>${escapeHtml(post.author)}</author></item>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeHtml(site.name)}</title><link>${site.url}/</link><description>${escapeHtml(site.description)}</description><language>pt-BR</language><lastBuildDate>${new Date(data.lastUpdated).toUTCString()}</lastBuildDate><atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />${items}</channel></rss>`;
}

function generateJSONFeed() {
  const items = publishedPosts.map(post => ({ id: `${site.url}/artigo/${post.slug}/`, url: `${site.url}/artigo/${post.slug}/`, title: post.title, content_html: post.content, summary: post.excerpt, date_published: new Date(`${post.date}T00:00:00-03:00`).toISOString(), authors: [{ name: post.author }], tags: post.tags || [] }));
  return JSON.stringify({ version: 'https://jsonfeed.org/version/1.1', title: site.name, home_page_url: `${site.url}/`, feed_url: `${site.url}/feed.json`, description: site.description, language: 'pt-BR', items }, null, 2);
}

console.log('[generate-site] Iniciando...');
copyAssets();
const contentScript = generateContentScript();
fs.writeFileSync(path.join(ROOT, 'content.js'), contentScript);
fs.writeFileSync(path.join(DIST_DIR, 'content.js'), contentScript);
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexTemplate());
fs.rmSync(path.join(DIST_DIR, 'artigo'), { recursive: true, force: true });
for (const post of publishedPosts) {
  const articleDir = path.join(DIST_DIR, 'artigo', post.slug);
  ensureDir(articleDir);
  fs.writeFileSync(path.join(articleDir, 'index.html'), articleTemplate(post));
}
fs.rmSync(path.join(DIST_DIR, 'data'), { recursive: true, force: true });
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap());
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), generateRobots());
fs.writeFileSync(path.join(DIST_DIR, 'feed.xml'), generateRSS());
fs.writeFileSync(path.join(DIST_DIR, 'feed.json'), generateJSONFeed());
console.log(`[generate-site] OK: ${publishedPosts.length} artigo(s) publicado(s); dist pronto para validação.`);
