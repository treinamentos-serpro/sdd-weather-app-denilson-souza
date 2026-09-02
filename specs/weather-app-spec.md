# Weather App — Especificação de Produto

## Overview

### Visão do produto

O Weather App é uma aplicação web responsiva para consulta das condições
meteorológicas de uma cidade. O usuário poderá buscar e selecionar uma
localidade, visualizar o clima atual, consultar uma previsão de cinco dias e
alternar a unidade de temperatura entre Celsius e Fahrenheit.

### Objetivos

- Permitir que uma pessoa encontre rapidamente a cidade correta.
- Apresentar informações meteorológicas atuais de forma clara.
- Exibir uma visão de curto prazo para apoiar planejamento cotidiano.
- Oferecer uma experiência utilizável em dispositivos móveis e telas maiores.
- Entregar o MVP sem autenticação e sem persistência de dados em servidor.

### Decisões confirmadas

- **Fonte de dados:** Open-Meteo para geocodificação e previsão meteorológica.
- **Período da previsão:** cinco dias corridos, compostos pelo dia atual e os quatro dias seguintes.
- **Unidade padrão:** Celsius (°C), com alternância para Fahrenheit (°F).
- **Idioma da interface:** português do Brasil (pt-BR).
- **Autenticação:** não faz parte do MVP.
- **Persistência em servidor:** não faz parte do MVP.

### Usuários-alvo

As personas são hipóteses iniciais: Mariana, que precisa de uma consulta rápida
no mobile; Carlos, que compara dias para planejar uma atividade; e Aisha, que
consulta cidades e pode preferir Fahrenheit. Elas devem orientar a validação,
mas não substituem pesquisa com usuários reais.

## Functional Requirements

### FR01 — Buscar cidades

O sistema deve permitir que o usuário informe o nome de uma cidade e inicie uma
busca usando o serviço de geocodificação definido para o produto.

### FR02 — Exibir resultados de busca

O sistema deve apresentar os resultados compatíveis com o termo pesquisado para
que o usuário possa escolher uma localidade.

### FR03 — Identificar a localidade

Cada resultado deve apresentar informação suficiente para diferenciar cidades
homônimas, incluindo, quando disponível, estado, região e país.

### FR04 — Selecionar uma cidade

O sistema deve permitir que o usuário selecione um resultado antes de consultar
os dados meteorológicos daquela localidade.

### FR05 — Exibir o clima atual

Após a seleção de uma cidade, o sistema deve exibir pelo menos a temperatura
atual e uma descrição ou representação da condição meteorológica.

### FR06 — Exibir previsão de cinco dias

Após a seleção de uma cidade, o sistema deve exibir a previsão diária do dia
atual e dos quatro dias seguintes. Cada dia deve ser identificável e apresentar,
no mínimo, temperaturas e uma descrição ou representação da condição prevista.

### FR07 — Alternar unidade de temperatura

O sistema deve permitir alternar entre Celsius e Fahrenheit. A unidade ativa
deve ser identificável e aplicada ao clima atual e a todos os dias da previsão.

### FR08 — Informar carregamento

Enquanto uma busca ou consulta meteorológica estiver em andamento, o sistema
deve informar que os dados estão sendo carregados e evitar que o usuário
interprete a tela como travada.

### FR09 — Tratar busca sem resultados

Quando o termo não produzir resultados, o sistema deve informar que nenhuma
cidade foi encontrada e permitir que o usuário revise a busca.

### FR10 — Tratar falha de dados

Quando a aplicação não conseguir obter os dados meteorológicos, deve apresentar
uma mensagem compreensível e oferecer uma ação de nova tentativa.

### FR11 — Apresentar estado inicial

Antes de uma cidade ser selecionada, o sistema deve apresentar uma orientação
para que o usuário realize uma busca.

### FR12 — Preservar a localidade selecionada durante a consulta

Enquanto os dados da cidade selecionada estiverem sendo exibidos, a interface
deve manter visíveis o nome da localidade e as informações necessárias para
confirmar que a previsão corresponde à cidade escolhida.

## User Stories

### US01 — Consulta rápida no deslocamento

Como Mariana, profissional em deslocamento, quero buscar uma cidade e ver o
clima atual rapidamente para decidir como me vestir e como me deslocar.

### US02 — Planejamento de atividade

Como Carlos, planejador de atividade ao ar livre, quero consultar cinco dias de
previsão para escolher o melhor dia para minha atividade.

### US03 — Uso em unidade alternativa

Como Aisha, usuária internacional ou viajante, quero alternar a temperatura
entre Celsius e Fahrenheit para interpretar a previsão sem fazer conversões
externas.

### US04 — Seleção segura da cidade

