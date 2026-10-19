/* Dados editoriais separados da apresentação. Origem: remessa de 12/10/2026.
   Itens autorizados somente para redação de rascunho; publicação_autorizada=false. */
window.PORTAL_EDITORIAL = {
  edition: { selectedAt: '12/10/2026', origin: 'Radar de Notícias MA, edição de 12/10/2026' },
  stories: [
    {
      id: 'RADAR-MA-2026-10-12-01', slug: 'hospital-balsas', section: 'Política regional', tone: 'red',
      title: 'Hospital de Balsas: vistoria aponta atraso e cobra atualização da reforma',
      summary: 'Em vistoria de 7/10, o MPMA registrou atraso na reforma, insuficiência de leitos de UTI e limitações da hemodiálise. Em reunião de 8/10, a SES comprometeu-se a apresentar em 15 dias um relatório com cronograma atualizado. O hospital atende 13 municípios.',
      locality: 'Balsas e 13 municípios atendidos', factDate: '07/10/2026', sourceDate: '09/10/2026',
      checking: 'CONFIRMADA', editorialStatus: 'RASCUNHO_PARA_APROVACAO', recommendation: 'PRONTO_PARA_REVISAO', publicationAuthorized: false,
      relevance: '9,7', reporting: '9,5', lead: 'Rafael Nogueira', review: 'Helena Duarte',
      caveat: 'O prazo de 15 dias é compromisso anunciado pela SES, não ordem judicial documentada. Ainda falta ouvir a SES sobre etapas, custos e cronograma efetivo.',
      pending: 'Ouvir a SES; confirmar cronograma e estágio real da reforma.',
      sources: [
        { name: 'MPMA — nota oficial', url: 'https://www.mpma.mp.br/balsas-mpma-realiza-vistoria-no-hospital-regional/', type: 'Primária', accessed: true, note: 'aberta e lida' },
        { name: 'Jornal Pequeno — reportagem indicada pelo Radar', url: 'https://jornalpequeno.com.br/2026/10/09/mpma-realiza-vistoria-no-hospital-regional-de-balsas/', type: 'Imprensa', accessed: false, note: 'acesso não confirmado nesta checagem' }
      ]
    },
    {
      id: 'RADAR-MA-2026-10-12-06', slug: 'combustivel-balsas-imperatriz', section: 'Economia & agro', tone: 'blue',
      title: 'Médias de gasolina: Balsas e Imperatriz entram em comparação amostral',
      summary: 'Para 4–10/10, o UOL informou, com base na ANP, média de R$ 7,33/litro em Balsas e queda semanal de 0,41%. A reportagem indicada para Imperatriz registra R$ 6,47. A diferença é R$ 0,86/litro — R$ 43 em 50 litros, numa comparação hipotética.',
      locality: 'Balsas e Imperatriz', factDate: '10/10/2026', sourceDate: '10/10/2026',
      checking: 'CONFIRMADA', editorialStatus: 'RASCUNHO_PARA_APROVACAO', recommendation: 'PRONTO_PARA_REVISAO', publicationAuthorized: false,
      relevance: '8,5', reporting: '9,2', lead: 'Marina Azevedo', review: 'Helena Duarte',
      caveat: 'São médias amostrais, não preços de todos os postos. A amostra de Balsas relatada pelo UOL reúne oito postos e não demonstra a causa da diferença.',
      pending: 'Conferir o registro específico de Imperatriz na planilha da ANP; não inferir causa.',
      sources: [
        { name: 'UOL Economia — levantamento em Balsas', url: 'https://economia.uol.com.br/noticias/redacao/2026/10/10/gasolina-em-balsas-ma-ficou-mais-cara-ou-mais-barata-nesta-semana-veja-preco.ghtm', type: 'Imprensa', accessed: true, note: 'valor de Balsas confirmado em matéria aberta' },
        { name: 'UOL Economia — levantamento em Imperatriz', url: 'https://economia.uol.com.br/noticias/redacao/2026/10/10/preco-da-gasolina-em-imperatriz-ma-confira-os-valores-desta-semana.ghtm', type: 'Imprensa', accessed: false, note: 'acesso instável nesta checagem' },
        { name: 'ANP — planilhas oficiais', url: 'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas', type: 'Primária', accessed: true, note: 'conferir linha da semana e municípios' }
      ]
    },
    {
      id: 'RADAR-MA-2026-10-12-08', slug: 'homicidios-municipios', section: 'Sociedade', tone: 'red',
      title: 'Quatro municípios do sul aparecem em levantamento sobre homicídios',
      summary: 'Reportagens que atribuem os dados à SSP-MA/UEAC afirmam que 32 municípios não registraram homicídios dolosos de janeiro a setembro de 2026. No sul, citam Formosa da Serra Negra, Loreto, Sambaíba e São Domingos do Azeitão, além de queda de 15,6% na regional de Balsas.',
      locality: 'Sul do MA e regional de Balsas', factDate: '30/09/2026', sourceDate: '09/10/2026',
      checking: 'PARCIALMENTE_CONFIRMADA', editorialStatus: 'APURACAO_PENDENTE', recommendation: 'PRECISA_APURAR', publicationAuthorized: false,
      relevance: '8,2', reporting: '7,8', lead: 'Clara Reis', review: 'Helena Duarte',
      caveat: 'A tabela original ainda precisa ser localizada e confrontada. “Sem registro de homicídio doloso entre janeiro e setembro” não significa “sem violência”, “sem crimes” ou resultado do ano inteiro.',
      pending: 'Obter a tabela oficial SSP-MA/UEAC, definições, recorte por cidade e cálculo da regional.',
      sources: [
        { name: 'Maranhão Hoje — levantamento atribuído à SSP-MA', url: 'https://mahoje.com.br/32-municipios-do-maranhao-nao-registraram-homicidios-em-2026/', type: 'Imprensa', accessed: true, note: 'reportagem acessada' },
        { name: 'Diário Sul Maranhense — recorte regional', url: 'https://diariosulmaranhense.com.br/2026/10/10/sao-domingos-do-azeitao-e-formosa-da-serra-negra-estao-entre-cidades-sem-homicidios-em-2026-no-maranhao/', type: 'Imprensa', accessed: true, note: 'reportagem acessada' }
      ]
    },
    {
      id: 'RADAR-MA-2026-10-12-09', slug: 'chuvas-matopiba', section: 'Economia & agro', tone: 'blue',
      title: 'MATOPIBA: projeções divergem sobre chuva na segunda quinzena',
      summary: 'Duas análises de 9/10 projetam cenários diferentes: Notícias Agrícolas sugere avanço das precipitações sobre o MATOPIBA; The AgriBiz alerta para distribuição ainda irregular e baixo acumulado previsto para Maranhão e Piauí no início do período.',
      locality: 'MATOPIBA, Balsas e sul do MA', factDate: null, sourceDate: '09/10/2026',
      checking: 'PARCIALMENTE_CONFIRMADA', editorialStatus: 'APURACAO_PENDENTE', recommendation: 'PRECISA_APURAR', publicationAuthorized: false,
      relevance: '8,1', reporting: '7,3', lead: 'Marina Azevedo', review: 'Helena Duarte',
      caveat: 'São previsões de modelos e interpretações, não chuva já observada. Os cenários divergem, podem mudar e precisam ser atualizados no dia da publicação.',
      pending: 'Atualizar a previsão em fonte técnica e manter explícita a divergência entre cenários.',
      sources: [
        { name: 'Notícias Agrícolas — previsão e MATOPIBA', url: 'https://www.noticiasagricolas.com.br/noticias/tempo-e-clima/429438-chuva-ganha-forca-no-centro-sul-e-deve-chegar-ao-matopiba-na-segunda-quinzena-de-outubro.html', type: 'Imprensa', accessed: true, note: 'análise acessada' },
        { name: 'The AgriBiz — análise meteorológica', url: 'https://www.theagribiz.com/dentro-da-porteira/chuva-abrangente-beneficia-lavouras-na-segunda-quinzena-de-outubro/', type: 'Imprensa', accessed: true, note: 'análise acessada' }
      ]
    }
  ]
};
