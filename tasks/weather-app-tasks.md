# Weather App — Backlog Ordenado de Tarefas

Backlog derivado de `plans/weather-app-plan.md`. A ordem foi definida para
respeitar a sequência de implementação: tipos → funções puras → services → hook
→ componentes → integração → testes → hardening. Cada tarefa é uma unidade
testável e possui dependências explícitas.

## Entrega 1 — Tipos e contratos

### T-01 — Inicializar o ponto de entrada React

- **Descrição:** Preparar os pontos de entrada mínimos da SPA sem implementar o fluxo meteorológico.
- **Critérios de aceite:** A aplicação inicia pelo comando do `package.json`, o TypeScript strict compila sem erro e um elemento React é renderizado no DOM.
- **Dependências:** Nenhuma.
- **Arquivos prováveis:** `src/main.tsx`, `src/App.tsx`.
- **Tipo:** Infra
- **Rastreabilidade:** NFR06.

### T-02 — Definir contratos de cidade e unidade

- **Descrição:** Criar os tipos `City` e `TemperatureUnit`.
- **Critérios de aceite:** `City` exige id, nome, país, latitude e longitude; estado, região e timezone são opcionais; a unidade aceita somente Celsius ou Fahrenheit.
- **Dependências:** T-01.
- **Arquivos prováveis:** `src/types/weather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR03, FR04, FR07.

### T-03 — Definir contratos meteorológicos e de estado

- **Descrição:** Criar `CurrentWeather`, `DailyForecast`, `WeatherReport` e `WeatherViewState`.
- **Critérios de aceite:** Temperaturas canônicas são representadas em Celsius; o relatório suporta cinco dias; o estado diferencia idle, busca, resultados, loading, sucesso, vazio e erro.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/types/weather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR05, FR06, FR08, FR09, FR10, NFR05.

## Entrega 2 — Funções puras

### T-04 — Implementar conversão de temperatura

- **Descrição:** Criar função pura para converter Celsius em Fahrenheit e preservar Celsius.
- **Critérios de aceite:** A conversão usa a fórmula correta; Celsius não sofre alteração; negativos e zero são tratados sem perda de sinal.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/utils/temperature.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR07, NFR07.

### T-05 — Definir formatação de temperatura

- **Descrição:** Criar a função pura que aplica precisão, arredondamento e símbolo da unidade.
- **Critérios de aceite:** A precisão definida para o MVP está documentada; a saída contém exatamente uma unidade; o mesmo valor formatado segue a mesma regra em Celsius e Fahrenheit.
- **Dependências:** T-04.
- **Arquivos prováveis:** `src/utils/temperature.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR07, NFR07.

### T-06 — Mapear códigos meteorológicos

