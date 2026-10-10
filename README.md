# 🌌 Multiverside

Aplicação web desenvolvida para a disciplina de **Tecnologia em Desenvolvimento de Internet II**, do IFSULDEMINAS - Campus Machado.

O Multiverside adapta a proposta do projeto **PixelPet Rescue** para uma central de gerenciamento e adoção de personagens fictícios de filmes, séries, livros, quadrinhos e outros universos.

🔗 **Aplicação publicada:** https://multiverside.vercel.app/
📄 **Relatório de planejamento (Etapa 1):** https://docs.google.com/document/d/1iB9yvL__B5LbhoVHbMfgS8dnIAKA36A4eyBN6UNZkic/edit?usp=sharing

## 👥 Equipe

| Integrante | Responsabilidades |
|---|---|
| Luís Ferreira | Funcionalidades e adoção, desafios e integração, testes e documentação |
| Maria Cecília | Dados e criaturas, interface e componentes, testes e documentação |

Turma: 2° Período de Sistemas de Informação

## 🎯 Objetivo

Praticar JavaScript moderno, React, componentes, estados, eventos, objetos, arrays, manipulação do DOM e operações de cadastro e gerenciamento de dados em uma aplicação web interativa.

## 🛠️ Tecnologias

- React 19
- JavaScript ES6+
- Vite
- CSS (um arquivo por componente)
- Font Awesome
- localStorage
- Vercel (publicação)

## 🚀 Como executar

```bash
npm install
npm run dev
```

Depois, abra o endereço informado pelo Vite no navegador (normalmente `http://localhost:5173`).

Para validar a versão de produção:

```bash
npm run lint
npm run build
```

## 🧬 Dados dos personagens

Cada personagem é um objeto e a coleção é um array, em `src/data/personagens.js`.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | número | Identificador único. Os personagens cadastrados usam `Date.now()` |
| `nome` | texto | Nome do personagem (não pode se repetir) |
| `especie` | texto | Super, Humano, Vampiro ou Lobisomem |
| `energia` | número | Poder, de 0 a 100 |
| `personalidade` | texto | Ex.: Corajosa, Impulsivo |
| `raridade` | texto | Comum, Raro, Épico ou Lendário |
| `status` | texto | "Disponível" ou "Adotado" |
| `imagem` | texto | Caminho local, em `public/img` |
| `obra` | texto | Universo de origem (The Boys, Crepúsculo, Marvel...) |
| `favorito` | booleano | Marcado pelo usuário |

Os dados iniciais reúnem personagens de **The Boys**, **Crepúsculo** e **Marvel**.

## 📌 Funcionalidades

- Cadastro de personagens, com validação
- Listagem, com detalhes sob demanda no próprio cartão
- Pesquisa por nome
- Filtros por obra, espécie, personalidade, raridade e status
- Favoritos
- Adoção com atualização de status
- Menu "Adotados" para ver apenas os adotados
- Interação com o personagem
- Edição no próprio cartão
- Remoção com confirmação
- Painel com indicadores da coleção
- Identidade personalizada do abrigo
- Nome do usuário e saudação
- Tema claro e escuro
- Persistência com `localStorage`
- Seções recolhíveis
- Menu de navegação, com ícone de hambúrguer em telas pequenas
- Interface responsiva

## 🏠 Regras da central de adoção

- Todo personagem cadastrado começa como **Disponível**.
- O botão **Adotar** muda o status para **Adotado** e mostra uma mensagem de sucesso.
- Depois de adotado, o botão fica desabilitado, o que impede uma segunda adoção.
- Os adotados têm destaque visual no cartão e podem ser vistos pelo menu **Adotados** (ou pelo filtro de status).
- O contador de adoções fica no **Painel do abrigo**, aberto por padrão, e é recalculado a cada ação.

Outras regras gerais:

- O poder deve estar entre 0 e 100.
- Não é permitido cadastrar ou editar um personagem com nome já existente.
- Nome, obra e personalidade são obrigatórios no cadastro.
- **Interagir** aumenta o poder em 5 pontos, limitado a 100.

## 🌟 Desafios extras selecionados

| # | Desafio | Implementado |
|---|---|---|
| 1 | Encontre seu companheiro | ✅ |
| 2 | Meus favoritos | ✅ |
| 3 | Identidade do abrigo | ✅ |
| 4 | Abrigo com memória | ✅ |
| 5 | Painel do abrigo | ✅ |

