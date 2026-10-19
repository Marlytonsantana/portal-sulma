# Portal Sul MA — Dynamic Editorial Preview

Prévia estática, isolada e sem dependências externas. Não modifica o scaffold Next.js, o protótipo anterior, WordPress nem qualquer estado de produção.

## Abrir

Abra `index.html` diretamente ou sirva **esta pasta somente** com um servidor estático local. `index.html` oferece três composições estáveis e selecionáveis:

1. **Pulse** — capa assimétrica, destaque dominante e blocos editoriais de ritmos diferentes.
2. **Ledger** — grade compacta de quatro colunas, hierarquia de jornal/mesa.
3. **Horizon** — capítulos horizontais alternados, leitura mais narrativa.

A escolha de composição e o tema claro/escuro persistem em `localStorage` quando disponível. Busca e filtros são locais. O carrossel responde a botões e setas do teclado.

## Arquitetura

- `index.html`: landmarks, controles, navegação e regiões dinâmicas.
- `content.js`: quatro pautas estruturadas, fontes, estados e caveats; não contém apresentação.
- `app.js`: renderização, busca/filtros, layouts, tema e carrossel.
- `styles.css`: identidade compartilhada, três composições, breakpoints, foco e redução de movimento.
- `assets/portal-sulma-logo-sanitized.svg`: cópia da marca sanitizada já existente; `viewBox="20 455 1180 500"`, exibida na proporção 1180:500, nunca comprimida em quadrado.
- `EDITORIAL-WORKFLOW.md`: fluxo planejado com aprovação humana.
- `SOURCE-CAVEATS.md`: rastreabilidade e limites editoriais.
- `REFERENCES.md`: acesso real às referências visuais e limites da análise.

## Verificação executada em 12/10/2026

- `python verify.py`: passou; referências locais existem, não há dependências/ativos remotos, o `viewBox` da marca foi preservado, as três composições e os quatro IDs estão presentes e todos os registros mantêm bloqueio de publicação.
- `node --check app.js` e `node --check content.js`: passaram sem saída de erro.
- `html.parser` do Python: aceitou `index.html`.
- Runner disponível: não foram encontrados Playwright CLI/Python, Puppeteer, Chrome, Chromium ou Edge no `PATH`. `npx` existe, mas não foi usado porque poderia instalar/baixar pacote, o que foi proibido. Portanto, renderização responsiva, interação real e cross-browser continuam **não verificadas em navegador**.
- O portal do Control UI não foi aberto nesta execução porque o tool `portal` não está disponível para a sessão. Conforme a documentação local, o servidor só deve ser iniciado após o portal retornar `PORT`/`PUBLIC_URL`; por isso nenhum servidor foi iniciado fora dessa ordem.

## Aprovação visual final

Em 12/10/2026 às 19h20 (America/Araguaina), Ton aprovou explicitamente a prévia após os ajustes de paleta: **“visual aprovado 10/10”**. Esta versão é a referência visual aprovada; preservar layout, tipografia, aplicação da logo e paleta. Novas alterações visuais dependem de solicitação do usuário. A aprovação visual não autoriza por si só publicação de notícias, implantação em produção ou ativação de automações.

## Paleta aprovada — layout congelado

Ajuste autorizado por Ton em 12/10/2026, exclusivamente de cores: identidade azul/vermelho/branco; fundos claros brancos; tema escuro azul-marinho profundo (`#050d17`, superfícies `#0c1929`); amarelo e verde substituídos por azul/vermelho, com acentos de texto adaptados ao tema e foco azul. Layout, tipografia, marca, conteúdo editorial e funcionalidades permanecem congelados. Esta alteração não inclui validação visual em navegador.

## Escopo editorial

Tudo é explicitamente rotulado como **pauta/rascunho**. `publicationAuthorized` é `false` para os quatro registros. A interface não publica, agenda ou escreve em WordPress.
