# Fluxo editorial e de publicação — Portal Sul MA

Versão operacional: 21/10/2026. O site é estático; `data/posts.json` é a única fonte editorial e `scripts/generate-site.js` produz `dist/`.

## 1. Recebimento

O pacote aprovado chega pela caixa oficial `contato@portalsulma.com` com assunto:

`[PORTAL SUL MA][ENTREGA FINAL] AAAA-MM-DD | <slug> | v<N>`

Anexos esperados:

1. `<slug>-site.json` — objeto de notícia compatível com `data/posts.json`;
2. `<slug>-texto.md` ou HTML — versão humana do texto e fontes;
3. `<slug>-hero.webp` — imagem aprovada, idealmente 1200 × 630 e até 150.000 bytes;
4. `<slug>-manifesto.json` — versão, hashes, aprovações, licença/crédito e estado.

A leitura IMAP só pode ser automatizada depois de validar a credencial pela entrada mascarada do OpenClaw. Nunca guardar senha no repositório, logs ou e-mail.

## 2. Identidade, versão e deduplicação

Antes de salvar anexos na árvore pública:

1. validar o assunto, remetente esperado, slug, versão e JSON;
2. calcular SHA-256 dos anexos e comparar com o manifesto;
3. consultar `data/posts.json`, o registro privado de entregas e a pasta Enviados/Processados;
4. usar como chave idempotente `slug + versão + hash do manifesto`;
5. tratar `id + slug` como identidade editorial canônica.

Regras:

- mesmo `id`/`slug` e mesmos hashes: entrega já processada; não integrar, enviar ou publicar novamente;
- mesmo `id`/`slug`, versão maior e mudança apenas técnica/não material: atualizar o registro existente, preservando URL;
- alteração material de título, corpo, fontes, interpretação ou troca de imagem: voltar para avaliação e nova aprovação;
- novo conteúdo: `id` e `slug` inéditos;
- nunca criar `-v2` só para corrigir a mesma matéria;
- resultado ambíguo de e-mail/deploy: consultar o registro remoto antes de repetir.

## 3. Integração segura

1. extrair primeiro para staging privado, nunca diretamente em `assets/`;
2. validar JSON, HTML, imagem, dimensões, bytes, hashes, licença/crédito e aprovações;
3. incorporar o objeto em `data/posts.json` e a imagem em `assets/<slug>-hero.webp`;
4. manter `publicationAuthorized: false` até existir autorização explícita para colocar aquela versão no ar;
5. para correção já autorizada, preservar a autorização somente quando a evidência cobrir exatamente a versão integrada;
6. atualizar `lastUpdated` e o registro privado de auditoria.

## 4. Build e validação

Executar na raiz do repositório:

```powershell
node scripts/generate-site.js
node scripts/validate-build.js
```

O build:

- filtra somente `publicationAuthorized: true`;
- ordena por data decrescente;
- gera `content.js` e cards SSR da capa a partir dos mesmos dados;
- gera um artigo padronizado por slug;
- remove diretórios antigos de artigos;
- gera sitemap, RSS e JSON Feed somente com conteúdo autorizado;
- não publica `data/`.

A validação bloqueia duplicidade de ID/slug, rascunhos em destinos públicos, caminhos quebrados, ausência de imagem/legenda/transparência editorial, contatos incorretos e artigos obsoletos.

## 5. Preview visual obrigatório

Antes de publicar, abrir `dist/` em navegador real e conferir:

- capa e artigo em desktop e mobile;
- temas claro e escuro;
- layouts Pulse, Ledger e Horizon;
- Roboto Slab nos títulos de notícia e Inter na interface;
- imagem sem distorção, legenda, corpo, fontes e identificação editorial;
- Instagram, WhatsApp e e-mail;
- busca, filtros, troca de layout e tema;
- console sem exceções;
- ausência de rascunhos e conteúdo fictício.

Guardar capturas da versão candidata em `artifacts/` (não são conteúdo do deploy).

## 6. Publicação

Publicar somente com autorização explícita de deploy:

1. revisar o diff e confirmar que o commit ainda não existe no remoto;
2. commit/PR conforme a política vigente; push em `main` dispara GitHub Actions;
3. acompanhar build, validação e rsync até conclusão terminal;
4. abrir a URL pública da capa e do artigo em navegador real;
5. comparar visual e conteúdo com a versão candidata, testar recursos e console;
6. registrar commit, run, slug, versão, hashes, resultado e URLs.

Um workflow verde ou HTTP 200 isolado não encerra a publicação. A versão só é declarada publicada após a verificação visual e funcional em produção.

## 7. Contatos oficiais

- Instagram: https://www.instagram.com/portalsulma/
- WhatsApp: https://wa.me/5598991072673
- E-mail: contato@portalsulma.com

Os valores canônicos ficam em `data/posts.json` (`site.social.instagram`, `site.contact.whatsapp`, `site.contact.email`) e são renderizados por `scripts/contact-links.js`.

## 8. Estado atual e pendências

Implementado e validado localmente em 21/10/2026:

- contatos centralizados e presentes na capa/artigos;
- ícones locais acessíveis;
- capa SSR e `content.js` gerados da mesma lista autorizada;
- template único de artigo com imagem, legenda e transparência editorial;
- limpeza de artigos obsoletos e exclusão de rascunhos dos destinos públicos;
- validação automatizada independente da quantidade de artigos;
- teste real em Chrome desktop/mobile, claro/escuro e três layouts, sem exceções no console.

Ainda pendente:

- validar operacionalmente a leitura da caixa Hostinger com credencial mascarada e staging seguro;
- registrar o mecanismo privado canônico de recibos/hashes;
- obter autorização explícita antes de commit/push/deploy desta revisão;
- depois do deploy, repetir a validação visual na URL pública e confirmar que produção corresponde ao commit.