Não foram escolhidos: Hora de cuidar, Adoção com história, Conquistas do cuidador e Missão acessibilidade.

### Integrações entre desafios

- **Favoritos + Abrigo com memória:** ao favoritar ou desfavoritar um personagem, a alteração é salva no `localStorage` e permanece após recarregar a página.
- **Adoção + Painel do abrigo:** ao adotar, os totais de disponíveis e adotados são recalculados e exibidos na hora.
- **Adoção + Encontre seu companheiro:** o menu "Adotados" ativa o filtro de status e mostra só os adotados.

## 🧪 Regras e testes dos desafios

Cada caso abaixo foi executado com **testes automatizados** (Vitest + Testing Library, em ambiente simulado de navegador) em 10/10/2026. Todos passaram (20 testes, incluindo os da central de adoção). A parte visual e a publicação devem ser conferidas manualmente em https://multiverside.vercel.app/.

### 1. Encontre seu companheiro

- **Regra:** a pesquisa por nome e todos os filtros (obra, espécie, personalidade, raridade e status) funcionam juntos, e um personagem só aparece se atender a todos. As opções dos filtros são montadas a partir dos próprios dados, então novos cadastros aparecem sozinhos. Os filtros não alteram os dados salvos.
- **Teste esperado:** pesquisar "Thor" mostra apenas o Thor. Selecionar espécie Vampiro e raridade Lendário mostra só quem atende aos dois critérios.
  - Resultado obtido: ✅ passou.
- **Exceção:** pesquisar um nome inexistente mostra "Nenhum personagem encontrado.", sem travar a página.
  - Resultado obtido: ✅ passou.

### 2. Meus favoritos

- **Regra:** o botão de coração alterna o personagem entre favorito e não favorito. O botão "Meus favoritos" (ou o menu Favoritos) mostra só os favoritos. Favoritar não altera espécie, poder, raridade nem status.
- **Teste esperado:** favoritar o Thor, ativar o filtro e recarregar a página: ele continua favorito e aparece na lista de favoritos.
  - Resultado obtido: ✅ passou.
- **Exceção:** com o filtro ativo e nenhum favorito, aparece "Nenhum personagem encontrado."; ao desfavoritar, o personagem continua na coleção principal.
  - Resultado obtido: ✅ passou.

### 3. Identidade do abrigo

- **Regra:** o nome do abrigo aparece no cabeçalho e o tema claro/escuro altera só a aparência. As preferências ficam salvas no navegador.
- **Teste esperado:** trocar o nome para "Abrigo Teste" e ativar o tema escuro; após recarregar, os dois continuam ativos.
  - Resultado obtido: ✅ passou.
- **Exceção:** com o nome do abrigo vazio, o título volta para "Multiverside". Trocar o tema não apaga personagens, favoritos nem adoções.
  - Resultado obtido: ✅ passou.

### 4. Abrigo com memória

- **Regra:** personagens, nome do abrigo, nome do usuário e tema são salvos no `localStorage` a cada alteração. Uma chave de versão atualiza a lista inicial sem perder os personagens cadastrados pelo usuário.
- **Teste esperado:** cadastrar um personagem, favoritar outro e adotar um terceiro; após recarregar, tudo é recuperado.
  - Resultado obtido: ✅ passou.
- **Exceção:** se o dado salvo estiver corrompido, o app carrega a lista inicial sem impedir a abertura.
  - Resultado obtido: ✅ passou.

### 5. Painel do abrigo

- **Regra:** os totais (personagens, disponíveis, adotados, favoritos e por espécie) são calculados a partir da lista atual, nunca digitados manualmente.
- **Teste esperado:** ao adotar um personagem, Disponíveis diminui em 1 e Adotados aumenta em 1.
  - Resultado obtido: ✅ passou.
- **Exceção:** remover o único personagem de uma espécie (Lobisomem) faz essa espécie sair do painel, e remover todos deixa os contadores em zero, sem valores negativos.
  - Resultado obtido: ✅ passou.

## 🕓 Versões intermediárias

