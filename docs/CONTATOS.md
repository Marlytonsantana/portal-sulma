# Redes sociais e contato

A barra de contato aparece no cabeçalho e no rodapé da capa raiz e dos templates gerados. Usa ícones SVG locais em uma única cor herdada do botão, sem carregar bibliotecas de ícones em runtime. As licenças dos ícones acompanham os arquivos em `assets/icons/`.

## Configuração

- Instagram: `site.social.instagram` em `data/posts.json`. Perfil informado: https://www.instagram.com/portalsulma/.
- E-mail: `site.contact.email`, somente o endereço, sem prefixo `mailto:`.
- WhatsApp: `site.contact.whatsapp`, com código do país, DDD e número, somente dígitos ou `+` inicial.

Contatos informados pelo usuário em 19/10/2026: `contato@portalsulma.com` e `(98) 9107-2673`. Links configurados: `mailto:contato@portalsulma.com` e `https://wa.me/559891072673`, com o código do Brasil e os dígitos fornecidos. A configuração dos links não comprova a existência da caixa postal ou o registro do número no WhatsApp.

Campos vazios ou inválidos produzem botões nativos desabilitados com identificação acessível “em breve”, sem links fictícios ou `href="#"`. Com valores válidos, o gerador cria `mailto:` e `https://wa.me/` automaticamente.

Instagram e WhatsApp abrem em nova aba com `rel="noopener noreferrer"`. E-mail abre o aplicativo configurado no dispositivo. As áreas de toque têm pelo menos 44 px. Ícones e textos mantêm contraste nas superfícies do cabeçalho e rodapé dos dois temas; em larguras menores, o cabeçalho usa nomes acessíveis mesmo quando o texto visual é ocultado.

## Alteração

`scripts/contact-links.js` centraliza o HTML dos contatos. `scripts/generate-site.js` usa esse helper na capa e no artigo. O `index.html` da raiz contém o mesmo resultado da configuração atual e precisa ser mantido em sincronia ao mudar os contatos, pois o gerador não o reescreve.

Após inserir os contatos definitivos, atualizar a barra no HTML raiz com `renderContacts(site)` e executar `node scripts/generate-site.js`. Não editar `dist/` manualmente. Conferir os links dos três canais na capa e no rodapé antes de publicar. A publicação continua sujeita à autorização de deploy prevista em `PROJECT-OS.md`.
