# Discovery — Aplicação de Previsão do Tempo

## Contexto

A empresa solicitou uma aplicação de previsão do tempo para permitir que usuários consultem as condições meteorológicas de cidades de seu interesse. A primeira versão deve atender a um fluxo simples e recorrente: localizar uma cidade, visualizar o clima atual, consultar a previsão dos próximos cinco dias e escolher a unidade de temperatura mais familiar.

O produto precisa funcionar adequadamente em dispositivos móveis, além de oferecer uma experiência consistente em telas maiores. O briefing caracteriza um produto de consulta, sem indicação de autenticação, personalização persistente ou recursos sociais.

### Objetivo de negócio

Oferecer acesso rápido e compreensível a informações meteorológicas para apoiar decisões cotidianas, como deslocamentos, atividades ao ar livre e planejamento dos próximos dias.

### Escopo inicial identificado

- Busca e seleção de cidades.
- Exibição das condições climáticas atuais.
- Exibição da previsão para cinco dias.
- Alternância entre Celsius e Fahrenheit.
- Uso responsivo em dispositivos móveis.

### Fora do escopo identificado

Não há, no briefing, indicação de cadastro de usuários, favoritos, notificações, histórico de buscas, mapas, alertas meteorológicos, compartilhamento ou funcionamento offline.

## Personas

As personas abaixo são hipóteses iniciais para orientar discovery e validação com
usuários reais. Elas não substituem pesquisa qualitativa ou dados de uso.

### Persona 1 — Mariana, profissional em deslocamento

- **Perfil:** trabalha em modelo híbrido e precisa decidir como se vestir e como se deslocar ao longo do dia.
- **Objetivo principal:** consultar rapidamente o clima atual e a previsão dos próximos dias para uma cidade específica.
- **Contexto de uso:** principalmente **mobile**, durante a manhã, no transporte ou antes de sair de casa; pode usar conexão móvel instável e ter pouco tempo disponível.
- **Métrica de sucesso:** consegue buscar a cidade correta e identificar temperatura, condição atual e previsão relevante em até 60 segundos, sem repetir a busca ou abandonar por erro de carregamento.

### Persona 2 — Carlos, planejador de atividade ao ar livre

- **Perfil:** organiza passeios, corridas ou compromissos externos com antecedência.
- **Objetivo principal:** comparar a previsão dos cinco dias para escolher o melhor dia e horário para sua atividade.
- **Contexto de uso:** **desktop** ou tablet em casa, com mais tempo para comparar informações; eventualmente revisita a consulta pelo mobile.
- **Métrica de sucesso:** consegue consultar uma cidade e interpretar a previsão completa de cinco dias, incluindo mínimas e máximas, sem confundir datas, unidades ou localidade.

### Persona 3 — Aisha, usuária internacional ou viajante

- **Perfil:** consulta cidades em países diferentes e pode estar acostumada a Fahrenheit ou a formatos de data distintos.
- **Objetivo principal:** obter uma previsão compreensível para uma cidade estrangeira e alternar a unidade de temperatura conforme sua preferência.
- **Contexto de uso:** principalmente **mobile**, durante o planejamento ou a viagem, possivelmente com idioma, fuso horário e qualidade de conexão diferentes do país de origem.
- **Métrica de sucesso:** consegue distinguir país e região da cidade, alternar entre Celsius e Fahrenheit e compreender as datas da previsão sem precisar fazer conversões externas.

## Requisitos Funcionais

### RF01 — Buscar cidades

O sistema deve permitir que o usuário informe o nome de uma cidade e inicie uma busca.

### RF02 — Exibir resultados de busca

O sistema deve apresentar cidades compatíveis com o termo informado para que o usuário possa selecionar a localidade desejada.

### RF03 — Diferenciar localidades homônimas

Quando houver mais de uma cidade com o mesmo nome, o sistema deve exibir informações complementares, como estado, país ou região, para apoiar a seleção correta.