Como usuário que pesquisa uma cidade com homônimos, quero ver país, estado ou
região nos resultados para selecionar a localidade correta.

### US05 — Recuperação de falhas

Como usuário com conexão instável, quero receber uma mensagem clara e poder
tentar novamente quando a consulta não puder ser concluída.

## Acceptance Criteria

Os critérios abaixo são verificáveis e devem ser usados para avaliar as stories
e os requisitos funcionais do MVP.

### US01 — Critérios de aceitação

- Dado que o usuário esteja no estado inicial, quando informar um termo válido e iniciar a busca, então o sistema deve indicar o carregamento e apresentar os resultados quando a busca for concluída.
- Dado que exista um resultado correspondente, quando o usuário selecionar a cidade, então o sistema deve exibir o nome da cidade selecionada, a temperatura atual e a condição meteorológica.
- Dado que a consulta esteja em andamento, então a interface deve fornecer feedback de carregamento e não permanecer sem indicação de atividade.

### US02 — Critérios de aceitação

- Dado que uma cidade tenha sido selecionada, quando a consulta for concluída com sucesso, então o sistema deve exibir exatamente cinco dias: o dia atual e os quatro dias seguintes.
- Cada dia exibido deve possuir uma data ou rótulo compreensível, temperaturas e uma condição meteorológica.
- A ordem dos dias deve ser cronológica e não pode conter datas duplicadas.

### US03 — Critérios de aceitação

- Dado que a unidade inicial seja Celsius, então a temperatura atual e as temperaturas da previsão devem exibir o símbolo ou rótulo `°C`.
- Quando o usuário selecionar Fahrenheit, então todos os valores de temperatura visíveis devem ser atualizados para `°F` sem nova consulta obrigatória aos dados meteorológicos.
- Quando o usuário retornar para Celsius, então os valores devem voltar à unidade Celsius com a mesma regra de arredondamento definida para o produto.

### US04 — Critérios de aceitação

- Dado que a busca retorne cidades homônimas, então cada resultado deve apresentar país e, quando disponível, estado ou região.
- Quando o usuário selecionar um resultado, então a consulta meteorológica deve usar a localidade selecionada, e não apenas o texto digitado.
- O nome da localidade apresentada na tela de previsão deve corresponder ao resultado escolhido.

### US05 — Critérios de aceitação

- Dado que não existam resultados para o termo, então o sistema deve apresentar uma mensagem de ausência de resultados e manter a possibilidade de editar a busca.
- Dado que a fonte de dados falhe, retorne erro ou exceda o tempo limite, então o sistema deve apresentar uma mensagem compreensível e uma ação de nova tentativa.
- Uma falha em uma consulta não deve deixar a interface bloqueada indefinidamente.

### Critérios adicionais dos requisitos funcionais

- **FR01/FR02:** termos válidos devem produzir resultados; termos vazios ou compostos apenas por espaços não devem iniciar uma consulta.
- **FR03/FR04:** o usuário deve conseguir diferenciar e selecionar uma localidade sem depender somente do nome da cidade.
- **FR05:** a tela de clima atual deve identificar claramente a cidade e a unidade da temperatura.
- **FR06:** a previsão deve conter cinco dias corridos, começando pelo dia atual no fuso definido para a localidade.
- **FR07:** a troca de unidade deve atualizar tanto o clima atual quanto todos os cards ou linhas da previsão.
- **FR08:** os estados de busca e consulta devem ser distinguíveis dos estados inicial, vazio e erro.
- **FR09:** uma busca sem resultados deve permitir uma nova pesquisa sem recarregar obrigatoriamente a aplicação.
- **FR10:** a nova tentativa deve disparar uma nova consulta e substituir o estado de erro por carregamento.
- **FR11:** no primeiro acesso, o usuário deve encontrar uma orientação e um controle para iniciar a busca.
- **FR12:** após uma seleção bem-sucedida, a localidade exibida deve permanecer coerente com os dados apresentados.

## Non-Functional Requirements

### NFR01 — Responsividade

A interface deve ser utilizável em viewport a partir de 320 px, em orientações
retrato e paisagem, sem rolagem horizontal involuntária, sobreposição ou perda
de conteúdo.

### NFR02 — Acessibilidade

A aplicação deve atender aos critérios aplicáveis da WCAG 2.1 nível AA, com
navegação por teclado, foco visível, nomes acessíveis, contraste adequado e
comunicação acessível para carregamento, resultados, estado vazio e erro.

### NFR03 — Desempenho

Em uma referência de dispositivo móvel e conexão 4G simulada, a interface deve
estar pronta para interação em até 3 segundos. Uma busca deve apresentar sucesso
ou erro em até 5 segundos, salvo indisponibilidade da fonte externa; nesse caso,
deve informar o estado e permitir nova tentativa.

