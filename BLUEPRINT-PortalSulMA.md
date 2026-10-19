# BLUEPRINT Portal Sul MA — v2.2

Atualizado em 19/10/2026. Responsáveis: Tom (curadoria e decisão), Sky (apuração, redação e entrega), Jean (publicação e infraestrutura, conforme orientação mais recente de Tom). O documento anterior usava o nome Gyn; a identidade e o acesso individual da responsável ainda precisam ser confirmados. O canal definido abaixo é a caixa oficial do projeto, sem presumir um endereço pessoal.

## 1. Escopo e decisões vigentes

O primeiro ciclo cuida somente do **site**. A meta inicial é **uma notícia por dia na semana de 19 a 25/10/2026**, começando hoje após a conclusão dos ajustes e a curadoria de Tom. Aumentar para duas ou três notícias exige nova decisão. Não completar a meta com notícia sem apuração suficiente.

Redes sociais serão um processo de automação separado. O formato futuro prevê copy de post único, com carrossel ou vídeo quando justificado; não é requisito nem tarefa automática desta fase. Instagram permanece como contato público do portal. Esta revisão substitui a exigência anterior de copy social em toda entrega imediata.

A autonomia cobre pesquisa, preparação, verificações e envio do pacote já aprovado. **Tom escolhe a pauta, decide entre imagem de banco e imagem criada e aprova a versão final.** A seleção de uma pauta não equivale à aprovação do texto final; tampouco autoriza gerar uma imagem sem a escolha de Tom. Não presumir aprovação por silêncio, nota editorial, `CONFIRMADA` ou sinalização de Sky como “pronto”.

## 2. Contatos oficiais e canal de entrega

| Uso | Dado oficial |
| --- | --- |
| Site | https://portalsulma.com/ |
| E-mail público e caixa de entrega editorial Hostinger | contato@portalsulma.com |
| WhatsApp público, corrigido por Tom | (98) 99107-2673 |
| Link WhatsApp | https://wa.me/5598991072673 |
| Instagram | https://www.instagram.com/portalsulma/ |
| Repositório | https://github.com/Marlytonsantana/portal-sulma |

**E-mail Hostinger é o canal oficial Sky → equipe de publicação.** Entregar para `contato@portalsulma.com`, com arquivos anexados e identificação da versão. WhatsApp serve para contato e eventual aviso manual; não existe integração de disparo por WhatsApp configurada nesta etapa. Não substituir por mensagem a número pessoal nem por link temporário sem anexos.

A conta Hostinger conectada confirmou que administra `contato@portalsulma.com`. Isso não comprova que Jean tenha acesso à caixa: a equipe precisa confirmar esse acesso e acusar recebimento. Não afirmar que Jean foi notificada pessoalmente ou leu o material apenas porque o e-mail foi enviado à caixa do projeto.

Os contatos ficam centralizados em `data/posts.json`: `site.contact.email`, `site.contact.whatsapp` e `site.social.instagram`. `scripts/contact-links.js` gera os botões do cabeçalho e rodapé nos dois temas. O HTML raiz deve acompanhar essa configuração. Não reutilizar o número antigo. Não habilitar outras redes sem confirmação.

## 3. Ritual de todas as manhãs

O Radar de Notícias MA já existente apresenta a Tom as pautas pela manhã, começando com: **“Tom, vamos checar as notícias do dia para enviar para o site.”** Manter o horário já configurado, 7h, no fuso do Maranhão (America/Araguaina, UTC−3). A rotina continua de curadoria; apenas o piloto de entrega automática abaixo se encerra em 25/10.