### RF04 — Consultar clima atual

Após a seleção de uma cidade, o sistema deve exibir as condições meteorológicas atuais da localidade selecionada.

No mínimo, a consulta deve contemplar temperatura e uma descrição ou representação do estado do tempo. Os demais indicadores, como sensação térmica, umidade e vento, dependem de confirmação de escopo.

### RF05 — Consultar previsão de cinco dias

O sistema deve exibir a previsão meteorológica dos cinco dias seguintes para a cidade selecionada.

Cada dia deve ser identificável e apresentar, no mínimo, temperaturas e uma descrição ou representação das condições previstas.

### RF06 — Alternar unidade de temperatura

O sistema deve permitir alternar a exibição de temperaturas entre graus Celsius (°C) e graus Fahrenheit (°F).

A unidade selecionada deve ser aplicada de forma consistente ao clima atual e à previsão de cinco dias.

### RF07 — Indicar estado da consulta

O sistema deve informar ao usuário quando uma busca ou consulta estiver em andamento, evitando a percepção de que a aplicação está travada.

### RF08 — Tratar ausência de resultados

Quando nenhum resultado corresponder ao termo informado, o sistema deve comunicar a situação e orientar o usuário a revisar ou alterar a busca.

### RF09 — Tratar falhas de consulta

Quando não for possível obter os dados meteorológicos, o sistema deve exibir uma mensagem compreensível e oferecer uma forma de tentar novamente.

### RF10 — Tratar estado inicial

Antes de uma cidade ser selecionada, o sistema deve apresentar um estado inicial orientando o usuário a realizar uma busca.

## Requisitos Não-Funcionais

### Classificação item a item

| Item | Classificação | Avaliação |
| --- | --- | --- |
| RF01 — Buscar cidades | Funcional | Correto: descreve uma capacidade oferecida ao usuário. |
| RF02 — Exibir resultados de busca | Funcional | Correto: descreve uma saída do sistema após a busca. |
| RF03 — Diferenciar localidades homônimas | Funcional | Correto: define uma informação que o sistema deve apresentar para permitir a seleção correta. |
| RF04 — Consultar clima atual | Funcional | Correto: descreve a informação que deve ser consultada e exibida. |
| RF05 — Consultar previsão de cinco dias | Funcional | Correto: descreve o conteúdo que o sistema deve disponibilizar. |
| RF06 — Alternar unidade de temperatura | Funcional | Correto: descreve uma interação e seu efeito na apresentação dos dados. |
| RF07 — Indicar estado da consulta | Funcional | Correto: feedback de carregamento é um comportamento observável do sistema, embora também contribua para usabilidade. |
| RF08 — Tratar ausência de resultados | Funcional | Correto: define o comportamento do sistema para um resultado vazio. |
| RF09 — Tratar falhas de consulta | Funcional | Correto: define o comportamento do sistema diante de erro e a possibilidade de nova tentativa. |
| RF10 — Tratar estado inicial | Funcional | Correto: define o conteúdo exibido antes de uma seleção. |
| RNF01 — Responsividade | Não-funcional | Correto: é uma característica de qualidade da interface em diferentes telas. |
| RNF02 — Usabilidade | Não-funcional | Correto: define a facilidade de compreensão e uso do fluxo. |
| RNF03 — Acessibilidade | Não-funcional | Correto: define a qualidade de acesso por teclado e tecnologias assistivas. |
| RNF04 — Desempenho percebido | Não-funcional | Correto: define o tempo e a fluidez das respostas, não uma funcionalidade de negócio. |
| RNF05 — Confiabilidade | Não-funcional | Correto: define a forma previsível de operação sob falhas. |
| RNF06 — Consistência de dados | Parcialmente incorreto | A unidade, a conversão e o arredondamento são regras funcionais; a consistência transversal é uma qualidade. Recomenda-se movê-lo para RF06 como critério verificável e manter aqui apenas requisitos de integridade, se necessário. |
| RNF07 — Compatibilidade | Não-funcional | Correto: define ambientes nos quais o sistema deve operar. |
| RNF08 — Segurança e privacidade | Não-funcional | Correto: define restrições de proteção e tratamento de dados. |
| RNF09 — Observabilidade | Não-funcional | Correto: define capacidade operacional de diagnóstico. |