### NFR04 — Disponibilidade

O serviço publicado deve buscar disponibilidade mensal mínima de 99,5%,
considerando a aplicação sob controle da equipe e excluindo manutenções
programadas. A indisponibilidade do provedor meteorológico não deve quebrar a
interface.

### NFR05 — Confiabilidade e resiliência

Falhas de conectividade, timeout, resposta inválida e limite de requisições
devem resultar em estados previsíveis. Dados parcialmente atualizados não devem
ser apresentados como uma resposta completa e válida.

### NFR06 — Compatibilidade

A aplicação deve funcionar nas versões recentes dos principais navegadores em
desktop, tablet e mobile que forem confirmadas para o lançamento.

### NFR07 — Consistência de apresentação

Todos os valores de temperatura visíveis devem seguir a unidade ativa e a mesma
regra de conversão e arredondamento. Datas e horários devem seguir o formato
pt-BR, respeitando o fuso definido para a localidade quando essa informação
estiver disponível.

### NFR08 — Segurança e privacidade

O fluxo básico não deve exigir dados pessoais, autenticação ou armazenamento de
dados em servidor. Entradas do usuário e dados externos devem ser tratados de
forma segura antes da apresentação.

### NFR09 — Observabilidade

Falhas de comunicação e processamento devem ser registráveis para diagnóstico,
sem expor dados sensíveis ou detalhes internos ao usuário.

### NFR10 — Controle de requisições

A aplicação deve evitar consultas duplicadas desnecessárias, não deve disparar
busca para entrada vazia e deve lidar com consultas concorrentes sem permitir
que uma resposta antiga sobrescreva uma busca mais recente.

## Edge Cases

| Situação | Comportamento esperado |
| --- | --- |
| Campo de busca vazio ou com espaços | Não consultar a fonte e orientar o preenchimento do nome da cidade. |
| Termo muito curto ou inválido | Informar que a busca não é válida ou não encontrou resultados, sem quebrar a interface. |
| Cidade inexistente | Exibir estado sem resultados e permitir nova tentativa. |
| Muitas cidades com o mesmo nome | Exibir país, estado ou região para desambiguar antes da seleção. |
| Cidade fora do Brasil | Permitir a consulta se houver cobertura da fonte e manter a interface em pt-BR. |
| Resultado sem dados complementares | Exibir somente os dados disponíveis para identificação, sem inventar localização. |
| Falha de geocodificação | Informar que a cidade não pôde ser localizada e permitir nova busca. |
| Falha no serviço de previsão | Exibir erro, manter a aplicação utilizável e oferecer nova tentativa. |
| Timeout | Encerrar o estado de espera conforme o limite definido e mostrar uma ação de nova tentativa. |
| Perda de conexão durante a consulta | Informar falha de conexão; não apresentar resposta incompleta como válida. |
| Resposta inválida ou campos ausentes | Tratar como erro de dados e não renderizar valores incorretos como se fossem atuais. |
| Duas buscas iniciadas rapidamente | A resposta correspondente à consulta mais recente deve prevalecer. |
| Alternância de unidade durante carregamento | A unidade escolhida deve ser aplicada quando os dados forem exibidos, sem misturar unidades. |
| Dados de temperatura negativos ou próximos de zero | Exibir corretamente sinal, unidade e arredondamento. |
| Mudança de dia ou fuso horário | A lista deve continuar representando hoje e os quatro dias seguintes no fuso definido para a cidade. |
| Viewport de 320 px ou zoom de 200% | Manter leitura, foco e operação sem sobreposição ou rolagem horizontal involuntária. |
| Navegação apenas por teclado | Permitir alcançar, operar e perceber busca, resultados, unidade e nova tentativa. |
| Leitor de tela | Anunciar nomes, resultados e mudanças de carregamento ou erro de forma compreensível. |

## Assumptions

- O MVP será público e não exigirá cadastro, login ou autenticação.
- Open-Meteo será usado para geocodificação e previsão, sujeito às suas políticas, limites e cobertura.
- A consulta será iniciada manualmente pelo usuário; geolocalização automática não faz parte do escopo confirmado.
- O usuário selecionará explicitamente uma localidade antes da consulta meteorológica.
- A previsão será diária e terá cinco dias corridos: hoje mais quatro dias; a inclusão de previsão horária permanece em aberto.
- Celsius será a unidade padrão e Fahrenheit estará disponível para alternância.
- A interface e suas mensagens serão apresentadas em português do Brasil.
- Não haverá persistência de cidade, unidade ou favoritos em servidor; persistência local ainda depende de decisão.
- Os dados serão informativos e dependerão da disponibilidade e qualidade da fonte externa.
- A aplicação deverá apresentar estados explícitos de carregamento, erro, ausência de resultados e estado inicial.
- A equipe poderá definir detalhes de arquitetura, hospedagem e observabilidade no plano técnico, desde que não alterem o comportamento especificado.

