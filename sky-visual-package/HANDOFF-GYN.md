# Portal Sul MA — entrega visual aprovada

**Versão:** SKY-VISUAL-2026-10-18-FINAL  
**Aprovação:** 18/10/2026, às 23h07, America/Araguaina  
**Registro do usuário:** “perfeito aprovado, finaliza a documentação para eu enviar para a Gyn”  
**Destino:** Gyn / OpenClaw — integração, build e validação técnica

## 1. Instrução de recebimento

Gyn, esta é a versão visual aprovada pelo usuário após revisão de espaçamentos, contraste, animações e tipografia. Aplicar os arquivos desta entrega como referência visual vigente. Preservar as decisões descritas abaixo ao corrigir os bloqueios técnicos da base recebida.

A aprovação foi dada à prévia interativa apresentada na conversa, após a troca dos títulos de notícias para Roboto Slab. Ela não representa uma validação do funcionamento do ZIP original, cuja camada JavaScript ainda contém erro de sintaxe. O pacote mantém esse arquivo para respeitar a divisão de responsabilidades: Sky cuida da apresentação; Gyn corrige e integra o runtime.

**Resultado esperado:** um preview integrado para conferência, com Pulse, Ledger e Horizon, modos claro/escuro e todos os controles funcionando. Esta entrega não executou deploy nem alterou o WordPress. A aprovação visual não muda a autorização editorial dos rascunhos.

## 2. Decisões visuais aprovadas

### Tipografia

| Aplicação | Família | Peso aplicado |
| --- | --- | --- |
| Títulos das notícias em Pulse, Ledger e Horizon | Roboto Slab | 700 |
| Títulos de notícias no Radar e no template de artigo | Roboto Slab | 700 |
| Títulos institucionais, seções e números ilustrativos | Alfa Slab One | 400 |
| Interface, controles, categorias e metadados | Inter | Conforme a hierarquia do CSS, entre 400 e 800 |
| Textos editoriais serifados já existentes | Iowan Old Style, com alternativas Palatino/Charter/Georgia | Conforme o CSS |

`--headline` define Roboto Slab e `--display` mantém Alfa Slab One. Roboto Slab é variável, com pesos reais de 100 a 900; não usar negrito artificial nem substituir por fonte do sistema nos títulos das notícias.

As sete fontes estão em `assets/fonts/`: Alfa Slab One 400, Inter 400/500/600/700/800 e Roboto Slab variável. As licenças acompanham os arquivos: OFL para Alfa Slab One e Inter; Apache 2.0 para Roboto Slab. Os caminhos do CSS são locais e a pasta de fontes deve ser copiada no build.

Fontes oficiais de referência:

- https://fonts.google.com/specimen/Roboto+Slab
- https://github.com/google/fonts/tree/main/apache/robotoslab
- https://github.com/google/fonts/tree/main/ofl/alfaslabone
- https://github.com/google/fonts/tree/main/ofl/inter

### Temas e contraste

| Token | Claro | Escuro |
| --- | --- | --- |
| Fundo | `#ffffff` | `#050d17` |
| Superfície | `#ffffff` | `#0c1929` |
| Texto principal | `#111c2e` | `#edf2f8` |
| Texto secundário | `#405169` | `#b0bed0` |
| Azul | `#0865d1` | `#79b7ff` |
| Vermelho | `#b51c28` | `#ff8c94` |

No tema claro, títulos usam tinta escura explícita e o vermelho permanece definido. Evitar texto branco, bege ou rosado sobre branco. Cabeçalho, Radar e rodapé conservam texto claro sobre superfícies azul-marinho em ambos os temas. A numeração ilustrativa dos cards é opaca no modo claro.

Foram calculadas razões de contraste para os pares principais: títulos claros 17,08:1; secundários claros 8,08:1; vermelho sobre branco 6,64:1; azul sobre branco 5,54:1. Os pares principais testados nos dois temas superam 4,5:1. Esse cálculo não constitui uma auditoria completa de acessibilidade nem substitui a conferência do CSS computado após integração.

### Espaçamento e responsividade

