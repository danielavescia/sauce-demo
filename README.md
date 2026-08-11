# Sauce Demo E2E Tests
Projeto de automação de testes end-to-end utilizando Cypress no site [Sauce Demo](https://www.saucedemo.com/)

---

## Objetivo
Validar os fluxos críticos da aplicação:
* Login
* Catálogo - Listagem de produtos  
* Processo de checkout (etapas 1, 2 e finalização)

---

## Estratégia de Testes
A estratégia de teste foi delineada com base em uma matriz de risco, considerando:
* Impacto no negócio
* Probabilidade de falha
* Risco resultante

Com isso, foi possível priorizar os fluxos críticos da aplicação, garantindo maior cobertura onda há maior risco.

### Matriz de Risco

| Funcionalidade | Impacto | Probabilidade | Risco | Justificativa |
|---------------|--------|--------------|------|--------------|
| Login | Crítico | Alta | Crítico | Porta de entrada da aplicação. Falhas nessa etapa bloqueiam todos os fluxos posteriores. Além da questão de segurança de dados e autenticação do usuário. |
| Catálogo - Listagem de Produtos | Alto | Alta | Crítico | Funcionalidade principal de navegação. Problemas impedem o usuário de selecionar itens e visualizar produtos. |
| Catálogo - Ordenação de produtos | Baixo | Média | Baixo | Afeta experiência, mas não impede visualização de produtos. |
| Catálogo - Adicionar/Remover do Carrinho | Médio | Média | Médio | Interfere na experiência, mas existem alternativas de navegação. |
| Catálogo - Navegação p/ Detalhes do Produto | Baixo | Média | Baixo | Informações são redundantes com o catálogo. |
| Página de detalhes do Produto | Baixo | Média | Baixo | Não impacta fluxo principal. |
| Página de detalhes do Produto - Remover/Adicionar | Baixo | Média | Baixo | Pode ser contornado via catálogo ou carrinho. |
| Carrinho - Remover produtos | Médio | Média | Médio | Afeta experiência, mas pode ser contornado. |
| Carrinho - Continuar Comprando | Baixo | Média | Baixo | Impacta apenas navegação. |
| Carrinho - Iniciar Checkout | Crítico | Alta | Crítico | Ponto de transição para finalização da compra. |
| Checkout Etapa 1 (Formulário) | Alto | Alta | Crítico | Coleta dados essenciais para entrega. |
| Checkout Etapa 2 (Revisão do Pedido) | Alto | Média | Alto | Validação final de valores e itens. |
| Checkout Etapa 3 (Confirmação) | Médio | Baixa | Baixo | Não impede criação do pedido. |
| Menu - Logout | Médio | Alta | Alto | Impacta segurança e controle de sessão. |
| Menu - Reset App State | Baixo | Média | Baixo | Uso interno de testes, sem impacto ao usuário. |

---

## Estrutura do projeto e Padrões utilizados

### Page Object
Centralização de seletores da UI.
Localização: `cypress/support/pages/`

### Custom commands
Reutilziação de ações evitando código repetido nas specs
Localização: `cypress/support/commands/`

### Fixtures:
Dados utilizados para login na aplicação e validações de produtos em testes
Localização: `cypress/fixtures/`

### Helpers:
funções utilitárias
Arquivo: `cypress/support/helpers/helper.js`

---

## Cenários de teste

### Login
- Login com usuário válido
- Login com usuário bloqueado
- Login com credenciais inválidas
- Login com campos vazios
- Validação de mensagens de erro

---

### Catálogo
- Listagem de produtos
- Validação de quantidade de itens
- Exibição de nome, descrição, preço e imagem dos produtos conhecidos

---

### Checkout

#### Etapa 1 - Informações do usuário
- Preenchimento válido do formulário
- Validação de campos obrigatórios
- Exibição de mensagens de erro

#### Etapa 2 - Revisão do pedido
- Validação dos produtos adicionados
- Validação do valor total (itens + taxa)
- Finalização da compra

---

## Como executar:
- Instalar dependências:
```bash
npm install
```

- Modo iterativo Cypress
```bash
npx cypress open
```

- Modo headless Cypress
```bash
npm run cy:run
```

---

## Observações
* Testes priorizados com base em risco
* Foco em fluxos críticos da aplicação

---
## Segurança
As credenciais utilizadas nos testes estão armazenadas no arquivo users.json para facilitar a execução dos testes no SauceDemo.

Como o projeto utiliza credenciais públicas de um ambiente de demonstração, essa abordagem é aceitável neste contexto. Em projetos reais, credenciais devem ser armazenadas de forma segura, preferencialmente por meio de variáveis de ambiente.