### Requisitos não-funcionais adicionais recomendados

### RNF01 — Responsividade

A interface deve adaptar layout, tipografia, controles e conteúdo para dispositivos móveis e telas maiores, sem exigir zoom horizontal ou gerar sobreposição de elementos.

### RNF02 — Usabilidade

O fluxo principal, da busca à visualização da previsão, deve ser direto e compreensível para usuários sem conhecimento técnico. A cidade selecionada e a unidade de temperatura ativa devem permanecer claramente identificáveis.

### RNF03 — Acessibilidade

A aplicação deve ser utilizável por teclado e compatível com tecnologias assistivas. Campos, botões, alternância de unidade, mensagens de carregamento e mensagens de erro devem possuir nomes e estados acessíveis.

### RNF04 — Desempenho percebido

A aplicação deve fornecer feedback de carregamento durante operações de rede e não bloquear indefinidamente a interface. Como meta inicial, a interface deve estar pronta para interação em até 3 segundos em uma conexão móvel 4G simulada, e uma busca deve apresentar resposta, sucesso ou erro, em até 5 segundos antes de oferecer nova tentativa.

### RNF05 — Confiabilidade

A aplicação deve lidar de forma previsível com indisponibilidade da fonte de dados, respostas inválidas, cidade não encontrada e perda de conectividade.

### RNF06 — Consistência de dados

Temperaturas exibidas devem usar a unidade selecionada pelo usuário, com conversão e arredondamento consistentes em todos os componentes da tela.

### RNF07 — Compatibilidade

A aplicação deve funcionar nas versões recentes dos principais navegadores utilizados em computadores e dispositivos móveis, a serem definidas durante o planejamento técnico.

### RNF08 — Segurança e privacidade

A aplicação não deve solicitar dados pessoais para o fluxo básico de consulta. Entradas de busca e dados recebidos de fontes externas devem ser tratados com segurança antes de serem apresentados na interface.

### RNF09 — Observabilidade

Falhas de comunicação e erros de processamento devem ser registráveis para diagnóstico, sem expor informações sensíveis ao usuário final.

### RNF10 — Disponibilidade

O serviço publicado deve buscar disponibilidade mensal mínima de 99,5%, excluindo janelas de manutenção previamente comunicadas. Quando a fonte meteorológica estiver indisponível, a aplicação deve permanecer acessível, informar a falha e permitir nova tentativa sem quebrar a interface.

### RNF11 — Adaptação a dispositivos e orientações

A interface deve permanecer utilizável em larguras de viewport a partir de 320 px, em orientações retrato e paisagem, sem rolagem horizontal involuntária, perda de conteúdo ou sobreposição de controles. O conteúdo deve continuar legível com zoom de até 200%.

### RNF12 — Acessibilidade mensurável

A aplicação deve atender, no mínimo, aos critérios aplicáveis da WCAG 2.1 nível AA: navegação completa por teclado, foco visível, contraste adequado, nomes acessíveis para controles e anúncio das mudanças de carregamento, erro e resultados para tecnologias assistivas.

### RNF13 — Resiliência de rede

As requisições à fonte meteorológica devem possuir timeout definido e tratamento para falhas, respostas inválidas e perda de conectividade. A aplicação não deve exibir dados parcialmente atualizados como se fossem uma resposta válida.

### RNF14 — Cache e controle de requisições

A aplicação deve evitar requisições duplicadas desnecessárias durante uma mesma consulta e, quando tecnicamente viável e compatível com a validade dos dados, reutilizar respostas recentes por um período definido. O comportamento de dados em cache deve ser identificável para o usuário.

