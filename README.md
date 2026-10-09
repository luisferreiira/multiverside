# 🌌 Multiverside

Aplicação web desenvolvida para a disciplina de Tecnologia em Desenvolvimento de Internet II, do IFSULDEMINAS - Campus Machado.

O Multiverside adapta a proposta do projeto **PixelPet Rescue** para uma central de gerenciamento de personagens fictícios de filmes, séries, livros, jogos e outros universos.

## 🎯 Objetivo

Praticar React, JavaScript, componentes, estados, eventos, objetos, arrays, operações de cadastro e gerenciamento de dados em uma aplicação web.

## 🛠️ Tecnologias

- React
- JavaScript ES6+
- Vite
- CSS
- Font Awesome
- localStorage

## 🚀 Como executar

```bash
npm install
npm run dev
```

Depois, abra o endereço informado pelo Vite no navegador.

Para validar a versão de produção:

```bash
npm run lint
npm run build
```

## 📌 Funcionalidades

- Cadastro de personagens
- Listagem e detalhes
- Pesquisa por nome
- Filtros por obra, espécie, personalidade e raridade
- Favoritos
- Adoção com atualização de status
- Interação com personagem
- Edição
- Remoção com confirmação
- Upload de imagem local
- Painel com indicadores da coleção
- Identidade personalizada do abrigo
- Nome do usuário e saudação
- Tema claro e escuro
- Persistência com `localStorage`
- Seções recolhíveis
- Menu de navegação
- Interface responsiva

## 🌟 Desafios extras selecionados

1. **Encontre seu companheiro**: pesquisa e filtros.
2. **Meus favoritos**: marcação e visualização de favoritos.
3. **Identidade do abrigo**: nome personalizado e tema claro/escuro.
4. **Abrigo com memória**: persistência usando `localStorage`.
5. **Painel do abrigo**: indicadores calculados automaticamente.

### Integrações

- Favoritos + `localStorage`
- Adoção + Painel do abrigo

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
```

## 🤖 Uso de IA

A IA foi utilizada como apoio durante o desenvolvimento para compreender requisitos, revisar código, sugerir melhorias de interface, auxiliar na organização dos componentes e apoiar a identificação de erros. As decisões e a implementação final foram revisadas pela equipe.

## 👥 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos no IFSULDEMINAS - Campus Machado.
