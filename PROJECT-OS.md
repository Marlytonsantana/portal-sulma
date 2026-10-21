# PROJECT-OS — Portal Sul MA

## Project Root
`projects/portal-sulma-preview/dynamic-editorial-preview/`

## Objective
Portal de notícias estático (HTML/CSS/JS vanilla) gerado via Node.js custom script, deployado via rsync no Hostinger preservando WordPress existente.

## Stack Frozen
- Build: `node scripts/generate-site.js` → `dist/`
- Data: `data/posts.json` (source of truth)
- Deploy: GitHub Actions → rsync (burnett01/rsync-deployments@v7)
- Hosting: Hostinger `45.152.44.56:65002` / `public_html/`
- Frontend: Vanilla + Motion One CDN + Web Vitals CDN

## Architecture
generate-site.js reads posts.json → outputs dist/ (index.html, artigo/{slug}/, sitemap, feeds, assets)
index.html + styles.css + app.js + content.js = 3 layouts (Pulse/Ledger/Horizon), theme toggle, search, radar carousel

## Critical Rules
- ❌ NO Next.js/React in build output
- ❌ NO database/CMS — JSON only
- ❌ NO deploy without explicit "pode deployar"
- ✅ RSYNC excludes: wp-content/, wp-config.php, .htaccess, .well-known/, *.log
- ✅ publicationAuthorized: false gate on all posts

## Current State (21/10/2026)
- ✅ 1 matéria real autorizada em `data/posts.json`; protótipos antigos não fazem parte da fonte atual
- ✅ Versão candidata local consolida contatos oficiais, cards SSR, `content.js` gerado, template único de artigo e validação ampliada
- ✅ Build e `scripts/validate-build.js` passam localmente; Chrome real validou desktop/mobile, claro/escuro e Pulse/Ledger/Horizon sem exceções de console
- ✅ `.htaccess` preservado: raiz serve `index.html` e caminhos WordPress continuam excluídos do rsync
- ⏳ Alterações de 21/10 ainda não foram commitadas nem implantadas
- ⏳ IMAP Hostinger ainda requer validação operacional com credencial mascarada e staging seguro
- ⛔ Nenhum deploy sem autorização explícita de Ton

## Commands
```bash
# Build
cd dynamic-editorial-preview && node scripts/generate-site.js

# Verify
ls -la dist/

# Deploy (manual trigger)
# GitHub Actions → workflow_dispatch → production
```

## History
- 12/10: Stack defined, visual identity approved
- 18/10: Sky onboarding flow defined, repo created
- 19/10: Workflow fixes (npm install removed, rsync path fixed), .htaccess corrected

## Next Steps
1. Confirm site live at portalsulma.com (post cache purge)
2. Create GitHub repo secrets replication checklist
3. Sky delivers new pautas/images → Ton approves → Gyn implements