- **Descrição:** Mapear códigos do Open-Meteo para rótulos controlados em pt-BR.
- **Critérios de aceite:** Códigos suportados têm rótulo; código desconhecido usa fallback genérico; nenhum texto arbitrário da API é exibido como condição.
- **Dependências:** T-03.
- **Arquivos prováveis:** `src/utils/weatherCodes.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR05, FR06, NFR08.

## Entrega 3 — Services e contratos externos

### T-07 — Definir parâmetros de geocodificação

- **Descrição:** Registrar endpoint, método e parâmetros da busca Open-Meteo.
- **Critérios de aceite:** O serviço documenta endpoint, `name`, limite, idioma e formato; entrada vazia é rejeitada antes da rede; o limite de resultados é explícito.
- **Dependências:** T-03.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR01, NFR10.

### T-08 — Implementar busca e normalização de cidades

- **Descrição:** Encapsular geocodificação e converter resultados para `City`.
- **Critérios de aceite:** Resultados válidos preservam nome, país, contexto, latitude e longitude; resposta sem resultados retorna lista vazia; a UI não depende do payload externo.
- **Dependências:** T-07.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR01, FR02, FR03, FR04.

### T-09 — Definir parâmetros de forecast

- **Descrição:** Registrar o contrato de consulta meteorológica por coordenadas.
- **Critérios de aceite:** A consulta usa latitude e longitude; solicita dados atuais, diários, Celsius e cinco dias; a regra de timezone está documentada ou marcada como bloqueio.
- **Dependências:** T-03, T-08.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR04, FR05, FR06, NFR07.

### T-10 — Implementar normalização do relatório

- **Descrição:** Converter o payload de forecast para `WeatherReport`.
- **Critérios de aceite:** O relatório contém cidade, clima atual, horário de consulta e cinco dias; dias são cronológicos e não duplicados; resposta incompleta é rejeitada.
- **Dependências:** T-06, T-09.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR05, FR06, FR12.

### T-11 — Classificar erros dos services

- **Descrição:** Definir erros internos para rede, timeout, HTTP, rate limit, JSON inválido e resposta incompatível.
- **Critérios de aceite:** Cada categoria possui classificação estável; erros não expõem payload ou stack trace; a camada consumidora identifica se o erro permite retry.
- **Dependências:** T-08, T-10.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`, `src/types/weather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR10, NFR05, NFR09.

## Entrega 4 — Hook e estado da aplicação

### T-12 — Implementar estado de busca

- **Descrição:** Coordenar query, resultados e transições de busca no hook local.
- **Critérios de aceite:** O hook inicia em idle; busca válida passa por searching e termina em results, empty ou error; entrada vazia não chama o service.
- **Dependências:** T-08, T-11.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR01, FR02, FR08, FR09, FR11.

### T-13 — Implementar estado de seleção e forecast

- **Descrição:** Adicionar seleção de cidade, carregamento meteorológico, sucesso e retry.
- **Critérios de aceite:** Seleção usa a cidade completa; o fluxo passa por loading-weather e termina em success ou error; retry repete a última operação válida.
- **Dependências:** T-10, T-12.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR04, FR05, FR06, FR10, FR12.

### T-14 — Implementar troca de unidade no estado

- **Descrição:** Adicionar `temperatureUnit` ao hook sem nova consulta à API.
- **Critérios de aceite:** A unidade inicial é Celsius; alternar unidade atualiza o estado local; nenhuma função de service é chamada durante a troca.
- **Dependências:** T-04, T-05, T-13.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR07, NFR07.

## Entrega 5 — Componentes isolados

### T-15 — Construir campo de busca

- **Descrição:** Criar campo, submissão manual, validação e indicação de carregamento.
- **Critérios de aceite:** O campo e a ação têm nome acessível; espaços não iniciam busca; termo válido dispara callback; o campo permanece editável após vazio ou erro.
- **Dependências:** T-12.
- **Arquivos prováveis:** `src/components/CitySearch.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR01, FR08, FR09, FR11, NFR02.

### T-16 — Construir lista de resultados

- **Descrição:** Exibir cidades e permitir seleção explícita por mouse ou teclado.
- **Critérios de aceite:** Nome e país aparecem; estado ou região aparece quando disponível; homônimos são distinguíveis; seleção envia a cidade completa.
- **Dependências:** T-13, T-15.
- **Arquivos prováveis:** `src/components/CityResults.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR02, FR03, FR04, NFR02.

### T-17 — Construir apresentação de status

- **Descrição:** Renderizar estado inicial, loading, vazio, erro e retry.
- **Critérios de aceite:** Cada status possui conteúdo distinto; vazio permite nova pesquisa; erro retryable exibe nova tentativa em pt-BR; nenhum controle fica bloqueado permanentemente.
- **Dependências:** T-12, T-13.
- **Arquivos prováveis:** `src/components/WeatherStatus.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR08, FR09, FR10, FR11.

### T-18 — Construir clima atual

- **Descrição:** Renderizar cidade, temperatura formatada, unidade e condição atual.
- **Critérios de aceite:** A cidade corresponde ao relatório; temperatura e unidade são visíveis; o código usa o mapeamento controlado.
- **Dependências:** T-06, T-13, T-14.
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR05, FR07, FR12, NFR07.

### T-19 — Construir previsão de cinco dias