1. Sky pesquisa fatos novos, priorizando Balsas e o sul do Maranhão, verifica fontes diretas, datas do fato e da publicação, relevância regional e qualidade da apuração. Sem inventar URLs, números, declarações ou resultados do Radar anterior.
2. Apresenta primeiro até três opções prioritárias com título, resumo, impacto local, fontes clicáveis, lacunas, recomendação e alternativas de imagem. Mantém o relatório e os critérios completos do Radar para consulta. Indica uma recomendação para a única notícia do dia, sem escolher por Tom.
3. Tom escolhe a pauta e a origem da imagem: banco/oficial com licença e crédito verificados, ou criação ilustrativa. Se não houver resposta, aguardar; não publicar automaticamente.
4. Sky apura o necessário, redige o texto original completo, prepara a imagem escolhida e submete uma versão identificada a Tom. Selecionar a persona aprovada pela editoria e identificá-la como perfil editorial assistido por IA; não inventar biografias, entrevistas ou credenciais pessoais.
5. Tom aprova texto e imagem da mesma versão. Registrar a aprovação e sua evidência. Alteração editorial material ou troca de imagem exige nova versão e nova aprovação.
6. Sky valida e envia automaticamente o pacote final à caixa oficial. A verificação de pacotes aprovados é horária durante o piloto; isso é uma verificação agendada, não um webhook instantâneo.
7. Jean recebe o pacote pela caixa oficial, prepara a integração e o preview e publica somente com autorização de publicação/deploy. Responde no mesmo fio com o resultado e a URL verificada.

Hoje, 19/10, a primeira notícia será retomada com Tom após os ajustes. Não reaproveitar os rascunhos de 12/10 como se fossem o Radar de hoje. Se o relatório da manhã não estiver acessível, informar a falta e recuperar o relatório ou pesquisar novamente com identificação clara da nova checagem.

## 4. Pacote de entrega por notícia — fase site

Assunto: `[PORTAL SUL MA][ENTREGA FINAL] AAAA-MM-DD | <slug> | v<N>`.

| Anexo | Conteúdo |
| --- | --- |
| `<slug>-site.json` | Um objeto de notícia compatível com o array `posts` de `data/posts.json`, com texto integral em `content`, título, resumo, editoria, datas, fontes, imagem e metadados. Não substituir o arquivo completo por esse objeto isolado. |
| `<slug>-texto.md` | Versão legível do título, linha fina, corpo, fontes, crédito da imagem e ressalvas. Deve refletir o mesmo texto do JSON. |
| `<slug>-hero.webp` | Arquivo de imagem efetivamente aprovado e validado. |
| `<slug>-manifesto.json` | Slug, versão, hashes SHA-256 dos arquivos editoriais/imagem, aprovações de Tom, dados técnicos, licença/crédito, checklist, referência do pacote e estado de publicação. |

O e-mail inclui resumo da pauta, fonte principal, data do fato, eventuais restrições e instrução de integração. Não anexar credenciais, chaves ou dados privados desnecessários. `templates/editorial-package.json` é apenas molde; não é uma notícia aprovada nem pronto para envio.

Campos do post seguem a estrutura atual: `id`, `slug`, `section`, `tone` (`red` ou `blue`), `title`, `excerpt`, `content`, `image`, `category`, `tags`, `date`, `factDate`, `sourceDate`, `author`, `reviewer`, `checking`, `editorialStatus`, `recommendation`, `publicationAuthorized`, `relevance`, `reporting`, `pending`, `caveat`, `sources` e `structuredData`. Os nomes Rafael, Marina, Clara e Helena são personas editoriais aprovadas por Tom, não identidades de jornalistas reais. A apresentação ao leitor deve informar essa natureza e a supervisão humana; revisão por Helena não é checagem independente por outra pessoa. Usar autoria institucional somente se realmente assumida pela redação. `structuredData` deve refletir o texto e a imagem; datas futuras ou autoria inventada são proibidas.

**A entrega começa com `publicationAuthorized: false`.** A aprovação do pacote para envio fica no manifesto; a autorização para colocar no ar é registrada separadamente. Não alterar esse campo apenas para conseguir gerar um preview público.

## 5. Imagem: escolha humana, validação real