## Riscos

| ID | Tipo | Risco | Probabilidade | Impacto | Estratégia de mitigação |
| --- | --- | --- | --- | --- | --- |
| R01 | Técnico | A API de geocodificação ou previsão pode ficar indisponível, lenta ou sujeita a limites de requisição. | Alta | Alto | Validar limites e SLA antes da escolha, configurar timeout, tratar erros, controlar volume de chamadas, monitorar falhas e definir fallback ou mensagem de indisponibilidade. |
| R02 | Técnico | A aplicação pode depender de um formato de resposta externo que mude ou retorne dados inválidos. | Média | Alto | Isolar o acesso à API em um serviço, validar contratos e payloads, criar testes com respostas de erro e monitorar mudanças do provedor. |
| R03 | Produto | A busca pode selecionar a cidade errada em casos de homônimos, nomes traduzidos ou localidades próximas. | Alta | Alto | Exibir país, estado e coordenadas quando necessário, ordenar resultados de forma compreensível e exigir seleção explícita da localidade. |
| R04 | Produto | A previsão pode estar desatualizada, ter baixa cobertura ou divergir da expectativa do usuário. | Média | Alto | Exibir horário da última atualização e origem dos dados, definir frequência aceitável e comunicar indisponibilidade ou baixa confiança sem inventar valores. |
| R05 | Técnico | A conversão entre Celsius e Fahrenheit pode apresentar arredondamento inconsistente ou misturar unidades na mesma tela. | Média | Médio | Centralizar a conversão, definir precisão e unidade padrão, aplicar a regra a todos os componentes e cobrir casos-limite com testes. |
| R06 | Técnico | Requisições duplicadas ou busca a cada tecla podem consumir cota, aumentar latência e degradar a experiência. | Alta | Médio | Usar debounce, cancelar requisições obsoletas, desabilitar ações duplicadas e aplicar cache de curta duração quando a validade dos dados permitir. |
| R07 | Técnico | A aplicação pode expor credenciais da API ou ficar vulnerável a abuso automatizado. | Média | Alto | Não embutir segredos no cliente, usar proxy quando necessário, aplicar rate limiting, restringir origens e revisar entradas e dependências. |
| R08 | Técnico | A interface pode falhar em celulares pequenos, em paisagem, com zoom ou com conteúdo de tamanhos variáveis. | Média | Alto | Projetar mobile-first, testar viewport mínimo de 320 px, orientações e zoom de 200%, e executar testes visuais em navegadores móveis. |
| R09 | Produto | O app pode exibir informação complexa demais ou insuficiente para o público real. | Média | Alto | Confirmar personas e decisões de uso, validar protótipos com usuários, priorizar métricas essenciais e testar compreensão dos rótulos e ícones. |
| R10 | Produto | Os critérios “clima atual” e “previsão de cinco dias” podem ser interpretados de formas diferentes. | Alta | Alto | Definir campos, granularidade, contagem de dias, fuso horário e critérios de aceite antes do desenvolvimento. |
| R11 | Produto | Usuários podem interpretar a previsão como garantia ou tomar decisões críticas com dados inadequados. | Média | Alto | Apresentar fonte e horário, usar linguagem informativa, destacar limitações e definir política para eventos meteorológicos severos com produto e jurídico. |
| R12 | Produto | O app pode não ser acessível a pessoas que usam teclado, leitor de tela ou configurações ampliadas. | Média | Alto | Adotar WCAG 2.1 nível AA como referência, testar navegação por teclado e leitor de tela, usar nomes acessíveis e validar contraste e foco. |
| R13 | Técnico | Perda de conectividade ou timeout pode deixar a tela travada, vazia ou mostrando dados parcialmente atualizados. | Alta | Alto | Definir estados de carregamento, erro e vazio, configurar timeout, cancelar chamadas antigas, preservar o último estado válido e oferecer nova tentativa claramente. |
| R14 | Técnico | A disponibilidade da aplicação pode ser menor que a da API, por falhas de hospedagem, deploy ou observabilidade insuficiente. | Baixa | Alto | Definir meta de disponibilidade, usar health checks, logs e alertas, automatizar deploy com rollback e acompanhar erros e latência em produção. |
| R15 | Produto | A unidade, idioma, cidade padrão ou preferências esperadas podem não corresponder ao mercado de lançamento. | Média | Médio | Confirmar país e público prioritário, definir padrão de localidade, validar com usuários e tornar preferências explícitas e persistentes somente quando aprovado. |
| R16 | Produto | Pedidos de favoritos, alertas, geolocalização ou previsão horária podem expandir o escopo e atrasar o MVP. | Alta | Médio | Formalizar o escopo mínimo, registrar extensões no backlog, usar critérios de entrada para mudanças e priorizar por valor e esforço. |

