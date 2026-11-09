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

Turma: 2º período de Sistemas de Informação

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

## 🚀 Como executar - local

```bash
npm install
npm run dev
```

Depois, abra o endereço informado pelo Vite no navegador (normalmente `http://localhost:5173`).

Para verificar o código com ESLint e gerar a versão de produção, execute os comandos abaixo.

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

A coleção inicial tem 24 personagens de **The Boys**, **Crepúsculo** e **Marvel**.

## 📌 Funcionalidades

- Cadastro de personagens, com validação
- Listagem, com detalhes sob demanda no próprio cartão
- Pesquisa por nome
- Filtros por obra, espécie, personalidade, raridade e status
- Favoritos
- Adoção com atualização de status
- Menu "Adotados" para ver apenas os adotados
- Interação com o personagem
- Edição de nome, poder e personalidade no próprio cartão
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

Os casos abaixo descrevem o comportamento esperado e podem ser conferidos manualmente na aplicação.

### 1. Encontre seu companheiro

- **Regra:** a pesquisa por nome e todos os filtros (obra, espécie, personalidade, raridade e status) funcionam juntos, e um personagem só aparece se atender a todos. As opções de obra, espécie e personalidade vêm da coleção. Raridade e status têm opções fixas. Os filtros não alteram os dados salvos.
- **Teste esperado:** pesquisar "Thor" mostra apenas o Thor. Selecionar espécie Vampiro e raridade Lendário mostra só quem atende aos dois critérios.
- **Exceção:** pesquisar um nome inexistente mostra "Nenhum personagem encontrado.", sem travar a página.

### 2. Meus favoritos

- **Regra:** o botão de estrela alterna o personagem entre favorito e não favorito. O botão "Meus favoritos" (ou o menu Favoritos) mostra só os favoritos. Favoritar não altera espécie, poder, raridade nem status.
- **Teste esperado:** favoritar o Thor, recarregar a página e abrir a lista de favoritos. O Thor continua marcado e aparece na lista.
- **Exceção:** com o filtro ativo e nenhum favorito, aparece "Nenhum personagem encontrado."; ao desfavoritar, o personagem continua na coleção principal.

### 3. Identidade do abrigo

- **Regra:** o nome do abrigo aparece no cabeçalho e o tema claro/escuro altera só a aparência. As preferências ficam salvas no navegador.
- **Teste esperado:** trocar o nome para "Abrigo Teste" e ativar o tema escuro; após recarregar, os dois continuam ativos.
- **Exceção:** com o nome do abrigo vazio, o título volta para "Multiverside". Trocar o tema não apaga personagens, favoritos nem adoções.

### 4. Abrigo com memória

- **Regra:** personagens, nome do abrigo, nome do usuário e tema são salvos no `localStorage` a cada alteração. Quando a versão da lista muda, a aplicação preserva os personagens cadastrados pelo usuário e repõe os registros iniciais. A reposição pode descartar favoritos, adoções, edições e remoções nesses registros.
- **Teste esperado:** cadastrar um personagem, favoritar outro e adotar um terceiro; após recarregar, tudo é recuperado.
- **Exceção:** se o valor salvo da coleção for um JSON inválido ou não representar um array, o app carrega a lista inicial sem impedir a abertura.

### 5. Painel do abrigo

- **Regra:** os totais (personagens, disponíveis, adotados, favoritos e por espécie) são calculados a partir da lista atual, nunca digitados manualmente.
- **Teste esperado:** ao adotar um personagem, Disponíveis diminui em 1 e Adotados aumenta em 1.
- **Exceção:** remover o único personagem de uma espécie (Lobisomem) faz essa espécie sair do painel, e remover todos deixa os contadores em zero, sem valores negativos.

## 🕓 Versões intermediárias

### Melhorias e correções feitas ao longo das versões

- **Obra deixou de ser fixa (`7da055e`):** no início, todo personagem cadastrado ficava como "The Boys". Agora a obra é um campo do formulário e virou filtro.
- **Validação numérica (`e6d8738`):** o poder passou a ser convertido com `Number()` antes de comparar com 0 e 100, evitando comparar texto com número.
- **Estado sempre atualizado (`e6d8738`):** as ações passaram a usar `setPersonagens((lista) => ...)`, que parte da lista mais recente e evita sobrescrever alterações.
- **Persistência mais segura (`e6d8738`):** leitura do `localStorage` com `try/catch`, para não quebrar com dado inválido, e chave de versão que atualiza a lista inicial preservando os cadastrados.
- **Busca melhor (`e6d8738`):** comparação com `toLocaleLowerCase("pt-BR")`, ignorando maiúsculas e minúsculas, e opções de obra, espécie e personalidade geradas a partir da coleção.
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

A IA foi utilizada como apoio ao planejamento, à revisão dos requisitos, à análise do código, à identificação de inconsistências (como o erro dos caminhos de imagem), à criação do menu hambúrguer e do filtro de adotados e à redação desta documentação.

A equipe adaptou as sugestões ao projeto e revisou o código. A dupla se compromete a explicar o código entregue e a alterar regras na apresentação sem consulta à IA.

## ⚖️ Aviso

Os personagens, nomes e imagens pertencem aos seus respectivos criadores e titulares. Este projeto tem finalidade exclusivamente acadêmica e não possui fins comerciais.

## 👥 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos no IFSULDEMINAS - Campus Machado, pela dupla Luís Ferreira e Maria Cecília.