Primeiro verificar se existe imagem oficial ou de banco adequada, com permissão de uso, crédito e contexto corretos. Tom decide entre utilizá-la ou criar ilustração. Imagem gerada nunca é prova documental do acontecimento: identificar como ilustrativa, sem simular como real um hospital, pessoa ou fato específico.

| Parâmetro obrigatório | Valor |
| --- | --- |
| Arquivo | `<slug>-hero.webp` |
| Formato real | WebP, conferido pela leitura do arquivo |
| Dimensões finais | 1200 × 630 px |
| Tamanho máximo | 150.000 bytes (limite conservador de 150 KB) |
| Destino ao integrar | `assets/<slug>-hero.webp` |
| Campo `post.image` | `assets/<slug>-hero.webp` |
| URL pública esperada | `https://portalsulma.com/assets/<slug>-hero.webp` |

1200 × 630 é aproximadamente **1,91:1**, não 16:9 exato. O arquivo mestre exigido permanece 1200 × 630; os espaços 16:9 podem recortá-lo com `object-fit: cover`, sem esticar. Uma única imagem pode servir aos layouts Pulse, Ledger e Horizon. É preciso validar o enquadramento nos três. Qualidade de exportação, por exemplo q=82, não garante o limite: medir os bytes reais.

Se faltar imagem, licença, aprovação ou conformidade técnica, não emitir “ENTREGA FINAL”. Preparar solicitação identificada como `[IMAGEM PENDENTE]`, contendo proposta de banco ou prompt detalhado de criação, finalidade, composição, localidade, crédito/identificação ilustrativa e requisitos técnicos. Submeter a Tom e à equipe de publicação antes do disparo final. Um prompt aprovado ainda não é uma imagem entregue: o arquivo final também precisa ser revisado.

## 6. Registro durável, automação e prevenção de duplicidade

O controle operacional das entregas fica em arquivo privado persistente, identificado na configuração da automação; os anexos, evidências, hashes e recibos também permanecem privados. `data/editorial-delivery-queue.json` no repositório público é apenas referência estrutural e não é a fila canônica. Não inserir texto de notícia não aprovado no `posts.json` servido nem tratar o histórico desta conversa como uma fila acessível por qualquer execução futura.

Cada entrada precisa de slug, versão, referência persistente dos anexos e do manifesto, hashes, evidência de aprovação editorial e de imagem por Tom, estado e recibo. Estados: `DRAFT`, `AWAITING_SELECTION`, `AWAITING_IMAGE`, `AWAITING_APPROVAL`, `READY_TO_SEND`, `SENDING`, `SENT`, `PUBLICATION_PENDING`, `PUBLISHED` ou `ERROR`. A fila começa vazia; não há aprovação prévia de pauta alguma neste documento. Antes do envio, reservar a versão como `SENDING` com identificador da execução, data e hash usando controle de concorrência. Conflito de reserva bloqueia o envio; reserva abandonada exige consulta a Enviados antes de qualquer recuperação.

A rotina de envio consulta a fila e valida os anexos reais e as aprovações da versão. Só envia `READY_TO_SEND` completo para a caixa oficial. Se faltar acesso aos arquivos ou à evidência, aguarda e informa a pendência. Nunca assume aprovação só porque o estado foi escrito como pronto.

A chave de deduplicação combina slug, versão e hash do manifesto. Antes de enviar, verificar recibo e a pasta Enviados por assunto/chave. Após aceitação confirmada pela Hostinger e cópia em Enviados, registrar data, assunto e identificador retornado; ausência de ID não autoriza inventá-lo. Em timeout ou resultado ambíguo, consultar Enviados antes de qualquer tentativa. Não prometer exatamente uma entrega em falhas concorrentes: a rotina deve operar com um único responsável por vez e pausar se houver disputa de estado.