## Perguntas em Aberto

1. Qual fonte de dados meteorológicos será utilizada e ela exige autenticação, atribuição ou possui limites de requisição?
2. Quais campos devem ser exibidos no clima atual: temperatura, sensação térmica, umidade, vento, condição, ícone e horário de atualização?
3. O que exatamente significa “previsão de 5 dias”: hoje mais quatro dias ou os cinco dias completos após o dia atual?
4. Quais informações devem aparecer para cada dia da previsão, incluindo máximas, mínimas, precipitação e probabilidade de chuva?
5. A busca deve aceitar apenas nomes de cidades ou também CEP, estado, país e coordenadas?
6. Como o sistema deve ordenar e limitar os resultados de busca?
7. O usuário deve poder definir uma cidade padrão ou manter um histórico/favoritos?
8. A unidade escolhida deve ser persistida entre sessões? Em caso afirmativo, onde e por quanto tempo?
9. Qual idioma e quais formatos de data, hora e localidade devem ser suportados?
10. A aplicação deve detectar automaticamente a localização do usuário? Isso exigiria consentimento e tratamento específico de privacidade.
11. Quais navegadores, versões mínimas e tamanhos de tela são oficialmente suportados?
12. Existem metas objetivas de desempenho, disponibilidade e tempo máximo para resposta?
13. Qual nível de acessibilidade deve ser atendido, por exemplo, WCAG 2.1 nível AA?
14. Há necessidade de cache ou funcionamento parcial quando o dispositivo estiver sem conexão?
15. Quais mensagens, unidades e critérios visuais devem ser usados para condições meteorológicas severas?
16. Existem requisitos legais, de marca ou de atribuição da fonte de dados que devam aparecer na interface?

## Análise Cética do Briefing

O briefing define a ideia central, mas ainda não é suficiente para estimar,
construir ou aceitar o produto sem decisões adicionais. Abaixo estão as
principais ambiguidades e lacunas identificadas. O impacto descreve o que pode
acontecer caso a equipe siga adiante assumindo uma resposta.