- **Descrição:** Renderizar a lista diária do dia atual e quatro dias seguintes.
- **Critérios de aceite:** São exibidos exatamente cinco itens; cada item tem data, mínimas, máximas, unidade e condição; a ordem é cronológica e sem duplicidade.
- **Dependências:** T-06, T-13, T-14, T-18.
- **Arquivos prováveis:** `src/components/ForecastList.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR06, FR07, NFR01, NFR07.

### T-20 — Construir controle de unidade

- **Descrição:** Criar controle acessível para alternar Celsius e Fahrenheit.
- **Critérios de aceite:** Celsius é a opção inicial; o controle funciona por mouse e teclado; a unidade ativa é identificável.
- **Dependências:** T-14, T-18, T-19.
- **Arquivos prováveis:** `src/components/TemperatureUnitToggle.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR07, NFR02.

## Entrega 6 — Integração da tela

### T-21 — Compor a tela principal do MVP

- **Descrição:** Integrar hook, busca, resultados, status, clima atual, previsão e controle de unidade.
- **Critérios de aceite:** O primeiro acesso mostra busca e estado inicial; o fluxo completo permite buscar, selecionar e visualizar o relatório; apenas o estado vigente é exibido; a cidade permanece visível.
- **Dependências:** T-16, T-17, T-18, T-19, T-20.
- **Arquivos prováveis:** `src/App.tsx`.
- **Tipo:** UI
- **Rastreabilidade:** FR01–FR12.

## Entrega 7 — Testes

### T-22 — Criar fixtures e mocks dos services

- **Descrição:** Preparar respostas determinísticas de geocodificação e forecast para os testes.
- **Critérios de aceite:** Existem fixtures de sucesso, homônimos, vazio, cinco dias, campos ausentes, JSON inválido, timeout e erro HTTP; nenhum teste obrigatório depende de rede real.
- **Dependências:** T-08, T-10, T-11, T-21.
- **Arquivos prováveis:** `tests/fixtures/openMeteo.ts`, `tests/mocks/`.
- **Tipo:** Test
- **Rastreabilidade:** FR02, FR03, FR05, FR06, FR09, FR10, NFR05.

### T-23 — Testar conversão de unidade

