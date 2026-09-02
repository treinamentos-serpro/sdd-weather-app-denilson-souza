# Weather App — Plano Técnico

Este plano deriva de `specs/weather-app-spec.md` e orienta a implementação do
MVP sem gerar o código final. As decisões abaixo priorizam simplicidade,
testabilidade e rastreabilidade aos requisitos FR01–FR12 e NFR01–NFR10.

## Architecture

### Visão geral

Será utilizada uma aplicação web client-side organizada em camadas leves:

```text
UI React
  -> estado da tela e ações do usuário
  -> weather service
  -> Open-Meteo Geocoding / Forecast
```

- **UI:** renderiza busca, resultados, clima atual, previsão, unidade e estados
  de carregamento, vazio e erro.
- **Estado da aplicação:** mantém a consulta atual e o resultado normalizado;
  não haverá banco de dados nem autenticação.
- **Weather service:** concentra chamadas HTTP, parâmetros da API, validação
  da resposta, normalização de dados e classificação de erros.
- **Open-Meteo:** fornece geocodificação e previsão meteorológica.

No MVP, o navegador poderá consumir diretamente os endpoints públicos do
Open-Meteo. Essa decisão mantém a solução pequena e coerente com a ausência de
credenciais. Um proxy/backend só deve ser introduzido se os limites, CORS,
rate limiting, analytics ou requisitos operacionais exigirem isso.

### Rastreabilidade

| Área | Requisitos relacionados |
| --- | --- |
| Busca e seleção | FR01, FR02, FR03, FR04, FR09, FR11, FR12 |
| Dados meteorológicos | FR04, FR05, FR06, FR07 |
| Estados da interface | FR08, FR09, FR10, NFR05 |
| Experiência | NFR01, NFR02, NFR03, NFR06, NFR07 |
| Operação e proteção | NFR04, NFR05, NFR08, NFR09, NFR10 |

## Tech Stack

| Camada | Decisão | Justificativa |
| --- | --- | --- |
| Linguagem | TypeScript em modo strict | Contratos explícitos entre API, serviço, estado e componentes. |
| UI | React | Compatível com o stack definido no projeto e adequado para estados de tela. |
| Build | Vite | Desenvolvimento e build simples para uma SPA. |
| Estilos | Tailwind CSS | Stack já definida no projeto e suficiente para responsividade. |
| Testes unitários | Vitest + Testing Library | Testa funções puras, serviços e comportamento acessível da UI. |
| Testes E2E | Playwright | Valida o fluxo real de busca, seleção, previsão, unidade e falhas. |
| Qualidade | Biome | Lint e formatação já previstos no projeto. |
| Gerenciador | pnpm | Padrão definido para o repositório. |

Não será adicionado um gerenciador global de estado, uma biblioteca de cache ou
um cliente HTTP adicional sem necessidade demonstrada. `fetch` e estado local
do React são suficientes para o escopo atual.

## Project Structure

```text
src/
  components/
    CitySearch.tsx
    CityResults.tsx
    CurrentWeather.tsx
    ForecastList.tsx
    TemperatureUnitToggle.tsx
    WeatherStatus.tsx
  hooks/
    useWeather.ts
  services/
    openMeteoService.ts
  types/
    weather.ts
  utils/
    temperature.ts
    weatherCodes.ts
  App.tsx
  main.tsx

tests/
  unit/
  e2e/
```

- `components/`: um componente por arquivo, responsável por apresentação e
  eventos da interface.
- `hooks/`: coordenação do fluxo de consulta e exposição de estado para a UI.
- `services/`: comunicação com Open-Meteo, sem lógica visual.
- `types/`: contratos compartilhados entre serviço, hook e componentes.
- `utils/`: funções puras, como conversão de temperatura e tradução de códigos
  meteorológicos.
- `tests/`: testes unitários e E2E derivados dos critérios de aceite.

Os nomes são uma proposta inicial; a implementação pode agrupar componentes
pequenos caso isso reduza complexidade sem misturar responsabilidades.

## Data Model

Os contratos internos abaixo devem ser independentes do payload bruto do
Open-Meteo. Eles são interfaces conceituais para orientar a implementação, não
código final. O formato final dos campos meteorológicos adicionais depende de
decisão de produto.

### Cidade

```text
City {
  id: number | string
  name: string
  country: string
  countryCode?: string
  region?: string
  admin1?: string
  latitude: number
  longitude: number
  timezone?: string
}
```

`latitude` e `longitude` são obrigatórias para consultar a previsão. `name`,
`country` e `region` sustentam a desambiguação exigida por FR03.

### Clima atual

```text
CurrentWeather {
  observedAt: string
  temperatureCelsius: number
  conditionCode: number
  conditionLabel: string
  timezone?: string
}
```

O valor canônico será armazenado em Celsius e convertido apenas na
apresentação. `conditionLabel` deve ser gerado a partir de um mapeamento
controlado de códigos, sem exibir texto arbitrário da API.

### Previsão diária

```text
DailyForecast {
  date: string
  minTemperatureCelsius: number
  maxTemperatureCelsius: number
  conditionCode: number
  conditionLabel: string
}
```