| Tema | Pergunta em aberto | Impacto de seguir sem resposta |
| --- | --- | --- |
| Objetivo | Qual problema prioritário o app deve resolver e como o sucesso será medido? | A equipe pode otimizar para uma experiência que não atende ao objetivo de negócio e não terá critério para avaliar se o produto deu certo. |
| Público | Quem são os usuários primários: público geral, viajantes, agricultores, equipes operacionais ou outro grupo? | Público, linguagem, densidade de dados e prioridades de interface podem ser inadequados para quem realmente usará o produto. |
| Escopo | O briefing representa um MVP ou a visão completa do produto? | O time pode entregar funcionalidades demais, atrasar o lançamento ou criar uma solução incompatível com expectativas futuras. |
| Plataforma | O produto será somente web responsivo ou também deverá ser uma PWA, aplicativo instalável ou app nativo? | Arquitetura, estratégia de distribuição, permissões e esforço de desenvolvimento podem mudar significativamente. |
| Regiões | Quais países, cidades e idiomas devem ser atendidos no lançamento? | A busca, a fonte de dados, os formatos de localidade e os testes podem cobrir apenas um subconjunto incorreto do público. |
| Localidade | Como uma cidade deve ser identificada quando existem homônimos ou nomes em alfabetos diferentes? | O usuário pode receber a previsão de outra localidade, comprometendo confiança e segurança da informação. |
| Busca | A busca aceitará apenas nomes de cidades ou também CEP, estado, país, coordenadas e localização atual? | O desenho do campo, o provedor de geocodificação, o custo e a privacidade podem ser definidos de forma errada. |
| Busca | Os resultados devem aparecer enquanto o usuário digita ou somente após envio explícito? | Pode haver latência percebida, excesso de requisições, consumo de cota e uma experiência de interação diferente da esperada. |
| Busca | Como resultados serão ordenados, limitados e apresentados? | Usuários podem não encontrar a cidade correta, especialmente quando há muitos homônimos. |
| Estado inicial | Deve existir uma cidade padrão, localização aproximada ou apenas uma tela vazia para iniciar a busca? | A primeira experiência pode ficar sem conteúdo ou solicitar permissões inesperadas. |
| Clima atual | Quais variáveis compõem “clima atual” e qual é o nível de detalhe necessário? | O time pode entregar dados insuficientes ou uma interface superdimensionada, gerando retrabalho de API e design. |
| Atualidade | Com que frequência os dados atuais devem ser atualizados e o usuário poderá atualizar manualmente? | Informações antigas podem ser apresentadas como atuais, ou requisições excessivas podem elevar custo e atingir limites da fonte. |
| Previsão | “Previsão de 5 dias” inclui o dia corrente ou cinco dias completos futuros? | A contagem e o conteúdo exibido podem divergir da expectativa do usuário e dos critérios de aceite. |
| Granularidade | A previsão será diária ou também haverá previsão por hora? | O modelo de dados, o volume de informação, o layout e o esforço de implementação podem mudar. |
| Métricas | Quais dados devem aparecer por dia: máxima, mínima, chuva, vento, umidade, nascer e pôr do sol? | Não será possível definir contratos de dados, wireframes e testes completos. |
| Condições severas | O app deve emitir alertas, destacar eventos extremos ou apenas exibir a previsão recebida? | Omissões ou mensagens inadequadas podem induzir decisões perigosas e criar responsabilidade operacional e legal. |
| Unidades | A alternância deve abranger somente temperatura ou também vento, precipitação, pressão e visibilidade? | Parte dos valores pode permanecer em unidades inesperadas, reduzindo compreensão e confiança. |
| Unidade padrão | Qual unidade será padrão e a escolha deve seguir localização, idioma ou preferência persistida? | Usuários podem ver valores inesperados, e a decisão pode precisar ser refeita após a implementação. |
| Conversão | Qual precisão, arredondamento e regra de conversão devem ser usados? | Valores podem divergir entre componentes, causando falhas de teste e perda de credibilidade. |
| Fonte de dados | Qual serviço fornecerá geocodificação e previsão, com quais limites, SLA, licença e atribuição? | A solução pode ser tecnicamente inviável, cara, irregular ou impossibilitada de ser publicada. |
| Fuso horário | Datas e horários serão exibidos no fuso da cidade consultada, do usuário ou em UTC? | O dia da previsão e o horário de atualização podem ser interpretados incorretamente. |
| Qualidade | Como o produto tratará dados ausentes, divergentes, atrasados ou fora da cobertura? | A interface pode exibir campos vazios, valores falsos ou uma falsa aparência de precisão. |
| Falhas | Qual comportamento é esperado sem internet, com timeout, erro da API ou limite de requisições? | Usuários podem ficar sem feedback, repetir ações desnecessariamente ou interpretar uma falha como ausência de previsão. |
| Cache | É permitido exibir a última resposta conhecida quando a fonte estiver indisponível? Por quanto tempo? | Sem decisão, a equipe pode esconder dados potencialmente obsoletos ou desperdiçar requisições úteis. |
| Persistência | A cidade e a unidade escolhidas devem permanecer após recarregar a página ou entre sessões? | A experiência pode parecer inconsistente e a implementação pode introduzir armazenamento sem decisão de privacidade. |
| Autenticação | Existe algum perfil, login, favorito ou sincronização entre dispositivos no escopo? | A equipe pode construir persistência desnecessária ou descobrir tarde uma necessidade de conta e backend. |
| Geolocalização | O usuário poderá usar sua localização atual? Como será obtido consentimento e qual será o fallback? | Permissões negadas, requisitos de privacidade e fluxos de erro podem quebrar a experiência inicial. |
| Acessibilidade | Qual padrão e nível devem ser atendidos, e quais tecnologias assistivas serão testadas? | Barreiras de acesso podem ser descobertas tarde, exigindo retrabalho estrutural e possivelmente impedindo conformidade. |
| Responsividade | Quais larguras, orientações, tamanhos de texto e dispositivos fazem parte do suporte oficial? | O layout pode funcionar apenas no dispositivo usado pela equipe e falhar para uma parcela do público. |
| Compatibilidade | Quais navegadores e versões mínimas devem ser suportados? | Dependências e APIs podem ser escolhidas sem garantir funcionamento nos ambientes reais. |
| Performance | Quais metas de carregamento, tempo de busca e tamanho de página são aceitáveis em redes móveis? | “Rápido” ficará subjetivo, e problemas de experiência só aparecerão após o lançamento. |
| Disponibilidade | Qual disponibilidade é esperada para a aplicação e qual é o comportamento quando a API meteorológica cai? | Não haverá meta operacional, priorização de resiliência ou comunicação clara sobre indisponibilidade. |
| Segurança | Haverá proxy/backend, chaves privadas, rate limiting ou proteção contra abuso? | Credenciais podem ser expostas no navegador, a cota pode ser consumida por abuso e o serviço pode ser interrompido. |
| Privacidade | Serão coletados localização, analytics, logs ou identificadores? Por quanto tempo e com qual base legal? | O produto pode violar políticas internas ou legislação aplicável e exigir alterações arquiteturais posteriores. |
| Conteúdo | Quem define textos, ícones, cores, idioma, formato de datas e mensagens de erro? | A interface pode ser inconsistente, inacessível ou inadequada ao mercado de lançamento. |
| Métricas | Quais eventos serão medidos, como busca concluída, erro e troca de unidade, e quais são os limites de privacidade? | O time não conseguirá validar adoção nem diagnosticar gargalos de uso após o lançamento. |
| Operação | Quem monitora erros, atualiza dependências e responde a incidentes da fonte de dados? | Falhas podem permanecer sem diagnóstico e a disponibilidade real pode degradar sem responsável definido. |
| Aceite | Quais são os critérios objetivos para considerar busca, previsão, conversão e mobile “prontos”? | Produto, design e engenharia podem ter interpretações diferentes de conclusão, gerando disputas e retrabalho. |
| Lançamento | Existe prazo, orçamento, equipe, ambiente de hospedagem e estratégia de rollout? | A solução pode exceder recursos disponíveis ou não ter caminho viável até usuários reais. |

