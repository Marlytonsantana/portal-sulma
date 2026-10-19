# Fluxo editorial reutilizável planejado

WordPress permanece o CMS. Este documento descreve um fluxo futuro; não agenda tarefas e não faz mutações na API.

1. **Intake** — receber pauta estruturada com ID estável, origem, fontes, localidade, datas, autorização e anexos/licenças.
2. **Editorial** — atribuir responsável, produzir texto autoral e peças derivadas, preservando atribuição, contraditório e linguagem regional.
3. **Verificação e deduplicação** — confrontar fonte primária, registrar acesso, atualizar dados voláteis, comparar título/URL/ID e similaridade com rascunhos existentes, bloquear duplicatas e destacar lacunas.
4. **Aprovação humana** — Helena/editora revisa fontes, dados, originalidade, caveats, mídia e risco. Só um ato humano explícito muda `APURACAO_PENDENTE`/`RASCUNHO_PARA_APROVACAO` para aprovado. Aprovação para redigir nunca equivale a aprovação para publicar.
5. **WordPress REST** — depois da aprovação, criar ou atualizar **draft** com ID de origem e metadados de auditoria. Token com privilégio mínimo. Nenhuma publicação direta por padrão.
6. **Agendamento** — segunda aprovação humana específica para data/canal. Criar agenda no WordPress somente depois dessa aprovação; validar fuso e conflitos.
7. **Rebuild da homepage** — webhook/evento do CMS reconstrói a capa a partir de conteúdo aprovado, invalida cache e executa smoke test. Falha mantém a versão anterior.

## Cadência

Planejar **três ciclos semanais**, com dias e horários **a definir**. Cada ciclo percorre intake → redação → checagem/dedupe → aprovação → draft/agendamento aprovado → rebuild. Não há cron, timer ou agenda configurada nesta entrega.

## Controles mínimos

- Idempotência por `pauta_id` e `wp_post_id`.
- Registro de fonte, horário de checagem, revisor e decisão humana.
- Separação entre credencial de rascunho e capacidade de publicar.
- Dry-run e diff antes de qualquer escrita no CMS.
- Rollback de capa e retenção da versão anterior.
- Imagens somente com licença/crédito documentados.