- **Descrição:** Testar exclusivamente conversão, formatação e alternância dos valores de temperatura.
- **Critérios de aceite:** A suíte cobre Celsius, Fahrenheit, negativos, zero, valores próximos de zero e arredondamento; a unidade exibida acompanha o valor convertido; nenhum teste depende de rede.
- **Dependências:** T-04, T-05.
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`.
- **Tipo:** Test
- **Rastreabilidade:** FR07, NFR07.

### T-24 — Testar services com mock de fetch

- **Descrição:** Validar geocodificação e forecast usando mock de `fetch`, sem chamadas ao Open-Meteo real.
- **Critérios de aceite:** O mock verifica endpoint, método e parâmetros; testes comprovam coordenadas na consulta, lista vazia, exatamente cinco dias, rejeição de payload inválido e classificação de rede, timeout, HTTP e JSON; nenhuma chamada real de rede ocorre.
- **Dependências:** T-08, T-10, T-11, T-22.
- **Arquivos prováveis:** `tests/unit/openMeteoService.test.ts`.
- **Tipo:** Test
- **Rastreabilidade:** FR01–FR06, FR09, FR10, NFR05, NFR10.

### T-25 — Testar o hook e transições de estado

- **Descrição:** Cobrir idle, busca, seleção, loading, sucesso, vazio, erro, retry, unidade e concorrência.
- **Critérios de aceite:** Todos os estados são exercitados; retry retorna a loading; troca de unidade não chama API; resposta obsoleta não altera o estado mais recente.
- **Dependências:** T-12, T-13, T-14, T-22.
- **Arquivos prováveis:** `tests/unit/useWeather.test.ts`.
- **Tipo:** Test
- **Rastreabilidade:** FR01, FR04, FR07, FR08, FR09, FR10, NFR05, NFR10.

### T-26 — Testar estados de loading, erro e vazio

- **Descrição:** Testar exclusivamente o componente de status nos estados loading, erro e vazio com Testing Library.
- **Critérios de aceite:** Existem testes separados para `loading`, `error` e `empty`; loading é anunciado e não fica indefinido; erro exibe mensagem pt-BR e retry; vazio permite nova pesquisa; mensagens não expõem detalhes técnicos.
- **Dependências:** T-17, T-22.
- **Arquivos prováveis:** `tests/unit/WeatherStatus.test.tsx`.
- **Tipo:** Test
- **Rastreabilidade:** FR08, FR09, FR10, FR11, NFR02.

### T-27 — Testar componentes de busca e previsão

- **Descrição:** Testar busca, resultados, clima atual, previsão e unidade com Testing Library.
- **Critérios de aceite:** Interações principais funcionam por teclado; homônimos são distinguíveis; clima atual e previsão renderizam dados corretos; a lista contém cinco dias; alternância atualiza as unidades sem nova consulta.
- **Dependências:** T-15, T-16, T-18, T-19, T-20, T-23.
- **Arquivos prováveis:** `tests/unit/CitySearch.test.tsx`, `tests/unit/CityResults.test.tsx`, `tests/unit/CurrentWeather.test.tsx`, `tests/unit/ForecastList.test.tsx`, `tests/unit/TemperatureUnitToggle.test.tsx`.
- **Tipo:** Test
- **Rastreabilidade:** FR01, FR02, FR03, FR04, FR05, FR06, FR07, NFR02.

### T-28 — Criar E2E do fluxo feliz

- **Descrição:** Validar busca, seleção, clima atual, previsão e troca de unidade com Playwright.
- **Critérios de aceite:** O cenário confirma cidade correta, exatamente cinco dias, Celsius inicial e atualização para Fahrenheit; as chamadas são interceptadas; o fluxo é executado em viewport desktop e em viewport mobile de 320 px sem perda de conteúdo ou rolagem horizontal involuntária.
- **Dependências:** T-21, T-22, T-26, T-27.
- **Arquivos prováveis:** `tests/e2e/weather-app.spec.ts`.
- **Tipo:** Test
- **Rastreabilidade:** FR01–FR07, FR11, FR12, NFR01.

### T-29 — Criar E2E de estados excepcionais

- **Descrição:** Validar vazio, ausência de resultados, erro, timeout, retry e concorrência.
- **Critérios de aceite:** Cada cenário exibe mensagem pt-BR; retry recupera operação simulada; resposta antiga não vence a mais recente; a suíte não depende de rede externa.
- **Dependências:** T-21, T-25, T-26, T-28.
- **Arquivos prováveis:** `tests/e2e/weather-app.spec.ts`.
- **Tipo:** Test
- **Rastreabilidade:** FR08, FR09, FR10, NFR05, NFR10.

### T-30 — Validar responsividade e acessibilidade

- **Descrição:** Verificar viewport de 320 px, desktop, zoom de 200%, teclado, foco e estados anunciados.
- **Critérios de aceite:** Não há rolagem horizontal ou sobreposição nos viewports definidos; o fluxo é operável por teclado; foco é visível; loading, vazio e erro são perceptíveis por tecnologia assistiva.
- **Dependências:** T-21, T-28, T-29.
- **Arquivos prováveis:** `tests/e2e/weather-app.spec.ts`, `tests/unit/accessibility.test.tsx`.
- **Tipo:** Test
- **Rastreabilidade:** NFR01, NFR02.

## Entrega 8 — Hardening e operação

### T-31 — Aplicar timeout e concorrência no acesso a dados

- **Descrição:** Garantir timeout, retry e descarte de respostas obsoletas no fluxo integrado.
- **Critérios de aceite:** Timeout produz erro retryable; retry volta a loading; respostas antigas são ignoradas; nenhum controle permanece desabilitado após a operação.
- **Dependências:** T-24, T-25, T-29.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`, `src/hooks/useWeather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** FR10, NFR05, NFR10.

### T-32 — Aplicar política de requisições e cache

- **Descrição:** Implementar debounce, deduplicação e cache somente conforme TTL e política aprovados.
- **Critérios de aceite:** Entrada vazia não chama API; chamadas duplicadas são evitadas; TTL e chave ficam documentados; dados antigos são identificados ou não são reutilizados.
- **Dependências:** T-31.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`, `src/hooks/useWeather.ts`.
- **Tipo:** Data
- **Rastreabilidade:** NFR03, NFR05, NFR10.