Margens laterais responsivas de 20 a 56 px; espaçamento interno consistente; controles principais com área de pelo menos 44 px; foco visível e rótulo acessível do botão de tema preservado no mobile. Grids usam colunas que podem encolher e empilham no celular. Os controles deixam de ser fixos em telas menores. Os três layouts e seus seletores foram preservados.

### Movimento

Animações nativas em `styles.css`, sem acrescentar biblioteca: entrada dos títulos e cards, sequência entre cards, reinício do efeito ao mudar a composição, feedback em hover, setas e botão de tema, entrada da ficha de fontes e revelação na rolagem quando `animation-timeline: view()` for suportado. `prefers-reduced-motion` desativa os efeitos.

O `app.js` recebido também contém chamadas opcionais ao Motion. Ao corrigir o runtime, evitar que essas chamadas disputem `transform`/`opacity` com as animações aprovadas do CSS. Preferir uma única camada responsável por cada efeito; não reverter o acabamento visual para resolver a duplicação.

## 3. Uma foto por notícia, três composições

**Orientação de integração:** uma imagem principal por notícia pode atender Pulse, Ledger e Horizon. Cada layout ajusta o recorte; não é necessário cadastrar três fotografias distintas.

Usar ponto focal e enquadramento por composição, especialmente no Horizon, cujo espaço pode ficar mais vertical. Manter pessoas, rostos e elementos relevantes visíveis. Quando o recorte automático não funcionar, preparar um recorte específico da mesma foto. Versões de tamanhos diferentes podem ser geradas para desempenho, mantendo uma única imagem principal no cadastro.

**Estado atual:** os cards ainda usam mídia ilustrativa com números; a ligação de fotografias ao conteúdo não foi implementada nesta revisão. O campo de imagem e a renderização responsiva ficam para a integração da Gyn. A aprovação visual não deve ser interpretada como implementação concluída das fotos.

## 4. Arquivos e aplicação

| Arquivo/pasta | Ação |
| --- | --- |
| `styles.css` | Substituir pelo arquivo completo aprovado |
| `assets/fonts/` | Copiar fontes e licenças locais |
| `index.html` | Aplicar a versão sem CSS crítico duplicado e com stylesheet normal |
| `scripts/generate-site.js` | Aplicar os ajustes exclusivamente visuais dos templates |
| `ajustes-html.patch` | Consultar o diff exato do HTML e gerador contra o ZIP originalmente recebido |
| `README.md` | Consultar o guia operacional atualizado |
| `HANDOFF-GYN.md` | Este documento e registro de aprovação |
| `validation-report.json` | Resultados e limites das verificações realizadas |
| `MANIFEST-ENTREGA.json` | Versão, aprovação e hashes dos arquivos entregues |
| `docs/README-ORIGINAL.md` | Registro histórico do README recebido; não representa os checks desta entrega |

Nos templates, foram removidos os blocos de `<style>` que sobrescreviam o CSS aprovado. Os estilos de artigo passaram à folha principal. Não houve alteração na lógica de geração. O patch detalha exatamente essa intervenção.

`app.js`, `content.js`, `data/posts.json`, `verify.py` e `.github/workflows/deploy.yml` permanecem iguais à base originalmente recebida. A pasta `dist/` não é entregue: deve ser regenerada pela Gyn, sem edição manual. O BLUEPRINT citado no protocolo não estava entre os anexos; atualizar o documento canônico no ambiente da Gyn com as decisões desta entrega.

Se o projeto da Gyn já tiver alterações posteriores, fazer a integração dos trechos visuais sem sobrescrever dados, automações ou correções mais recentes. Conferir o manifesto antes de aplicar o pacote.

## 5. Bloqueios técnicos recebidos, sob responsabilidade da Gyn

### 5.1 Erro de sintaxe em `app.js:14`

`node --check app.js` falha com `SyntaxError: Unexpected string` na função `escapeHTML`. A sequência de aspas do apóstrofo é inválida e os valores do objeto recebido não escapam corretamente os caracteres HTML. Enquanto esse erro existir, o script não inicializa os controles nem renderiza as pautas.

Substituição sugerida para a Gyn aplicar e verificar:

```js
const escapeHTML = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[char]));
```

