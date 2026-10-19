(() => {
  'use strict';
  const data = window.PORTAL_EDITORIAL;
  if (!data || !Array.isArray(data.stories)) return;

  const body = document.body;
  const root = document.documentElement;
  const grid = document.querySelector('[data-story-grid]');
  const carousel = document.querySelector('[data-carousel]');
  const count = document.querySelector('#result-count');
  const search = document.querySelector('#search');
  let filter = 'all';

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&','<':'<','>':'>',"'":''','"':'"'}[char]));
  const sourceHTML = story => story.sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.name)}</a><small>${escapeHTML(source.type)} · ${source.accessed ? 'acesso registrado' : 'acesso não confirmado'} · ${escapeHTML(source.note)}</small></li>`).join('');
  const storyHTML = (story, index) => `<article class="story-card" data-tone="${escapeHTML(story.tone)}" data-checking="${escapeHTML(story.checking)}" data-article-id="${escapeHTML(story.slug)}">
    <div class="story-media" data-index="0${index + 1}" aria-hidden="true"></div>
    <div class="story-content">
      <div class="card-top"><span class="tag">${escapeHTML(story.section)} · pauta</span><span class="status">${escapeHTML(story.editorialStatus.replaceAll('_',' '))}</span></div>
      <h3>${escapeHTML(story.title)}</h3>
      <p class="summary">${escapeHTML(story.summary)}</p>
      <div class="card-meta"><span>${escapeHTML(story.id)}</span><span>${escapeHTML(story.locality)}</span><span>Checagem: ${escapeHTML(story.checking.replaceAll('_',' '))}</span></div>
      <p class="caveat"><strong>Caveat:</strong> ${escapeHTML(story.caveat)}</p>
      <details class="story-details"><summary>Fontes e ficha de verificação</summary>
        <dl><dt>Pendência</dt><dd>${escapeHTML(story.pending)}</dd><dt>Responsáveis</dt><dd>${escapeHTML(story.lead)} · revisão ${escapeHTML(story.review)}</dd><dt>Recomendação</dt><dd>${escapeHTML(story.recommendation.replaceAll('_',' '))}</dd><dt>Notas Radar</dt><dd>relevância ${escapeHTML(story.relevance)} · apuração ${escapeHTML(story.reporting)}</dd></dl>
        <ul class="sources">${sourceHTML(story)}</ul>
      </details>
      <p class="publication-lock">● Publicação não autorizada</p>
    </div>
  </article>`;

  const radarHTML = story => `<article class="radar-card" style="--accent:var(--${escapeHTML(story.tone)})"><small>${escapeHTML(story.id)} · ${escapeHTML(story.checking.replaceAll('_',' '))}</small><h3>${escapeHTML(story.title)}</h3><p>${escapeHTML(story.pending)}</p><strong>${escapeHTML(story.recommendation.replaceAll('_',' '))}</strong></article>`;

  function visibleStories() {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    return data.stories.filter(story => {
      const statusMatch = filter === 'all' || (filter === 'confirmed' && story.checking === 'CONFIRMADA') || (filter === 'pending' && story.checking !== 'CONFIRMADA');
      const haystack = [story.title, story.summary, story.locality, story.section, story.id, story.pending].join(' ').toLocaleLowerCase('pt-BR');
      return statusMatch && (!query || haystack.includes(query));
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
    count.textContent = `${stories.length} ${stories.length === 1 ? 'pauta exibida' : 'pautas exibidas'}`;
    // Animar cards após render
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.story-card');
      animateStoryCards(cards);
    });
  }

  carousel.innerHTML = data.stories.map(radarHTML).join('');
  render();

  document.querySelectorAll('[data-layout-choice]').forEach(button => button.addEventListener('click', () => {
    const layout = button.dataset.layoutChoice;
    body.dataset.layout = layout;
    document.querySelectorAll('[data-layout-choice]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    try { localStorage.setItem('portal-layout', layout); } catch (_) {}
    // Re-animar cards ao trocar layout
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.story-card');
      animateStoryCards(cards);
    });
  }));

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    render();
  }));
  search.addEventListener('input', render);

  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = document.querySelector('[data-theme-label]');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeLabel.textContent = dark ? 'Tema claro' : 'Tema escuro';
    try { localStorage.setItem('portal-theme', theme); } catch (_) {}
  }
  themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const scrollCarousel = direction => {
    const card = carousel.querySelector('.radar-card');
    const distance = card ? card.getBoundingClientRect().width + 15 : carousel.clientWidth * .8;
    carousel.scrollBy({left: direction * distance, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  };
  document.querySelector('[data-carousel-prev]').addEventListener('click', () => scrollCarousel(-1));
  document.querySelector('[data-carousel-next]').addEventListener('click', () => scrollCarousel(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollCarousel(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  // Animação de entrada do carousel (stagger horizontal)
  function animateCarouselCards() {
    if (typeof motion === 'undefined') return;
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const cards = carousel.querySelectorAll('.radar-card');
    motion.animate(cards, { opacity: [0, 1], x: [30, 0] }, { duration: 0.35, easing: 'ease-out', delay: motion.stagger(0.06) });
  }
  requestAnimationFrame(animateCarouselCards);

  let storedLayout = 'pulse'; let storedTheme = '';
  try { storedLayout = localStorage.getItem('portal-layout') || 'pulse'; storedTheme = localStorage.getItem('portal-theme') || ''; } catch (_) {}
  if (!['pulse','ledger','horizon'].includes(storedLayout)) storedLayout = 'pulse';
  const layoutButton = document.querySelector(`[data-layout-choice="${storedLayout}"]`);
  if (layoutButton) layoutButton.click();
  applyTheme(storedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  // Web Vitals reporting (console + localStorage para debug)
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