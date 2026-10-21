(() => {
  'use strict';
  const body = document.body;
  const root = document.documentElement;

  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = document.querySelector('[data-theme-label]');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (themeButton) themeButton.setAttribute('aria-pressed', String(dark));
    if (themeLabel) themeLabel.textContent = dark ? 'Tema claro' : 'Tema escuro';
    try { localStorage.setItem('portal-theme', theme); } catch (_) {}
  }
  if (themeButton) themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  let storedTheme = '';
  try { storedTheme = localStorage.getItem('portal-theme') || ''; } catch (_) {}
  const requestedTheme = new URLSearchParams(location.search).get('theme');
  const initialTheme = ['light', 'dark'].includes(requestedTheme)
    ? requestedTheme
    : (storedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  applyTheme(initialTheme);

  const data = window.PORTAL_EDITORIAL;
  if (!data || !Array.isArray(data.stories)) return;

  const grid = document.querySelector('[data-story-grid]');
  const count = document.querySelector('#result-count');
  const search = document.querySelector('#search');
  if (!grid || !count || !search) return;
  let currentCategory = 'all';

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&',
    '<': '<',
    '>': '>',
    "'": '\'',
    '"': '"'
  }[char]));

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return `${d} ${months[parseInt(m) - 1]} ${y}`;
  };

  const storyHTML = (story, index) => `<article class="story-card" data-tone="${escapeHTML(story.tone)}" data-category="${escapeHTML(story.section)}" data-article-id="${escapeHTML(story.slug)}">
    <a class="story-media" data-index="0${index + 1}" href="/artigo/${encodeURIComponent(story.slug)}/" aria-label="Abrir: ${escapeHTML(story.title)}">${story.image ? `<img src="${escapeHTML(story.image)}" alt="${escapeHTML(story.imageAlt || '')}" loading="lazy" width="1200" height="630">` : ''}</a>
    <div class="story-content">
      <div class="card-top"><span class="tag">${escapeHTML(story.section)}</span></div>
      <h3><a href="/artigo/${encodeURIComponent(story.slug)}/">${escapeHTML(story.title)}</a></h3>
      <p class="summary">${escapeHTML(story.summary)}</p>
      <div class="card-meta"><span>${escapeHTML(story.lead)}</span><span>${formatDate(story.date)}</span></div>
    </div>
  </article>`;

  function visibleStories() {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    return data.stories.filter(story => {
      const categoryMatch = currentCategory === 'all' || story.section === currentCategory;
      const haystack = [story.title, story.summary, story.locality, story.section, story.id].join(' ').toLocaleLowerCase('pt-BR');
      return categoryMatch && (!query || haystack.includes(query));
    });
  }

  function animateStoryCards(cards) {
    if (typeof motion === 'undefined') return;
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    motion.animate(cards, { opacity: [0, 1], y: [20, 0] }, { duration: 0.4, easing: 'ease-out', delay: motion.stagger(0.08) });
  }

  function render() {
    const stories = visibleStories();
    grid.innerHTML = stories.length ? stories.map(storyHTML).join('') : document.querySelector('#empty-template').innerHTML;
    count.textContent = `${stories.length} ${stories.length === 1 ? 'notícia exibida' : 'notícias exibidas'}`;
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.story-card');
      animateStoryCards(cards);
    });
  }

  // O build já entrega os cards autorizados no HTML. O JavaScript só aprimora
  // a experiência; se falhar ou estiver desativado, a capa continua legível.
  const initialParams = new URLSearchParams(location.search);
  const requestedQuery = initialParams.get('q') || '';
  const requestedCategory = initialParams.get('categoria') || 'all';
  if (requestedQuery) search.value = requestedQuery;
  if (requestedCategory !== 'all' && data.stories.some(story => story.section === requestedCategory)) {
    currentCategory = requestedCategory;
    document.querySelectorAll('[data-category]').forEach(item => item.classList.toggle('active', item.dataset.category === currentCategory));
  }
  if (requestedQuery || currentCategory !== 'all') {
    render();
  } else {
    const cards = grid.querySelectorAll('.story-card');
    count.textContent = `${cards.length} ${cards.length === 1 ? 'notícia exibida' : 'notícias exibidas'}`;
    requestAnimationFrame(() => animateStoryCards(cards));
  }

  document.querySelectorAll('[data-layout-choice]').forEach(button => button.addEventListener('click', () => {
    const layout = button.dataset.layoutChoice;
    body.dataset.layout = layout;
    document.querySelectorAll('[data-layout-choice]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    try { localStorage.setItem('portal-layout', layout); } catch (_) {}
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.story-card');
      animateStoryCards(cards);
    });
  }));

  document.querySelectorAll('[data-category]').forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault();
    currentCategory = link.dataset.category;
    document.querySelectorAll('[data-category]').forEach(item => item.classList.toggle('active', item === link));
    render();
  }));

  search.addEventListener('input', render);

  let storedLayout = initialParams.get('layout') || 'pulse';
  if (!initialParams.get('layout')) {
    try { storedLayout = localStorage.getItem('portal-layout') || 'pulse'; } catch (_) {}
  }
  if (!['pulse','ledger','horizon'].includes(storedLayout)) storedLayout = 'pulse';
  const layoutButton = document.querySelector(`[data-layout-choice="${storedLayout}"]`);
  if (layoutButton) layoutButton.click();

  if (typeof webVitals !== 'undefined') {
    const vitals = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB'];
    vitals.forEach(name => {
      webVitals[name] && webVitals[name](metric => {
        console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}${metric.delta ? ` (delta: ${metric.delta.toFixed(2)})` : ''}`);
        try { localStorage.setItem(`wv-${metric.name.toLowerCase()}`, JSON.stringify({ value: metric.value, rating: metric.rating, timestamp: Date.now() })); } catch (_) {}
      });
    });
  }
})();