### T-33 — Testar política de requisições e cache

- **Descrição:** Cobrir debounce, deduplicação, expiração e comportamento sem cache, conforme decisão do MVP.
- **Critérios de aceite:** Testes comprovam ausência de chamada para entrada vazia; repetição segue a política; cache aprovado expira; sem cache, nenhuma resposta é reutilizada.
- **Dependências:** T-32.
- **Arquivos prováveis:** `tests/unit/requestPolicy.test.ts`.
- **Tipo:** Test
- **Rastreabilidade:** NFR03, NFR05, NFR10.

### T-34 — Configurar gates de qualidade

- **Descrição:** Garantir execução de lint, build, testes unitários e E2E determinísticos.
- **Critérios de aceite:** `pnpm lint`, `pnpm build` e `pnpm test` executam sem erro; a suíte E2E é executável; falha em qualquer gate impede aprovação.
- **Dependências:** T-23, T-24, T-26, T-27, T-28, T-29, T-30, T-33.
- **Arquivos prováveis:** `package.json`, `biome.json`, `playwright.config.ts`.
- **Tipo:** Infra
- **Rastreabilidade:** NFR03, NFR04, NFR06, NFR09.

### T-35 — Documentar operação e dependências externas

- **Descrição:** Registrar Open-Meteo, limites, atribuição, indisponibilidade, monitoramento e smoke test opcional.
- **Critérios de aceite:** Limites, licença e atribuição estão documentados ou marcados como pendência; smoke test externo é separado dos testes obrigatórios; há orientação para diagnóstico sem dados sensíveis.
- **Dependências:** T-34.
- **Arquivos prováveis:** `README.md`, documentação de operação.
- **Tipo:** Infra
- **Rastreabilidade:** NFR04, NFR08, NFR09.

## Cobertura de requisitos funcionais

| Requisito da spec | Tarefas que implementam | Tarefas que verificam | Situação |
| --- | --- | --- | --- |
| FR01 — Buscar cidades | T-07, T-08, T-12, T-15, T-21 | T-24, T-25, T-27 | Coberto |
| FR02 — Exibir resultados de busca | T-08, T-12, T-16, T-21 | T-24, T-26, T-27 | Coberto |
| FR03 — Identificar a localidade | T-02, T-08, T-16, T-21 | T-24, T-26, T-27 | Coberto |
| FR04 — Selecionar uma cidade | T-02, T-08, T-13, T-16, T-21 | T-24, T-25, T-26, T-27 | Coberto |
| FR05 — Exibir o clima atual | T-03, T-06, T-10, T-13, T-18, T-21 | T-23, T-24, T-25, T-26, T-27 | Coberto |
| FR06 — Exibir previsão de cinco dias | T-03, T-06, T-09, T-10, T-13, T-19, T-21 | T-23, T-24, T-26, T-27 | Coberto |
| FR07 — Alternar unidade de temperatura | T-02, T-04, T-05, T-14, T-20, T-21 | T-23, T-25, T-26, T-27 | Coberto |
| FR08 — Informar carregamento | T-03, T-12, T-17, T-21 | T-25, T-26, T-29 | Coberto |
| FR09 — Tratar busca sem resultados | T-12, T-17, T-21 | T-24, T-25, T-26, T-29 | Coberto |
| FR10 — Tratar falha de dados | T-03, T-11, T-13, T-17, T-21, T-31 | T-24, T-25, T-26, T-29 | Coberto |
| FR11 — Apresentar estado inicial | T-12, T-15, T-17, T-21 | T-25, T-26, T-27 | Coberto |
| FR12 — Preservar a localidade selecionada | T-10, T-13, T-18, T-21 | T-27 | Coberto |

### Requisitos sem tarefa correspondente

Nenhum requisito funcional da spec está sem tarefa correspondente. Todos os
requisitos `FR01` a `FR12` possuem pelo menos uma tarefa de implementação e uma
tarefa de verificação. A cobertura depende, porém, da resolução das decisões
bloqueadoras sobre timezone, arredondamento e campos meteorológicos antes do
aceite final das tarefas afetadas.