## Risks

| ID | Risco | Probabilidade | Impacto | Mitigação |
| --- | --- | --- | --- | --- |
| R1 | Open-Meteo ficar indisponível, lento ou sujeito a limites de uso. | Alta | Alto | Definir timeout, tratar falhas, controlar requisições, monitorar erros e comunicar indisponibilidade. |
| R2 | A busca selecionar uma cidade incorreta por homônimos ou dados incompletos. | Alta | Alto | Exibir contexto geográfico e consultar a previsão a partir da localidade selecionada. |
| R3 | Contrato ou qualidade dos dados externos não atender ao conteúdo necessário. | Média | Alto | Validar cobertura e campos antes do desenvolvimento e tratar respostas inválidas ou incompletas. |
| R4 | Consultas duplicadas consumirem limite e aumentarem a latência. | Alta | Médio | Controlar frequência de busca, evitar duplicidade e descartar respostas obsoletas. |
| R5 | Falhas de rede deixarem a interface travada ou exibindo dados parciais. | Alta | Alto | Definir estados de rede, timeout, cancelamento lógico e nova tentativa. |
| R6 | Layout ou controles falharem em telas pequenas e configurações ampliadas. | Média | Alto | Validar viewport mínimo, orientações, zoom, teclado e testes em navegadores móveis. |
| R7 | Barreiras de acessibilidade impedirem o uso por parte do público. | Média | Alto | Adotar WCAG 2.1 AA, testar com teclado e tecnologias assistivas e corrigir antes do aceite. |
| R8 | Usuários interpretarem previsão informativa como garantia para decisões críticas. | Média | Alto | Exibir fonte e horário, comunicar limitações e definir tratamento para condições severas. |
| R9 | Definições incompletas sobre campos e granularidade causarem retrabalho de produto e dados. | Alta | Alto | Resolver as perguntas abertas antes de congelar wireframes, contratos e critérios de aceite. |
| R10 | Crescimento de escopo com favoritos, alertas, geolocalização ou previsão horária. | Alta | Médio | Manter esses itens fora do MVP e controlar mudanças por priorização formal. |

## Out of Scope

Os itens abaixo não fazem parte do MVP:

- Cadastro, login, autenticação e perfis de usuário.
- Persistência de cidade, preferências ou favoritos em servidor.
- Favoritos, histórico de buscas e sincronização entre dispositivos.
- Notificações push, alertas personalizados ou avisos meteorológicos proativos.
- Geolocalização automática do dispositivo.
- Mapas meteorológicos ou camadas geográficas.
- Compartilhamento de previsões em redes sociais ou por link personalizado.
- Funcionamento offline completo.
- Previsão horária, salvo decisão posterior registrada em escopo.
- Suporte multilíngue além da interface inicial em pt-BR.

## Open Questions

As perguntas abaixo devem ser respondidas antes do congelamento da especificação
detalhada e do plano técnico:

1. Quais campos exatos serão exibidos no clima atual e em cada dia da previsão?
2. A previsão diária será suficiente ou haverá previsão por hora no MVP?
3. Como o fuso horário da cidade será obtido e aplicado à definição de “hoje” e às datas exibidas?
4. A busca ocorrerá somente após envio ou enquanto o usuário digita? Qual será o limite e a ordenação dos resultados?
5. Quais navegadores e versões mínimas fazem parte do suporte oficial?
6. Qual precisão e regra de arredondamento serão usadas na conversão de Celsius para Fahrenheit?
7. A unidade ou a última cidade poderão ser persistidas localmente, sem servidor?
8. Qual será o TTL do cache e será permitido apresentar dados antigos quando a fonte estiver indisponível?
9. A aplicação chamará o Open-Meteo diretamente ou usará uma camada intermediária? Qual será a política de rate limiting?
10. Quais limites de uso, requisitos de atribuição e regras de licença do Open-Meteo precisam ser refletidos no produto?
11. Qual é a meta de disponibilidade dos dados meteorológicos, separada da disponibilidade da aplicação?
12. Quais mensagens e destaques serão usados para condições meteorológicas severas?
13. Haverá analytics? Em caso afirmativo, quais eventos serão coletados e como a privacidade será preservada?
14. Qual equipe será responsável por monitorar falhas, atualizar dependências e responder a incidentes?
15. Quais critérios objetivos definirão que a busca, a previsão, a acessibilidade e a experiência mobile estão prontas para lançamento?