Esta correção não foi aplicada ao `app.js` entregue. A prévia da conversa usou uma adaptação isolada em memória para permitir avaliar o visual; ela não corrigiu o arquivo de produção.

### 5.2 Dependências externas e `verify.py`

O verificador recebido exige ausência de URLs externas no runtime. O HTML recebido carrega Motion e Web Vitals pelo jsDelivr, além de preconnect/dns-prefetch. Por isso `python verify.py` já falha na base original.

A Gyn deve remover os recursos opcionais ou hospedá-los localmente, incluindo os hints de conexão que não forem mais necessários, e conferir o resultado. Não marcar a validação como aprovada sem resolver a divergência. As fontes novas desta entrega são locais e não acrescentam dependências remotas.

### 5.3 Caminhos dos artigos

O template de artigo usa caminhos `../` para recursos e navegação, embora as páginas sejam geradas em `dist/artigo/<slug>/`. Conferir e corrigir a resolução antes de ativar artigos. Esse problema não foi exercitado pelo build atual, que gerou zero artigos autorizados; não alterar a autorização editorial apenas para testar o visual.

## 6. Verificações e limites

| Verificação | Resultado |
| --- | --- |
| Sintaxe do gerador | Passou |
| Build estático | Passou; zero artigos autorizados |
| Sintaxe do CSS | Sem erros na análise com tinycss2 |
| Fontes locais e eixo variável Roboto Slab | Sete arquivos presentes; eixo `wght` 100–900 confirmado |
| Hooks do HTML | IDs, classes e atributos `data-*`/`aria-*` preservados |
| CSS copiado pelo build | Idêntico ao CSS da raiz |
| Contraste dos pares principais | Valores numéricos registrados acima e no relatório |
| Controles da adaptação em conversa | Inicialização, dados e mudanças de estado verificadas em execução simulada |
| `app.js` original | Falha de sintaxe preservada para correção da Gyn |
| `verify.py` original | Falha por dependências externas preservada para correção da Gyn |
| QA automatizado em navegador | Não realizado neste ambiente |
| Aprovação visual do usuário | Confirmada nesta conversa em 18/10/2026, às 23h07 |

A aprovação visual é explícita. A integração funcional, a inspeção em navegador e o funcionamento do pacote após correção da Gyn ainda precisam ser validados. Nenhum deploy foi executado nesta entrega.

## 7. Sequência para a Gyn

1. Fazer uma cópia de trabalho do projeto atual e conferir a versão do pacote.
2. Aplicar CSS, fontes e os ajustes de templates; preservar dados e correções posteriores.
3. Corrigir o erro de `app.js`, a divergência de dependências e os caminhos de artigos quando aplicável.
4. Executar, a partir da raiz:

```sh
node --check app.js
node --check content.js
node --check scripts/generate-site.js
node scripts/generate-site.js
python verify.py
```

5. Validar a raiz e a saída de `dist/` em navegador: Pulse/Ledger/Horizon nos dois temas; larguras de 320, 390, 768, 1024 e 1440 px; títulos sem corte ou fonte de fallback; busca, filtros, estado vazio, carrossel, fichas, teclado, persistência e redução de movimento.
6. Confirmar que os arquivos de fonte carregam e que não há animações duplicadas. Ao integrar fotos, conferir os recortes e o ponto focal nos três layouts.
7. Atualizar o BLUEPRINT e devolver o preview integrado com um relato dos checks e das pendências restantes. Não alterar os rascunhos para publicação como consequência desta aprovação visual.

## [HANDOFF PARA A GYN]

1. Visual final aprovado pelo usuário em 18/10/2026, às 23h07; esta entrega passa a ser a referência visual vigente.
2. Aplicar `styles.css`, sete fontes locais e ajustes visuais de `index.html`/`scripts/generate-site.js`; preservar seletores e dados.
3. Manter Roboto Slab 700 nas notícias, Alfa Slab One nas seções, contraste dos dois temas e animações CSS com redução de movimento.
4. Corrigir os bloqueios preexistentes de JavaScript/dependências, regenerar `dist/` e validar os controles e recortes antes do preview integrado.
5. Atualizar o BLUEPRINT e disponibilizar o preview ao usuário; sem deploy executado ou alteração da autorização editorial nesta entrega.
