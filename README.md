# 🌌 Multiverside

Aplicação web desenvolvida para a disciplina de **Tecnologia em Desenvolvimento de Internet II**, do IFSULDEMINAS - Campus Machado.

O **Multiverside** é uma central de gerenciamento de personagens fictícios inspirada em diferentes universos de filmes, séries, livros, jogos e outras obras.

A aplicação foi desenvolvida a partir da proposta do projeto **PixelPet Rescue**, adaptando o conceito original de gerenciamento e adoção de criaturas virtuais para uma coleção de personagens.

---

## 🎯 Sobre o projeto

O Multiverside permite que o usuário gerencie uma coleção de personagens fictícios através de uma interface web.

Cada personagem é representado por um objeto JavaScript e armazenado em um array, contendo informações como:

- Nome;
- Espécie;
- Poder;
- Personalidade;
- Raridade;
- Status;
- Obra de origem;
- Imagem;
- Favorito.

A aplicação permite cadastrar, listar, consultar, editar, remover, pesquisar, filtrar, favoritar e adotar personagens.

Além disso, os dados são armazenados utilizando `localStorage`, permitindo que as informações permaneçam disponíveis após o recarregamento da página.

---

## 📌 Objetivos

O projeto tem como objetivos:

- Desenvolver uma aplicação utilizando React;
- Praticar a criação e utilização de componentes;
- Trabalhar com objetos e arrays em JavaScript;
- Utilizar estados e eventos em React;
- Implementar operações de cadastro, consulta, edição e remoção;
- Implementar pesquisa e filtros;
- Criar um sistema de adoção;
- Implementar um sistema de favoritos;
- Utilizar armazenamento local com `localStorage`;
- Desenvolver uma interface para gerenciamento de personagens;
- Aplicar conceitos de desenvolvimento web estudados na disciplina.

---

# 🚀 Funcionalidades

## 👤 Cadastro de personagens

O usuário pode cadastrar novos personagens através de um formulário.

Os campos disponíveis são:

- Nome;
- Espécie;
- Poder;
- Personalidade;
- Raridade.

### Validações

A aplicação verifica:

- Se o nome foi preenchido;
- Se a personalidade foi preenchida;
- Se o poder está entre `0` e `100`;
- Se já existe outro personagem com o mesmo nome.

---

## 📋 Listagem

Os personagens cadastrados são apresentados na interface através de cartões.

Cada cartão apresenta informações principais do personagem e disponibiliza ações relacionadas ao seu gerenciamento.

---

## 🔎 Pesquisa

É possível pesquisar personagens pelo nome.

A pesquisa não diferencia letras maiúsculas e minúsculas.

Quando nenhum personagem corresponde à pesquisa, a aplicação apresenta uma mensagem informando que nenhum personagem foi encontrado.

---

## 🔍 Filtros

O sistema possui filtros para facilitar a localização dos personagens.

É possível filtrar por:

- Espécie;
- Personalidade;
- Raridade.

Os filtros podem ser utilizados junto com a pesquisa por nome.

---

## 📄 Detalhes

Cada personagem possui uma opção para visualizar seus detalhes.

São apresentadas informações como:

- Nome;
- Obra;
- Espécie;
- Poder;
- Personalidade;
- Raridade;
- Status.

---

## ❤️ Favoritos

O usuário pode marcar e desmarcar personagens como favoritos.

Também é possível ativar a opção **Meus favoritos**, fazendo com que a aplicação exiba somente os personagens marcados como favoritos.

Os favoritos também são armazenados no `localStorage`.

---

## ✏️ Edição

É possível editar os seguintes dados de um personagem:

- Nome;
- Poder;
- Personalidade.

As mesmas regras de validação utilizadas no cadastro são aplicadas durante a edição.

O sistema também impede a utilização de nomes duplicados.

---

## 🗑️ Remoção

O usuário pode remover personagens da coleção.

Antes da remoção, a aplicação solicita uma confirmação.

Após a confirmação, o personagem é removido da lista e os dados são atualizados.

---

## ❤️ Adoção

Cada personagem possui um status:

- `Disponível`;
- `Adotado`.

Quando o usuário adota um personagem:

1. O status é alterado para `Adotado`;
2. O botão de adoção é desabilitado;
3. O contador de adoções é atualizado;
4. O personagem não pode ser adotado novamente.

---

# 🌟 Desafios extras

Foram selecionados cinco desafios extras propostos na atividade.

## 1. 🔎 Encontre seu companheiro

Permite pesquisar e filtrar personagens utilizando características como:

- Espécie;
- Personalidade;
- Raridade.

---

## 2. ❤️ Meus favoritos

Permite:

- Favoritar personagens;
- Desfavoritar personagens;
- Visualizar somente os personagens favoritos.

---

## 3. 🌙 Identidade do abrigo

Permite:

- Personalizar o nome do abrigo;
- Alternar entre tema claro e tema escuro.

O nome personalizado também é armazenado no navegador.

---

## 4. 💾 Abrigo com memória

Utiliza `localStorage` para manter os dados da aplicação após o recarregamento da página.

São armazenados:

- Personagens;
- Alterações realizadas;
- Status de adoção;
- Favoritos;
- Nome do abrigo.

---

## 5. 📊 Painel do abrigo

Apresenta informações resumidas sobre a coleção de personagens.

O painel mostra:

- Total de personagens;
- Personagens disponíveis;
- Personagens adotados;
- Personagens favoritos;
- Total de personagens da espécie `Super`;
- Total de personagens da espécie `Humano`.

Os valores são calculados automaticamente com base nos dados atuais da aplicação.

---

# 🔗 Integração entre desafios

Os desafios extras foram integrados para que diferentes funcionalidades trabalhem em conjunto.

### ❤️ Favoritos + 💾 Abrigo com memória

Quando um personagem é favoritado, essa informação é armazenada junto aos dados do personagem.

Ao recarregar a página, o personagem continua marcado como favorito.

### ❤️ Adoção + 📊 Painel do abrigo

Quando um personagem é adotado, o status do personagem é atualizado e o painel também é atualizado.

Dessa forma:

- O número de personagens adotados aumenta;
- O número de personagens disponíveis diminui.

---

# 🧩 Componentes

A aplicação utiliza componentes React para organizar a interface.

## `App.jsx`

É o componente principal da aplicação.

Responsável por:

- Gerenciar os personagens;
- Controlar os estados;
- Cadastrar personagens;
- Editar personagens;
- Remover personagens;
- Adotar personagens;
- Favoritar personagens;
- Pesquisar;
- Filtrar;
- Controlar o nome do abrigo;
- Persistir os dados no `localStorage`;
- Exibir o painel do abrigo.

---

## `PersonagemCard.jsx`

Responsável pela apresentação individual de cada personagem.

Possui ações para:

- Ver detalhes;
- Favoritar;
- Adotar;
- Editar;
- Remover.

---

## `PersonagemForm.jsx`

Responsável pelo formulário de cadastro de novos personagens.

Realiza as validações dos dados antes de enviar o personagem para o componente principal.

---

## `personagens.js`

Contém os personagens iniciais da aplicação.

Os personagens são representados como objetos JavaScript dentro de um array.

---

# 📁 Estrutura do projeto

```text
multiverside/
│
├── public/
│   └── img/
│
├── src/
│   ├── components/
│   │   ├── PersonagemCard.jsx
│   │   └── PersonagemForm.jsx
│   │
│   ├── data/
│   │   └── personagens.js
│   │
│   ├── App.jsx
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
└── README.md