Enquanto o PR #1 estiver aberto, os documentos públicos desta revisão estão em `codex/instagram-menu-rodape`. Após merge, usar `main` para esses documentos. A fila operacional e seus recibos permanecem no registro privado configurado na automação, independentemente da branch. Se o PR for encerrado sem merge ou houver divergência de versões, suspender a entrega até resolver a referência. Atualizações editoriais devem usar branch/PR; nunca escrever em `main` como atalho, pois isso dispara produção.

### Rotinas e escopo

| Rotina | Situação |
| --- | --- |
| Radar matinal | Ativo e atualizado: ID (identificador mantido no documento operacional privado), diariamente às 7h; prompt agora prioriza o site e a curadoria de Tom. |
| Verificação de entregas aprovadas | Ativa: ID (identificador mantido no documento operacional privado). Piloto horário, primeira verificação em 19/10 às 19h, encerramento em 25/10/2026 às 23h59 (America/Araguaina). |
| Publicação no site | Ação da equipe após aprovação, testes e autorização de deploy; e-mail não executa deploy sozinho. |
| Redes sociais / WhatsApp automático / webhook | Fora desta implantação; não configurados. |

## 7. Publicação e deveres da equipe

Jean utiliza a mensagem e os anexos da caixa oficial como ordem de trabalho identificada por slug/versão, valida conteúdo e imagem e acusa recebimento. Sky pode preparar branch e PR para facilitar a integração. Não existe, nesta implantação, agente ou webhook de Jean conectado que transforme e-mail em publicação sem essa etapa operacional.

Antes do primeiro artigo, a equipe precisa corrigir e verificar os pontos já observados: capa ainda usa conteúdo estático em `content.js`; capa gerada inclui rascunhos sem filtrar `publicationAuthorized`; links de artigo e mídia precisam integração; template de artigo usa caminhos relativos incorretos para CSS/JS/logo; escape de HTML precisa revisão; a cópia de `data/` para `dist/` não está implementada no gerador inspecionado. Não declarar esses pontos corrigidos só porque estão documentados aqui.

Verificar que todos os destinos públicos — capa, busca, artigos, feeds, sitemap e JSON acessível — excluem rascunhos. Preview privado deve permitir revisão sem publicar. Para cada imagem, a capa usa `.story-media`, não `.card-media`; o template inspecionado ainda não renderiza a fotografia no corpo/hero. Gyn/Jean deve integrar e validar a mesma imagem nos três layouts e em `og:image` e NewsArticle.

O projeto segue HTML/CSS/JS estático, build Node `node scripts/generate-site.js`, saída `dist/`, GitHub Actions → rsync → Hostinger. A raiz do repositório contém os arquivos; não usar o caminho antigo `sky-visual-package/`. Preservar WordPress e as exclusões existentes no deploy. Não guardar chaves no código ou e-mail.

O `PROJECT-OS.md` exige autorização explícita para deploy. Publicar uma notícia exige a escolha e aprovação final de Tom para aquela versão e autorização para colocá-la no ar. Em seguida: executar build, conferir preview e imagem, integrar via PR, acompanhar Actions, abrir a URL do artigo e verificar conteúdo, status HTTP, fontes, contatos, tema e metadados. Só responder “publicado” com URL verificada. Reversão também altera produção e segue o mesmo controle.

## 8. Visual aprovado que deve ser preservado

Três layouts: Pulse, Ledger e Horizon. Roboto Slab nos títulos de notícia (peso 700), Alfa Slab One nos títulos institucionais e Inter na interface; fontes locais e licenças mantidas. Contraste legível em claro e escuro, paleta vermelha/azul, animações CSS com respeito a movimento reduzido. Não reintroduzir texto bege sobre branco nem vermelho rosado sem contraste. Os contatos usam ícones SVG locais e cores herdadas dos botões.

## 9. Estado e passagem de bastão

O site está acessível; isso não prova que a revisão do PR já esteja em produção. Há quatro rascunhos antigos em `posts.json`, todos com `publicationAuthorized: false`; não são a primeira notícia de hoje e suas assinaturas foram agora definidas por Tom como personas editoriais, sem biografias ou credenciais de pessoas reais. Afirmações históricas da v2.0 sobre commit de deploy, branch protegida, webhook e carregamento dinâmico não foram adotadas como comprovação atual.