## Decisões

As decisões abaixo foram confirmadas para destravar a especificação do MVP.
Elas resolvem parte das perguntas em aberto, mas não substituem as decisões
que continuam pendentes na seção correspondente.

### D01 — Fonte de dados: Open-Meteo

- **Decisão:** utilizar o Open-Meteo para geocodificação e dados de previsão meteorológica.
- **Justificativa:** a fonte atende ao escopo de busca e previsão sem exigir API key, reduzindo a complexidade de configuração, armazenamento de credenciais e operação inicial.
- **Perguntas resolvidas:** qual fonte será utilizada; se o fluxo básico exige autenticação; e qual integração será considerada no MVP.
- **Ainda requer confirmação:** limites de uso, política de atribuição, cobertura, frequência de atualização e comportamento em indisponibilidade.

### D02 — Definição de cinco dias: hoje + quatro dias

- **Decisão:** a previsão exibirá o dia atual e os quatro dias seguintes, totalizando cinco dias corridos.
- **Justificativa:** elimina a ambiguidade da contagem e mantém o dia atual junto da perspectiva de curto prazo mais útil para o usuário.
- **Perguntas resolvidas:** o que significa “previsão de 5 dias” e se o dia corrente está incluído.
- **Ainda requer confirmação:** granularidade diária ou horária e os campos exibidos em cada dia.

