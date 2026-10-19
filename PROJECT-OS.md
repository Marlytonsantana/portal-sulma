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

## Current State (19/10/2026)
- ✅ Visual approved 10/10
- ✅ 4 pautas structured in posts.json (all publicationAuthorized: false)
- ✅ Workflow green (last: e888c5b)
- ✅ Files deployed to public_html/ (index.html, assets/, styles.css, app.js, content.js, feeds, sitemap)
- ✅ .htaccess fixed: root serves index.html, WP paths preserved
- ⏳ Awaiting: LiteSpeed cache purge confirmation, final visual verification

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