Entrega documental e contatos: PR https://github.com/Marlytonsantana/portal-sulma/pull/1. Confirmação de agendamento, envio administrativo e pendências de acesso devem ser registradas abaixo somente após resultado real. A primeira notícia será trabalhada com Tom imediatamente após esta organização, sem esperar pela manhã seguinte.

## 10. Personas editoriais aprovadas para o fluxo

Documento completo: `docs/PERSONAS-EDITORIAIS.md`, com instruções reutilizáveis e um exemplo fictício de cada voz. Configuração de roteamento: `data/editorial-personas.json`. Os exemplos são exercícios de estilo; jamais entram no Radar, na fila ou no `posts.json` como fatos.

| Persona | Papel | Voz e extensão preferencial |
| --- | --- | --- |
| Rafael Nogueira | Política regional | Curto e firme; 160–260 palavras; ironia pontual sobre fatos documentados, separada como comentário identificado. |
| Marina Azevedo | Economia e agro | Direto, números acessíveis; 140–240 palavras; humor sutil opcional e identificado. |
| Clara Reis | Sociedade e cotidiano | Próxima da população, simples e prática; 250–450 palavras. |
| Helena Duarte | Revisão transversal e explicadores | Didática e criteriosa; explicadores de 300–500 palavras; sem sarcasmo na revisão. |

Sky escolhe uma voz pela questão central da pauta; Helena faz uma segunda passagem de revisão, preservando o estilo e confrontando as fontes efetivamente acessadas. Uma notícia tem um autor principal, não quatro versões obrigatórias. As extensões são flexíveis: não cortar contexto para caber. Tom decide a pauta e aprova a versão final e a imagem.

Política e economia podem ter sarcasmo moderado quando a temática comportar, conforme pedido de Tom. Propor esse recurso em comentário claramente identificado e aprovado, separado da notícia factual. Sem ironia com vítimas, tragédias ou vulnerabilidade; sem insinuação de culpa, intenção ou corrupção não documentada. Não atribuir a essas personas entrevistas, presença em locais, diplomas ou trabalho humano independente.

A equipe deve apresentar publicamente: “Perfil editorial assistido por IA, sob supervisão humana do Portal Sul MA.” Não gerar retratos documentais como se fossem pessoas reais. A configuração organiza as vozes e as instruções; não comprova que quatro agentes independentes estejam executando. Aplicar a primeira vez numa pauta real escolhida por Tom.

### Registro de implantação

- 19/10/2026: quatro personas integradas ao blueprint e ao roteamento documental/configurável, com exemplos fictícios separados.
- 19/10/2026: WhatsApp corrigido para (98) 99107-2673 na configuração e nos links do código.
- 19/10/2026: caixa Hostinger oficial confirmada pela conta conectada; acesso individual da equipe e recebimento ainda não confirmados.
- 19/10/2026: atualização do Radar matinal e criação da verificação horária confirmadas pela plataforma. Agendamentos ativos não comprovam uma entrega futura; a fila ainda está vazia.
- Envio administrativo do alinhamento: será registrado após confirmação real da Hostinger.

Versão 2.2 substitui o fluxo “100% autônomo sem Tom” e a cadência antiga de segunda/quarta/sexta. Preserva a curadoria humana, a aprovação e as decisões visuais já aceitas.


### Regra de crédito de imagem — confirmação de Tom em 19/10/2026

Fotografias recebem o nome do fotógrafo informado. Imagens de IA não recebem crédito de fotógrafo ou plataforma. Usar legenda “Imagem ilustrativa” para distinguir a ilustração de registro factual do acontecimento. A origem permanece registrada no manifesto editorial privado, sem inventar fotógrafo, local ou data. Para a pauta piloto sobre chuva, Tom forneceu a imagem e confirmou sua origem de IA.
