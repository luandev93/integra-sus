Perfeito. Agora vamos colocar o README/SDD completo.

No nano, cole todo o bloco abaixo de uma vez:

# integra_SUS_HMMV

## Gateway de Interoperabilidade do HMMV ERP

**Status:** Fundação / Desenvolvimento Inicial  
**Projeto:** HMMV ERP  
**Repositório:** integra_SUS_HMMV  
**Objetivo:** Interoperabilidade entre o HMMV ERP e serviços externos de saúde, incluindo futuras integrações governamentais.

---

# 1. VISÃO DO PROJETO

O `integra_SUS_HMMV` é o componente de interoperabilidade do HMMV ERP.

Sua função é atuar como uma camada intermediária entre os módulos internos do ERP Hospitalar e sistemas externos.

A arquitetura estabelece uma separação clara:

```text
FarmHMMV ─┐
enfHMMV   ├──> Contratos Internos HMMV
medHMMV   ┤
recepHMMV ┘
              │
              ▼
       integra_SUS_HMMV
              │
              ▼
           Mappers
              │
              ▼
            FHIR
              │
              ▼
     Adapters externos
              │
              ▼
     Serviços governamentais

Nenhum módulo hospitalar deverá possuir integração direta com serviços governamentais.


---

2. OBJETIVO

O objetivo do projeto é criar uma camada de integração desacoplada, segura, auditável e extensível.

O gateway deverá futuramente permitir que o HMMV ERP:

transforme dados internos em modelos interoperáveis;

valide informações antes do envio;

controle autenticação;

registre operações de integração;

trate erros externos;

permita reprocessamento seguro;

mantenha rastreabilidade;

desacople os módulos hospitalares das APIs externas;

possibilite diferentes adapters de integração.



---

3. PRINCÍPIO ARQUITETURAL

A regra fundamental do projeto é:

MÓDULO HMMV
      ↓
CONTRATO INTERNO
      ↓
integra_SUS_HMMV
      ↓
VALIDAÇÃO
      ↓
MAPPER
      ↓
FHIR
      ↓
ADAPTER EXTERNO
      ↓
SERVIÇO GOVERNAMENTAL

Os módulos do ERP não devem conhecer detalhes específicos da RNDS ou de outros serviços externos.

Isso permite substituir ou evoluir uma integração sem alterar diretamente:

FarmHMMV;

enfHMMV;

medHMMV;

recepHMMV.



---

4. PAPEL NO HMMV ERP

O integra_SUS_HMMV não é um módulo clínico ou administrativo.

Ele é uma infraestrutura de interoperabilidade.

Responsabilidades:

integração externa;

transformação de dados;

validação;

autenticação;

comunicação;

tratamento de respostas;

auditoria de integração;

controle de falhas;

reprocessamento;

rastreabilidade.


Não são responsabilidades do gateway:

estoque;

dispensação;

prescrição;

internação;

atendimento médico;

atendimento de enfermagem;

cadastro operacional de pacientes.


Essas funções pertencem aos respectivos módulos do HMMV ERP.


---

5. MÓDULOS QUE ALIMENTAM O GATEWAY

recepHMMV

Responsável por informações relacionadas a:

identificação do paciente;

cadastro;

atendimento;

admissão;

movimentação administrativa.



---

medHMMV

Responsável por informações clínicas relacionadas a:

atendimento médico;

diagnóstico;

prescrição;

observações clínicas;

solicitações e registros médicos.



---

enfHMMV

Responsável por informações relacionadas a:

assistência de enfermagem;

administração de medicamentos;

registros assistenciais;

observações;

procedimentos.



---

FarmHMMV

Responsável por informações relacionadas a:

medicamentos;

dispensação;

movimentações;

consumo;

lotes;

estoque;

registros farmacêuticos.



---

6. CONTRATOS INTERNOS

Os módulos do HMMV ERP deverão utilizar contratos internos estáveis.

Exemplo conceitual:

recepHMMV
    ↓
PatientContract
    ↓
integra_SUS_HMMV

medHMMV
    ↓
EncounterContract
PrescriptionContract
ObservationContract
    ↓
integra_SUS_HMMV

FarmHMMV
    ↓
MedicationContract
DispenseContract
    ↓
integra_SUS_HMMV

O contrato interno deve ser independente do formato específico utilizado pelo sistema externo.


---

7. ENTIDADES DE INTEROPERABILIDADE

A arquitetura deverá evoluir em torno de entidades como:

Patient

Organization

Practitioner

PractitionerRole

Encounter

Prescription

Medication

MedicationRequest

MedicationDispense

MedicationAdministration

Observation

DiagnosticReport

Audit

Integration


Essas entidades representam o modelo conceitual da interoperabilidade.

A implementação deverá ocorrer progressivamente.


---

8. FHIR

FHIR deverá ser utilizado como uma das principais referências para interoperabilidade.

O gateway deverá possuir uma camada responsável por transformar os contratos internos do HMMV em recursos FHIR.

Exemplo conceitual:

PatientContract
      ↓
PatientMapper
      ↓
FHIR Patient

EncounterContract
      ↓
EncounterMapper
      ↓
FHIR Encounter

PrescriptionContract
      ↓
PrescriptionMapper
      ↓
FHIR MedicationRequest

A existência desta arquitetura não significa que todos os recursos FHIR estejam implementados.

Cada recurso deverá ser desenvolvido, validado e testado individualmente.


---

9. RNDS E INTEGRAÇÕES GOVERNAMENTAIS

A RNDS e outros serviços governamentais são considerados destinos externos da arquitetura.

A integração deverá ocorrer exclusivamente através do gateway.

HMMV ERP
   ↓
integra_SUS_HMMV
   ↓
FHIR
   ↓
Adapter governamental
   ↓
RNDS / serviço externo

O projeto não declara neste momento conformidade ou homologação governamental.

Antes de qualquer declaração de conformidade deverão ser validados:

requisitos técnicos;

documentação oficial;

autenticação;

certificados;

requisitos de segurança;

requisitos de proteção de dados;

perfis FHIR aplicáveis;

terminologias;

infraestrutura;

regras de transmissão;

homologação;

requisitos específicos do órgão responsável.



---

10. ADAPTERS

Integrações externas deverão utilizar adapters.

Exemplo conceitual:

FHIR
 ↓
GovernmentAdapter
 ↓
RNDS

No futuro poderão existir outros adapters.

Exemplo:

FHIR
 ├── RNDSAdapter
 ├── GovernmentAdapter
 └── ExternalHealthAdapter

O objetivo é evitar dependência direta de um único fornecedor ou serviço.


---

11. VALIDAÇÃO

Antes de qualquer transmissão externa, os dados deverão passar por validações.

Exemplos:

campos obrigatórios;

identificadores;

formatos;

datas;

referências;

códigos;

consistência dos dados;

regras específicas da integração.


Fluxo:

Contrato Interno
      ↓
Validação
      ↓
Mapper
      ↓
FHIR
      ↓
Validação FHIR
      ↓
Adapter
      ↓
Serviço externo


---

12. AUTENTICAÇÃO E AUTORIZAÇÃO

O gateway deverá possuir mecanismos de segurança para controlar acesso às integrações.

Requisitos previstos:

autenticação;

autorização;

controle por função;

secrets externos ao código;

variáveis de ambiente;

certificados quando exigidos;

controle de acesso;

expiração e renovação de credenciais.


Credenciais nunca deverão ser armazenadas diretamente no código-fonte.


---

13. CONFIGURAÇÃO

Configurações sensíveis deverão ser fornecidas por ambiente.

Exemplo:

.env

O arquivo .env real não deverá ser versionado.

O repositório deverá disponibilizar somente um exemplo:

.env.example


---

14. AUDITORIA

Operações de integração deverão possuir rastreabilidade.

A arquitetura deverá permitir registrar informações como:

data e hora;

operação;

sistema de origem;

destino;

recurso;

identificador da operação;

resultado;

erro;

tentativa;

correlation ID.


Dados sensíveis não deverão ser registrados desnecessariamente em logs.


---

15. CORRELATION ID

As operações de integração deverão utilizar identificadores de correlação.

Exemplo:

requisição
    ↓
correlation ID
    ↓
validação
    ↓
mapper
    ↓
adapter
    ↓
serviço externo

Isso permitirá localizar uma operação completa durante auditoria e investigação de falhas.


---

16. TRATAMENTO DE ERROS

Erros internos e externos deverão ser tratados de forma controlada.

Categorias esperadas:

erro de validação;

erro de autenticação;

erro de autorização;

erro de comunicação;

timeout;

erro de serviço externo;

resposta inválida;

erro de transformação;

erro interno.


O gateway não deverá expor informações internas desnecessárias ao consumidor da API.


---

17. IDEMPOTÊNCIA

Operações de integração deverão considerar idempotência.

O objetivo é evitar duplicação de registros quando uma mesma operação for enviada mais de uma vez.

Exemplo:

Solicitação
     ↓
ID da operação
     ↓
Envio
     ↓
Falha de comunicação
     ↓
Reprocessamento
     ↓
Verificação da operação anterior
     ↓
Evitar duplicidade

Esse mecanismo deverá ser implementado conforme o tipo de operação.


---

18. REPROCESSAMENTO

Falhas temporárias não deverão necessariamente exigir intervenção manual.

A arquitetura deverá permitir:

Operação
   ↓
Falha temporária
   ↓
Registro
   ↓
Fila/reprocessamento
   ↓
Nova tentativa
   ↓
Sucesso

A estratégia definitiva de filas e retries será definida durante a evolução técnica do projeto.


---

19. API INTERNA

O gateway deverá disponibilizar APIs para comunicação com os módulos do HMMV ERP.

Exemplos futuros:

/health
/patient
/encounter
/medication
/observation
/integration

As rotas definitivas serão definidas conforme os contratos internos forem implementados.


---

20. SAÚDE DA APLICAÇÃO

O serviço deverá possuir endpoint de saúde.

Exemplo:

GET /health

Objetivos:

verificar se a aplicação está ativa;

facilitar monitoramento;

permitir health checks;

auxiliar diagnóstico de infraestrutura.



---

21. SEGURANÇA

Como o projeto poderá tratar dados hospitalares, segurança é requisito estrutural.

Requisitos previstos:

autenticação;

autorização;

RBAC;

validação de entrada;

tratamento seguro de erros;

auditoria;

logs controlados;

secrets fora do Git;

ambientes separados;

controle de acesso;

princípio do menor privilégio;

proteção de dados;

rastreabilidade.



---

22. LGPD E PROTEÇÃO DE DADOS

O projeto deverá ser desenvolvido considerando requisitos de proteção de dados pessoais e dados relacionados à saúde.

Isso inclui:

minimização de dados;

controle de acesso;

rastreabilidade;

proteção das credenciais;

segurança dos ambientes;

política de retenção;

controle de logs;

prevenção de exposição indevida.


A conformidade jurídica e regulatória definitiva deverá ser avaliada especificamente para cada implantação.


---

23. SAAS E MULTI-TENANT

O objetivo futuro do HMMV ERP é operar como SaaS.

O gateway deverá ser preparado para evolução para:

múltiplos hospitais;

múltiplos estabelecimentos;

isolamento de dados;

usuários;

RBAC;

configurações por organização;

auditoria por tenant;

observabilidade;

backup;

recuperação;

suporte.


O modelo definitivo de multi-tenancy ainda deverá ser especificado.


---

24. ARQUITETURA DO HMMV ERP

Visão geral:

HMMV ERP

 ┌────────────┐
 │ recepHMMV  │
 └─────┬──────┘
       │
 ┌─────▼──────┐
 │  medHMMV   │
 └─────┬──────┘
       │
 ┌─────▼──────┐
 │  enfHMMV   │
 └─────┬──────┘
       │
 ┌─────▼──────┐
 │ FarmHMMV   │
 └─────┬──────┘
       │
       ▼
┌──────────────────────┐
│  Contratos Internos  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ integra_SUS_HMMV     │
│ Gateway              │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Validation / Mapper  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ FHIR                 │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Adapters Externos    │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Serviços Externos    │
└──────────────────────┘


---

25. ESTADO REAL DO PROJETO

No momento da criação deste documento, o repositório encontra-se em estágio inicial.

Estrutura atual:

integra_SUS_HMMV/
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── app.js
    └── index.js

Os arquivos existentes constituem apenas a fundação inicial do projeto.

A implementação funcional do gateway ainda deverá ser construída.


---

26. O QUE JÁ EXISTE

Atualmente existe:

repositório Git;

branch main;

estrutura inicial;

diretório src;

app.js;

index.js;

.env.example;

.gitignore;

documentação inicial sendo estabelecida.



---

27. O QUE AINDA NÃO ESTÁ IMPLEMENTADO

Não considerar como implementado neste estágio:

API funcional;

endpoint /health;

autenticação;

autorização;

RBAC;

FHIR;

mappers;

RNDS;

adapters governamentais;

persistência;

auditoria funcional;

correlation ID;

filas;

retry;

idempotência;

integração externa;

multi-tenancy.


Esses itens fazem parte do roadmap.


---

28. ROADMAP TÉCNICO

FASE 0 — FUNDAÇÃO

Estado:

CONCLUÍDA

Itens:

criação do repositório;

estrutura inicial;

branch principal;

arquivos básicos.



---

FASE 1 — BASE DA APLICAÇÃO

Objetivos:

validar runtime;

definir package.json;

definir dependências mínimas;

criar aplicação HTTP;

implementar /health;

configurar ambiente;

implementar tratamento global de erros;

executar localmente.



---

FASE 2 — CONTRATOS INTERNOS

Objetivos:

definir modelos;

definir schemas;

definir validações;

padronizar respostas;

criar versionamento dos contratos.



---

FASE 3 — PRIMEIRO RECURSO

A implementação deverá começar com um recurso controlado.

Fluxo:

modelo
 ↓
contrato
 ↓
validação
 ↓
mapper
 ↓
FHIR
 ↓
teste

Somente depois de validar o primeiro recurso a arquitetura deverá ser expandida.


---

FASE 4 — FHIR

Implementar progressivamente:

Patient;

Encounter;

Observation;

Medication;

MedicationRequest;

MedicationDispense;

MedicationAdministration;

demais recursos necessários.



---

FASE 5 — AUDITORIA E SEGURANÇA

Implementar:

autenticação;

autorização;

RBAC;

auditoria;

correlation ID;

logs;

tratamento seguro de erros;

secrets;

controles de acesso.



---

FASE 6 — ADAPTER GOVERNAMENTAL

Somente após validar os requisitos oficiais da integração.

Etapas:

requisitos oficiais
        ↓
perfil de integração
        ↓
FHIR
        ↓
adapter
        ↓
autenticação
        ↓
homologação
        ↓
produção


---

FASE 7 — SAAS

Evolução para:

multi-tenant;

isolamento;

configuração por hospital;

observabilidade;

backup;

recuperação;

suporte;

implantação.



---

29. CRITÉRIOS DE MVP

O integra_SUS_HMMV poderá ser considerado MVP técnico quando possuir, no mínimo:

aplicação HTTP funcional;

/health;

configuração por ambiente;

contratos internos definidos;

validação;

primeiro mapper funcional;

primeiro recurso FHIR validado;

tratamento de erros;

autenticação;

auditoria básica;

testes automatizados;

documentação técnica.


Integração governamental real somente será considerada concluída após validação e homologação dos requisitos aplicáveis.


---

30. DEFINIÇÃO DE PRONTO

Uma funcionalidade de interoperabilidade somente deverá ser considerada pronta quando:

possuir contrato definido;

possuir validação;

possuir implementação;

possuir testes;

possuir tratamento de erros;

possuir logs adequados;

possuir auditoria quando aplicável;

possuir documentação;

não expuser secrets;

estiver integrada ao fluxo correto do ERP.



---

31. PRINCÍPIO DE EVOLUÇÃO

A implementação deverá seguir:

UM RECURSO
    ↓
UM CONTRATO
    ↓
UMA VALIDAÇÃO
    ↓
UM MAPPER
    ↓
UM TESTE
    ↓
UMA INTEGRAÇÃO

Evitar implementar todo o gateway de uma vez.

A evolução incremental reduz risco e facilita auditoria.


---

32. RELAÇÃO COM OS OUTROS REPOSITÓRIOS

O integra_SUS_HMMV faz parte de um conjunto de cinco repositórios:

FarmHMMV
enfHMMV
medHMMV
recepHMMV
integra_SUS_HMMV

Eles formam um único produto:

HMMV ERP

Cada repositório possui responsabilidade própria, mas os módulos devem trabalhar através de contratos bem definidos.


---

33. VISÃO DO PRODUTO FINAL

A visão de longo prazo é:

PACIENTE
   ↓
RECEPÇÃO
   ↓
ATENDIMENTO / INTERNAÇÃO
   ↓
MÉDICO
   ↓
PRESCRIÇÃO
   ↓
FARMÁCIA
   ↓
DISPENSAÇÃO
   ↓
ENFERMAGEM
   ↓
ADMINISTRAÇÃO
   ↓
CONSUMO
   ↓
AUDITORIA
   ↓
INTEROPERABILIDADE

O integra_SUS_HMMV representa a última camada dessa cadeia:

ERP HOSPITALAR
      ↓
INTEROPERABILIDADE
      ↓
PADRÕES
      ↓
SERVIÇOS EXTERNOS


---

34. GOVERNMENT READY

O objetivo futuro é tornar o HMMV ERP tecnicamente preparado para processos de contratação e integração governamental.

Entretanto:

Government Ready não significa conformidade automática.

Nenhuma declaração de conformidade deverá ser feita antes da validação efetiva dos requisitos aplicáveis.

Deverão ser avaliados:

requisitos técnicos;

requisitos de segurança;

proteção de dados;

documentação;

infraestrutura;

autenticação;

interoperabilidade;

homologação;

requisitos contratuais;

requisitos específicos do órgão comprador.



---

35. STATUS

DESENVOLVIMENTO ATIVO

O integra_SUS_HMMV encontra-se na fase de fundação.

A prioridade atual é transformar o scaffold inicial em um gateway funcional, mantendo o desacoplamento entre os módulos do HMMV ERP e as integrações externas.


---

HMMV ERP

Arquitetura modular.
Workflow hospitalar ponta a ponta.
Segurança.
Auditoria.
Interoperabilidade.

Este repositório é a camada responsável por conectar o ERP ao ecossistema externo sem acoplar diretamente os módulos hospitalares aos serviços governamentais.


---

## Log de Alterações Operacionais

> Seção viva: cada execução real (correção, deploy, CI) é registrada aqui de forma aditiva. Nunca remover entradas anteriores — apenas acrescentar.

### 2026-08-21
- feat: Fase 1 implementada — aplicação HTTP mínima (Express), endpoint `/health` (status/ambiente/uptime), configuração por ambiente via `src/config/env.js` + `.env.example`, tratamento global de erros (`src/middlewares/errorHandler.js`), 404 para rotas não mapeadas. `package.json` e `.gitignore` criados do zero (não existiam). CI básico adicionado (`.github/workflows/ci.yml`). Testado localmente: `/health` responde 200, rota inexistente responde 404.