| Commit | Data | Autor | Descrição |
|---|---|---|---|
| `1b0c425` | 06/10 | Luís | Primeira versão: componentes e dados de gerenciamento de personagens |
| `fa12614` | 06/10 | Luís | Primeira documentação no README |
| `298ecf9` | 07/10 | Maria | Reorganização do CSS, cartões com selos e melhoria da interface |
| `7da055e` | 07/10 | Luís | Filtros de pesquisa, campo de obra e gerenciamento de personagens |
| `e6d8738` | 08/10 | Luís | Refatoração do código, persistência mais segura e novos dados |
| `f25f649` | 10/10 | Luís | Imagens dos personagens e painel aberto por padrão |
| atual | 10/10 | Dupla | Menu hambúrguer, filtro de adotados, nome do abrigo vazio e README completo |

### Melhorias e correções feitas ao longo das versões

- **Obra deixou de ser fixa (`7da055e`):** no início, todo personagem cadastrado ficava como "The Boys". Agora a obra é um campo do formulário e virou filtro.
- **Validação numérica (`e6d8738`):** o poder passou a ser convertido com `Number()` antes de comparar com 0 e 100, evitando comparar texto com número.
- **Estado sempre atualizado (`e6d8738`):** as ações passaram a usar `setPersonagens((lista) => ...)`, que parte da lista mais recente e evita sobrescrever alterações.
- **Persistência mais segura (`e6d8738`):** leitura do `localStorage` com `try/catch`, para não quebrar com dado inválido, e chave de versão que atualiza a lista inicial preservando os cadastrados.
- **Busca melhor (`e6d8738`):** comparação com `toLocaleLowerCase("pt-BR")`, ignorando maiúsculas e minúsculas, e opções de filtro geradas dos dados.
- **Imagem com alternativa (`298ecf9`):** quando a imagem não carrega (`onError`), o cartão mostra a inicial do nome em vez de ficar vazio.
- **Contador visível (`f25f649`):** o painel passou a abrir por padrão para que o contador de adoções apareça logo na entrada.
- **Navegação no celular:** o menu virou ícone de hambúrguer em telas de até 700 px.
- **Adotados em destaque:** novo menu e filtro de status para visualizar só os adotados.

## 🐞 Erro encontrado, causa e correção

- **Erro:** parte dos personagens aparecia sem imagem, só com a inicial do nome.
- **Causa:** os caminhos em `personagens.js` (por exemplo, `/img/thor.png`) não correspondiam aos arquivos enviados para `public/img`, que estavam em outro formato (`.jpg`) e, em um caso, com outro nome (`scarlet_witch.webp` e `scarletwitch.jpg`). Na Vercel isso fica ainda mais sensível, porque o servidor diferencia maiúsculas de minúsculas e extensões.
- **Correção (`f25f649`):** os caminhos foram ajustados para os nomes e extensões reais dos arquivos. O recurso de imagem alternativa (`onError`) impediu que o cartão ficasse quebrado enquanto isso.

## ⚠️ Limitações conhecidas

- Os dados ficam só no navegador (`localStorage`): cada navegador ou dispositivo guarda a sua própria coleção.
- Personagens cadastrados pelo formulário ficam sem imagem (aparece a inicial do nome), pois o upload de imagem não foi implementado.
- As imagens somam cerca de 23 MB e várias passam de 2 MB. Comprimi-las deixaria a página mais rápida.
- Quatro dos nove desafios extras não foram implementados.

## 📁 Estrutura principal

```text
src/
├── components/
│   ├── PersonagemCard.jsx
│   ├── PersonagemCard.css
│   ├── PersonagemForm.jsx
│   └── PersonagemForm.css
├── data/
│   └── personagens.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
public/
└── img/        (imagens dos personagens)
```

## 🤖 Uso de IA

A IA foi utilizada como apoio ao planejamento, à revisão dos requisitos, à análise do código, à identificação de inconsistências (como o erro dos caminhos de imagem), à criação do menu hambúrguer e do filtro de adotados, à elaboração dos testes automatizados e à redação desta documentação.

As sugestões foram adaptadas ao projeto e verificadas por revisão do código, pelos comandos `npm run lint` e `npm run build`, pelos testes automatizados e pela execução da aplicação no navegador. A dupla se compromete a explicar o código entregue e a alterar regras na apresentação sem consulta à IA.

## ⚖️ Aviso

Os personagens, nomes e imagens pertencem aos seus respectivos criadores e titulares. Este projeto tem finalidade exclusivamente acadêmica e não possui fins comerciais.

## 👥 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos no IFSULDEMINAS - Campus Machado, pela dupla Luís Ferreira e Maria Cecília.