A coleção deve conter exatamente cinco itens, em ordem cronológica, começando
no dia atual no fuso da cidade. Campos como precipitação, vento e probabilidade
de chuva não entram no contrato obrigatório até serem definidos em Open
Questions.

### Resultado agregado

```text
WeatherReport {
  city: City
  current: CurrentWeather
  daily: DailyForecast[]
  fetchedAt: string
}
```

### Unidade e estado

```text
TemperatureUnit = 'celsius' | 'fahrenheit'

WeatherViewState =
  | { status: 'idle' }
  | { status: 'searching'; query: string }
  | { status: 'results'; query: string; cities: City[] }
  | { status: 'loading-weather'; city: City }
  | { status: 'success'; report: WeatherReport }
  | { status: 'empty'; query: string }
  | { status: 'error'; operation: 'search' | 'weather'; message: string; retryable: boolean }
```

O tipo de unidade deve iniciar como `celsius`. A decisão sobre persistência
local dessa preferência continua aberta; nenhum contrato de servidor deve ser
criado para isso.

## Data Flow

### Busca e seleção

1. O usuário informa um termo e envia a busca.
2. A UI rejeita entrada vazia ou composta apenas por espaços.
3. O estado passa para `searching`.
4. O serviço consulta o endpoint de geocodificação.
5. O serviço valida e normaliza cada resultado para `City`.
6. A UI exibe `results` ou `empty`.
7. O usuário seleciona uma cidade, não apenas o texto pesquisado.

### Consulta meteorológica

1. A seleção fornece latitude, longitude e, quando disponível, timezone da cidade.
2. O estado passa para `loading-weather`.
3. O serviço consulta o endpoint de previsão com as variáveis diárias necessárias ao escopo confirmado.
4. A resposta é validada e normalizada para `WeatherReport`.
5. A UI exibe `success`, com cidade, clima atual e cinco itens diários.
6. A unidade de temperatura é aplicada localmente sobre o modelo canônico em
   Celsius.

### Concorrência

Cada operação deve possuir uma identidade ou mecanismo de cancelamento lógico.
Se duas buscas ocorrerem em sequência, uma resposta antiga não poderá substituir
o resultado da busca mais recente. A mesma regra vale para consultas de clima.

## External APIs

### Geocoding do Open-Meteo

- **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
- **Método:** `GET`
- **Parâmetros previstos:** `name`, `count`, `language=pt`, `format=json`
- **Entrada:** termo de busca normalizado.
- **Saída usada:** `id`, `name`, `latitude`, `longitude`, `country`,
  `country_code`, `admin1`, `timezone` e demais campos disponíveis para
  desambiguação.
- **Ausência de resultados:** resposta válida sem localidades deve virar o
  estado `empty`, não um erro técnico.

### Forecast do Open-Meteo

- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Método:** `GET`
- **Parâmetros previstos:** `latitude`, `longitude`,
  `current=temperature_2m,weather_code`,
  `daily=weather_code,temperature_2m_max,temperature_2m_min`,
  `temperature_unit=celsius`, `forecast_days=5`, `timezone=auto`.
- **Entrada:** latitude e longitude da cidade selecionada, nunca o nome bruto
  digitado.
- **Saída usada:** temperatura atual, código meteorológico atual, datas
  diárias, máximas, mínimas e códigos meteorológicos diários.

O parâmetro `timezone=auto` é uma proposta coerente com FR06, mas deve ser
confirmado antes da implementação final. Também devem ser confirmados os
requisitos de atribuição, limites de uso, cobertura e licença do Open-Meteo.

### Contrato de integração

O serviço deve esconder URLs, parâmetros e formato externo da UI. Erros de HTTP,
JSON inválido, ausência de campos obrigatórios e respostas incompatíveis devem
ser convertidos para erros internos classificados, sem exibir o payload bruto.

## State Management

Será usado estado local de React, centralizado no nível da tela principal ou em
um hook de consulta. O estado mínimo inclui:

- `query`: termo atual de busca;
- `cities`: resultados normalizados;
- `selectedCity`: cidade escolhida;
- `report`: clima atual e previsão;
- `temperatureUnit`: inicia em Celsius;
- `viewState`: estado discriminado de idle, loading, success, empty ou error.

Não haverá estado global, autenticação, store persistente ou estado de servidor.
A troca de unidade deve ser síncrona e não deve chamar novamente a API. A
separação entre `searching` e `loading-weather` permite mensagens específicas e
evita confundir carregamento com resultado vazio.

## Error Handling

### Categorias

| Categoria | Exemplos | Tratamento visível |
| --- | --- | --- |
| Validação | Busca vazia, apenas espaços ou termo inválido | Orientar correção sem fazer requisição. |
| Vazio | Nenhuma cidade compatível | Informar ausência e manter campo editável. |
| Rede | Offline, DNS, timeout ou conexão interrompida | Mensagem de conexão e nova tentativa. |
| API | HTTP não bem-sucedido, rate limit ou indisponibilidade | Mensagem compreensível, sem payload técnico, e retry quando aplicável. |
| Dados | JSON inválido ou campos obrigatórios ausentes | Tratar como erro de dados; não renderizar valores parciais como válidos. |
| Concorrência | Resposta antiga após nova consulta | Ignorar resposta obsoleta e manter a operação mais recente. |

