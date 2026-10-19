# Portal Sul MA — versão visual aprovada

**Versão:** SKY-VISUAL-2026-10-18-FINAL.  
**Aprovação do usuário:** 18/10/2026, às 23h07, America/Araguaina.

Comece por **`HANDOFF-GYN.md`**. Ele registra a apresentação aprovada, os arquivos a aplicar, a sequência de integração, os checks e os bloqueios técnicos.

## Estado desta entrega

Aprovados: apresentação de Pulse/Ledger/Horizon, contraste claro/escuro, espaçamentos, animações e Roboto Slab 700 nos títulos das notícias. Alfa Slab One continua nos títulos institucionais e de seção; Inter e fontes de leitura foram preservadas.

**A integração funcional continua pendente:** o `app.js` recebido contém erro de sintaxe, e `verify.py` falha por dependências externas preexistentes. Esses arquivos foram preservados para a Gyn corrigir conforme a divisão de responsabilidades. Abrir o `index.html` desta entrega antes dessas correções não reproduz integralmente a prévia interativa aprovada na conversa.

O build executa, mas não comprova o funcionamento dos controles. Não houve deploy nesta entrega. As quatro pautas continuam em rascunho e sem autorização de publicação.

## Mapa dos arquivos

- `styles.css`: apresentação aprovada e animações nativas.
- `assets/fonts/`: sete fontes locais e respectivas licenças.
- `assets/portal-sulma-logo-sanitized.svg`: marca preservada, viewBox `20 430 1390 575`.
- `index.html`: estrutura da prévia, controles e regiões dinâmicas.
- `content.js`: quatro pautas, fontes e ressalvas recebidas.
- `app.js`: renderização e controles; requer a correção registrada no handoff.
- `data/posts.json`: dados usados pelo gerador; preservados.
- `scripts/generate-site.js`: geração estática com templates visuais ajustados.
- `verify.py`: verificador recebido; a divergência de dependências está registrada.
- `ajustes-html.patch`: mudanças exatas de HTML e gerador em relação à base recebida.
- `validation-report.json`: verificações realizadas e limitações.
- `MANIFEST-ENTREGA.json`: identificação, aprovação e hashes do pacote.
- `docs/README-ORIGINAL.md`: histórico recebido, com alegações e decisões anteriores; o estado atual está neste README e no handoff.
- `EDITORIAL-WORKFLOW.md`, `SOURCE-CAVEATS.md` e `REFERENCES.md`: documentos recebidos, preservados.

`dist/` é gerada pelo build e não integra o ZIP. Não editar arquivos nela manualmente.

## Integração e checks

Após aplicar os arquivos e resolver os bloqueios descritos no handoff, executar:

```sh
node --check app.js
node --check content.js
node --check scripts/generate-site.js
node scripts/generate-site.js
python verify.py
```

Depois conferir em navegador os três layouts, os dois temas, mobile, carregamento das fontes, busca, filtros, estado vazio, carrossel, teclado, persistência e redução de movimento. O HTML raiz e a saída gerada precisam ser conferidos separadamente.

## Fotografias

Uma foto principal por notícia pode atender as três composições com recortes distintos e ponto focal. Essa ligação ainda não foi implementada: os cards atuais usam mídia ilustrativa. A Gyn deve integrar o conteúdo fotográfico preservando o enquadramento em cada layout.