### D03 — Unidade padrão: Celsius

- **Decisão:** iniciar a aplicação exibindo temperaturas em graus Celsius (°C), com possibilidade de alternância para Fahrenheit (°F).
- **Justificativa:** Celsius é a unidade esperada para o público e o idioma inicialmente definidos para o produto.
- **Perguntas resolvidas:** qual unidade será exibida por padrão.
- **Ainda requer confirmação:** precisão, arredondamento, persistência local da preferência e se a alternância abrangerá outras grandezas além da temperatura.

### D04 — Sem autenticação e sem persistência de servidor

- **Decisão:** o MVP não terá cadastro, login, autenticação nem armazenamento de dados do usuário em servidor.
- **Justificativa:** mantém o produto focado na consulta imediata, reduzindo escopo, requisitos de infraestrutura e responsabilidades de proteção de dados.
- **Perguntas resolvidas:** se haverá autenticação, perfis, favoritos sincronizados ou persistência de servidor.
- **Ainda requer confirmação:** se preferências não sensíveis, como unidade ou última cidade, poderão ser armazenadas localmente no dispositivo.

### D05 — Idioma da interface: pt-BR

- **Decisão:** a interface, mensagens, rótulos e formatos de apresentação do MVP serão direcionados ao português do Brasil.
- **Justificativa:** fornece uma experiência coerente para o mercado inicial e evita que internacionalização seja tratada parcialmente ou de forma inconsistente.
- **Perguntas resolvidas:** qual idioma inicial da interface e qual mercado linguístico será priorizado.
- **Ainda requer confirmação:** suporte futuro a outros idiomas, formato exato de data e hora e regras de localização para cidades fora do Brasil.

## Suposições

1. O MVP será público e não exigirá cadastro ou autenticação.
2. A aplicação consultará o Open-Meteo para geocodificação e dados meteorológicos por cidade selecionada.
3. O usuário iniciará a busca manualmente; geolocalização automática não faz parte do escopo inicial.
4. A busca retornará uma ou mais opções e o usuário selecionará explicitamente uma localidade antes da consulta da previsão.
5. A previsão cobrirá cinco dias corridos: hoje e os quatro dias seguintes; a granularidade e os campos ainda dependem de confirmação.
6. Celsius será a unidade padrão inicial, com alternância para Fahrenheit.
7. O idioma inicial da interface será português do Brasil.
8. Os dados exibidos serão informativos e dependerão da disponibilidade e qualidade do serviço externo.
9. A alternância de unidade não exigirá nova consulta à fonte de dados quando a conversão local for suficiente.
10. O produto deve priorizar o uso em celular, mas também atender a computadores e tablets.
11. Não haverá notificações, alertas personalizados, favoritos, histórico ou sincronização entre dispositivos no primeiro lançamento.
12. O sistema exibirá estados explícitos de carregamento, erro, ausência de resultados e ausência de cidade selecionada.
13. O horário atual e os dias da previsão serão apresentados conforme o fuso horário da cidade consultada, caso a fonte disponibilize essa informação.
14. A equipe poderá definir detalhes de arquitetura, identidade visual e fonte de dados durante as fases de especificação e planejamento técnico.