### Regras

- Toda operação de rede deve ter timeout definido no plano de implementação.
- O erro não pode deixar controles permanentemente desabilitados.
- O botão de nova tentativa deve repetir a operação com os parâmetros da última
  consulta válida, quando existirem.
- O último relatório válido pode permanecer visível durante um novo carregamento,
  desde que seja claramente identificado como conteúdo anterior; a política de
  cache offline ainda depende de decisão.
- Mensagens exibidas devem estar em pt-BR e não devem revelar URLs internas,
  stack traces ou detalhes de infraestrutura.
- Falhas devem ser registráveis para diagnóstico sem incluir dados sensíveis.

## Testing Strategy

### Testes unitários com Vitest

- Conversão Celsius/Fahrenheit, incluindo negativos, zero e arredondamento.
- Mapeamento de códigos meteorológicos para rótulos controlados.
- Normalização de resultados de geocodificação.
- Normalização e validação do relatório diário com exatamente cinco dias.
- Validação de busca vazia e normalização do termo.
- Classificação de timeout, erro HTTP, JSON inválido e campos ausentes.
- Regra que descarta respostas obsoletas em consultas concorrentes.

### Testes de componentes com Testing Library

- Estado inicial orienta a busca.
- Busca exibe carregamento, resultados e estado vazio.
- Resultados mostram contexto geográfico e permitem seleção por teclado.
- Sucesso mostra cidade, clima atual e cinco dias em ordem.
- Alternância atualiza todos os valores e rótulos de unidade.
- Erro mostra mensagem em pt-BR e ação de nova tentativa.
- Estados e mudanças são perceptíveis por tecnologias assistivas.

### Testes E2E com Playwright

- Fluxo feliz: buscar cidade, selecionar resultado e visualizar previsão.
- Cidade homônima com seleção correta.
- Alternância Celsius/Fahrenheit após carregar os dados.
- Busca sem resultados.
- Falha e timeout simulados para geocodificação e previsão.
- Duas buscas consecutivas, garantindo que a mais recente prevaleça.
- Viewports mobile e desktop, incluindo 320 px e orientação paisagem quando
  suportada pelo ambiente de teste.

As chamadas externas devem ser interceptadas nos testes E2E para evitar
dependência de rede, alterações de previsão e limites do provedor. Um smoke test
opcional contra o Open-Meteo pode existir fora da suíte determinística, sem ser
requisito para cada execução.

### Quality gates

Antes de considerar o plano implementado, executar `pnpm lint`, `pnpm build` e
`pnpm test`, além da suíte E2E do projeto. A validação de acessibilidade deve
combinar testes automatizados com verificação manual de teclado e leitor de
tela.

## Risks & Trade-offs

| Decisão | Benefício | Trade-off / risco | Quando reconsiderar |
| --- | --- | --- | --- |
| Chamada direta ao Open-Meteo | Menor custo e arquitetura simples, sem credencial | Menor controle sobre rate limiting, observabilidade e disponibilidade | Ao atingir limites, precisar esconder credenciais, aplicar políticas de abuso ou agregar fontes. |
| Estado local do React | Pouca infraestrutura e fácil rastreabilidade | Pode exigir reorganização se surgirem muitas telas ou dados compartilhados | Se o produto ganhar autenticação, histórico, favoritos ou múltiplas rotas. |
| Modelo interno em Celsius | Conversão consistente e sem nova consulta ao trocar unidade | Requer regra explícita de arredondamento na apresentação | Se outras grandezas ou unidades forem adicionadas. |
| Previsão diária | Interface simples e alinhada ao escopo atual | Não atende a decisões baseadas em horários específicos | Se a previsão horária for aprovada para o MVP. |
| Sem persistência de servidor | Menor superfície de privacidade e operação | Preferências não sincronizam entre dispositivos | Se favoritos, contas ou personalização forem priorizados. |
| Cache mínimo ou ainda indefinido | Evita mostrar dados meteorológicos obsoletos | Pode aumentar requisições e piorar uso em conexão instável | Após definir TTL, validade aceitável e comportamento offline. |
| Validação no serviço | UI desacoplada de payload externo e mais testável | Exige manutenção quando o contrato do provedor mudar | Sempre que novas variáveis meteorológicas forem incorporadas. |

### Decisões bloqueadoras antes da implementação

1. Confirmar campos obrigatórios do clima atual e da previsão diária.
2. Confirmar `timezone=auto` e a regra de definição de “hoje”.
3. Definir precisão e arredondamento da temperatura.
4. Definir timeout, retry, TTL e política para dados antigos.
5. Confirmar limites, atribuição e licença do Open-Meteo.
6. Confirmar navegadores e versões mínimas suportadas.
7. Decidir se preferências poderão ser persistidas localmente.