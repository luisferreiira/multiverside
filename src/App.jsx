import { useEffect, useState } from "react";

import { personagens as personagensIniciais } from "./data/personagens";

import PersonagemCard from "./components/PersonagemCard";

import PersonagemForm from "./components/PersonagemForm";

import "./App.css";



const VERSAO_PERSONAGENS = "multiverside-personagens-v2";

function App() {

  /* Carrega a coleção salva e atualiza a lista inicial quando a versão muda. */
  const [personagens, setPersonagens] = useState(() => {
    const salvos = localStorage.getItem("personagens");
    const versaoSalva = localStorage.getItem("versaoPersonagens");

    if (salvos) {
      try {
        const listaSalva = JSON.parse(salvos);

        if (Array.isArray(listaSalva) && versaoSalva !== VERSAO_PERSONAGENS) {
          // Mantém personagens cadastrados pelo usuário (IDs gerados com Date.now()).
          const personalizados = listaSalva.filter(
            (personagem) => Number(personagem.id) > 1000000
          );
          return [...personagensIniciais, ...personalizados];
        }

        if (Array.isArray(listaSalva)) return listaSalva;
      } catch {
        return personagensIniciais;
      }
    }

    return personagensIniciais;
  });



  /* Estados da pesquisa e dos filtros. */

  const [busca, setBusca] = useState("");

  const [filtroEspecie, setFiltroEspecie] = useState("Todas");

  const [filtroPersonalidade, setFiltroPersonalidade] = useState("Todas");

  const [filtroRaridade, setFiltroRaridade] = useState("Todas");

  const [filtroObra, setFiltroObra] = useState("Todas");

  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);



  /* Identidade personalizada do abrigo e do usuário. */

  const [nomeAbrigo, setNomeAbrigo] = useState(

    () => localStorage.getItem("nomeAbrigo") || "Multiverside"

  );

  const [nomeUsuario, setNomeUsuario] = useState(

    () => localStorage.getItem("nomeUsuario") || ""

  );



  /* Tema visual salvo no navegador. */

  const [temaEscuro, setTemaEscuro] = useState(

    () => localStorage.getItem("temaEscuro") === "true"

  );



  /* Implementação de colapsar cada seção da interface. */

  const [painelAberto, setPainelAberto] = useState(true);

  const [identidadeAberta, setIdentidadeAberta] = useState(false);

  const [cadastroAberto, setCadastroAberto] = useState(false);

  const [filtrosAbertos, setFiltrosAbertos] = useState(false);



  /* Mensagem curta para feedback das ações do usuário. */

  const [mensagem, setMensagem] = useState("");



  /* Persistência dos personagens e das preferências. */

  useEffect(() => localStorage.setItem("personagens", JSON.stringify(personagens)), [personagens]);
  useEffect(() => localStorage.setItem("versaoPersonagens", VERSAO_PERSONAGENS), []);

  useEffect(() => localStorage.setItem("nomeAbrigo", nomeAbrigo), [nomeAbrigo]);

  useEffect(() => localStorage.setItem("nomeUsuario", nomeUsuario), [nomeUsuario]);

  useEffect(() => localStorage.setItem("temaEscuro", String(temaEscuro)), [temaEscuro]);



  /* Aplica o tema ao elemento <html>. */

  useEffect(() => {

    document.documentElement.dataset.tema = temaEscuro ? "escuro" : "claro";

  }, [temaEscuro]);



  /* Ação para adotar: muda o status e impede nova adoção pelo card. */

  function adotar(id) {

    setPersonagens((lista) =>

      lista.map((personagem) =>

        personagem.id === id && personagem.status !== "Adotado"

          ? { ...personagem, status: "Adotado" }

          : personagem

      )

    );

    setMensagem("Personagem adotado com sucesso!");

  }



  /* Ação para favoritar ou desfavoritar um personagem. */

  function favoritar(id) {

    setPersonagens((lista) =>

      lista.map((personagem) =>

        personagem.id === id

          ? { ...personagem, favorito: !personagem.favorito }

          : personagem

      )

    );

  }



  /* Ação de interação: aumenta o poder em 5 pontos, limitado a 100. */

  function interagir(id) {

    const personagem = personagens.find((p) => p.id === id);

    if (!personagem) return;



    const novoPoder = Math.min(100, Number(personagem.energia) + 5);

    setPersonagens((lista) =>

      lista.map((p) => (p.id === id ? { ...p, energia: novoPoder } : p))

    );

    setMensagem(`${personagem.nome} recebeu atenção! Poder atual: ${novoPoder}.`);

  }



  /* Lógica de cadastrar: impede nomes duplicados e adiciona o personagem. */

  function cadastrar(novo) {

    const jaExiste = personagens.some(

      (p) => p.nome.trim().toLowerCase() === novo.nome.trim().toLowerCase()

    );

    if (jaExiste) return "Já existe um personagem com esse nome.";



    setPersonagens((lista) => [

      ...lista,

      { ...novo, id: Date.now(), favorito: false },

    ]);

    setMensagem("Personagem cadastrado com sucesso!");

    return null;

  }



  /* Lógica de edição: atualiza apenas os dados enviados pelo card. */

  function editar(id, dados) {

    const jaExiste = personagens.some(

      (p) => p.id !== id && p.nome.trim().toLowerCase() === dados.nome.trim().toLowerCase()

    );

    if (jaExiste) return "Já existe um personagem com esse nome.";



    setPersonagens((lista) =>

      lista.map((p) => (p.id === id ? { ...p, ...dados } : p))

    );

    setMensagem("Personagem atualizado com sucesso!");

    return null;

  }



  /* Lógica de remover com confirmação antes da exclusão. */

  function remover(id) {

    const personagem = personagens.find((p) => p.id === id);

    if (!personagem) return;



    if (window.confirm(`Remover ${personagem.nome}?`)) {

      setPersonagens((lista) => lista.filter((p) => p.id !== id));

      setMensagem("Personagem removido.");

    }

  }



  /* Dados calculados para o painel. */

  const totalPersonagens = personagens.length;

  const totalAdotados = personagens.filter((p) => p.status === "Adotado").length;

  const totalDisponiveis = personagens.filter((p) => p.status === "Disponível").length;

  const totalFavoritos = personagens.filter((p) => p.favorito === true).length;

  const especiesDisponiveis = [...new Set(personagens.map((p) => p.especie).filter(Boolean))].sort();
  const totaisPorEspecie = especiesDisponiveis.map((especie) => ({
    especie,
    total: personagens.filter((p) => p.especie === especie).length,
  }));



  /* Monta as opções de filtro a partir dos personagens existentes. */

  const obrasDisponiveis = [...new Set(personagens.map((p) => p.obra).filter(Boolean))].sort();

  const personalidadesDisponiveis = [

    ...new Set(personagens.map((p) => p.personalidade).filter(Boolean)),

  ].sort();



  /* Aplica pesquisa, filtros e modo de favoritos ao mesmo tempo. */

  const personagensFiltrados = personagens.filter((personagem) => {

    const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
    const correspondeBusca = [personagem.nome, personagem.nomeOriginal].filter(Boolean).some((nome) => nome.toLocaleLowerCase("pt-BR").includes(termoBusca));

    const correspondeEspecie = filtroEspecie === "Todas" || personagem.especie === filtroEspecie;

    const correspondePersonalidade =

      filtroPersonalidade === "Todas" || personagem.personalidade === filtroPersonalidade;

    const correspondeRaridade = filtroRaridade === "Todas" || personagem.raridade === filtroRaridade;

    const correspondeObra = filtroObra === "Todas" || personagem.obra === filtroObra;

    const correspondeFavoritos = !mostrarFavoritos || personagem.favorito === true;



    return (

      correspondeBusca &&

      correspondeEspecie &&

      correspondePersonalidade &&

      correspondeRaridade &&

      correspondeObra &&

      correspondeFavoritos

    );

  });



  /* Navegação do menu: abre a área necessária e rola até ela. */

  function irParaSecao(id, abrir = null) {

    if (abrir) abrir(true);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  }



  /* Navegação para a lista com o filtro de favoritos ativado. */

  function irParaFavoritos() {

    setMostrarFavoritos(true);

    setFiltrosAbertos(true);

    document.getElementById("personagens")?.scrollIntoView({ behavior: "smooth" });

  }



  return (

    <div className="app">

      {/* Cabeçalho e identidade do sistema. */}

      <header className="cabecalho" id="inicio">

        <div className="cabecalho-textos">

          <p className="cabecalho-saudacao">

            {nomeUsuario ? `Bem-vindo, ${nomeUsuario}!` : "Bem-vindo ao Multiverside!"}

          </p>

          <h1 className="cabecalho-titulo">{nomeAbrigo}</h1>

          <p className="cabecalho-descricao">

            Central de gerenciamento de personagens fictícios

          </p>

        </div>



        {/* Menu de navegação da página. */}

        <nav className="menu-navegacao" aria-label="Navegação principal">

          <button className="menu-link" onClick={() => irParaSecao("painel", setPainelAberto)}>

            <i className="fa-solid fa-chart-column" /> Painel

          </button>

          <button className="menu-link" onClick={() => irParaSecao("pesquisa", setFiltrosAbertos)}>

            <i className="fa-solid fa-magnifying-glass" /> Pesquisar

          </button>

          <button className="menu-link" onClick={() => irParaSecao("personagens")}>

            <i className="fa-solid fa-users" /> Personagens

          </button>

          <button className="menu-link" onClick={irParaFavoritos}>

            <i className="fa-solid fa-heart" /> Favoritos

          </button>

          <button className="menu-link" onClick={() => setTemaEscuro((tema) => !tema)}>

            <i className={`fa-solid ${temaEscuro ? "fa-sun" : "fa-moon"}`} />

            {temaEscuro ? "Tema claro" : "Tema escuro"}

          </button>

        </nav>

      </header>



      <main className="conteudo">

        {/* Painel com os indicadores calculados da coleção. */}

        <section id="painel" className="secao">

          <button

            type="button"

            className="titulo-secao"

            onClick={() => setPainelAberto((aberto) => !aberto)}

            aria-expanded={painelAberto}

          >

            <span><i className="fa-solid fa-chart-column" /> Painel do abrigo</span>

            <span>{painelAberto ? "−" : "+"}</span>

          </button>



          {painelAberto && (

            <div className="painel-grade conteudo-secao">

              <div className="painel-item"><i className="fa-solid fa-users painel-icone" /><strong>{totalPersonagens}</strong><span>Total de personagens</span></div>

              <div className="painel-item"><i className="fa-solid fa-circle-check painel-icone" /><strong>{totalDisponiveis}</strong><span>Disponíveis</span></div>

              <div className="painel-item"><i className="fa-solid fa-heart painel-icone" /><strong>{totalAdotados}</strong><span>Adotados</span></div>

              <div className="painel-item"><i className="fa-solid fa-star painel-icone" /><strong>{totalFavoritos}</strong><span>Favoritos</span></div>

              {totaisPorEspecie.map(({ especie, total }) => (
                <div className="painel-item" key={especie}>
                  <i className="fa-solid fa-users painel-icone" />
                  <strong>{total}</strong>
                  <span>{especie}</span>
                </div>
              ))}

            </div>

          )}

        </section>



        <div className="colunas">

          {/* Configurações pessoais e cadastro. */}

          <aside className="coluna-lateral">

            <section className="secao">

              <button

                type="button"

                className="titulo-secao"

                onClick={() => setIdentidadeAberta((aberto) => !aberto)}

                aria-expanded={identidadeAberta}

              >

                <span><i className="fa-solid fa-house" /> Identidade do abrigo</span>

                <span>{identidadeAberta ? "−" : "+"}</span>

              </button>



              {identidadeAberta && (

                <div className="conteudo-secao">

                  <label className="campo">

                    <span>Seu nome</span>

                    <input value={nomeUsuario} placeholder="Ex.: Luís" onChange={(e) => setNomeUsuario(e.target.value)} />

                  </label>

                  <label className="campo">

                    <span>Nome do abrigo</span>

                    <input value={nomeAbrigo} onChange={(e) => setNomeAbrigo(e.target.value)} />

                  </label>

                </div>

              )}

            </section>



            <section className="secao">

              <button

                type="button"

                className="titulo-secao"

                onClick={() => setCadastroAberto((aberto) => !aberto)}

                aria-expanded={cadastroAberto}

              >

                <span><i className="fa-solid fa-plus" /> Novo personagem</span>

                <span>{cadastroAberto ? "−" : "+"}</span>

              </button>

              {cadastroAberto && (

                <div className="conteudo-secao">

                  <PersonagemForm onCadastrar={cadastrar} />

                </div>

              )}

            </section>

          </aside>



          {/* Pesquisa e filtros da coleção. */}

          <div className="coluna-principal">

            <section id="pesquisa" className="secao">

              <button

                type="button"

                className="titulo-secao"

                onClick={() => setFiltrosAbertos((aberto) => !aberto)}

                aria-expanded={filtrosAbertos}

              >

                <span><i className="fa-solid fa-magnifying-glass" /> Pesquisar e filtrar</span>

                <span>{filtrosAbertos ? "−" : "+"}</span>

              </button>



              {filtrosAbertos && (

                <div className="conteudo-secao">

                  <label className="campo">

                    <span>Pesquisar por nome</span>

                    <input

                      type="search"

                      placeholder="Buscar personagem..."

                      value={busca}

                      onChange={(e) => setBusca(e.target.value)}

                    />

                  </label>



                  <div className="filtros">

                    <label className="campo"><span>Obra / Universo</span><select value={filtroObra} onChange={(e) => setFiltroObra(e.target.value)}><option>Todas</option>{obrasDisponiveis.map((obra) => <option key={obra}>{obra}</option>)}</select></label>

                    <label className="campo"><span>Espécie</span><select value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)}><option>Todas</option>{especiesDisponiveis.map((especie) => <option key={especie}>{especie}</option>)}</select></label>

                    <label className="campo"><span>Personalidade</span><select value={filtroPersonalidade} onChange={(e) => setFiltroPersonalidade(e.target.value)}><option>Todas</option>{personalidadesDisponiveis.map((p) => <option key={p}>{p}</option>)}</select></label>

                    <label className="campo"><span>Raridade</span><select value={filtroRaridade} onChange={(e) => setFiltroRaridade(e.target.value)}><option>Todas</option><option>Comum</option><option>Raro</option><option>Épico</option><option>Lendário</option></select></label>

                  </div>



                  <button

                    className={mostrarFavoritos ? "botao-secundario ativo" : "botao-secundario"}

                    aria-pressed={mostrarFavoritos}

                    onClick={() => setMostrarFavoritos((ativo) => !ativo)}

                  >

                    <i className={`fa-solid ${mostrarFavoritos ? "fa-heart" : "fa-heart"}`} />

                    {mostrarFavoritos ? " Mostrar todos" : " Meus favoritos"}

                  </button>

                </div>

              )}

            </section>



            {/* Lista principal dos personagens. */}

            <section id="personagens">

              <div className="lista-topo">

                <h2>Personagens</h2>

                <span className="lista-contador">{personagensFiltrados.length} de {totalPersonagens}</span>

              </div>



              {mensagem && (

                <div className="mensagem-sucesso" role="status">

                  <span>{mensagem}</span>

                  <button type="button" onClick={() => setMensagem("")} aria-label="Fechar mensagem">×</button>

                </div>

              )}



              {personagensFiltrados.length === 0 && (

                <p className="mensagem-vazia">Nenhum personagem encontrado.</p>

              )}



              <div className="grade-personagens">

                {personagensFiltrados.map((personagem) => (

                  <PersonagemCard

                    key={personagem.id}

                    personagem={personagem}

                    onAdotar={adotar}

                    onInteragir={interagir}

                    onEditar={editar}

                    onRemover={remover}

                    onFavoritar={favoritar}

                  />

                ))}

              </div>

            </section>

          </div>

        </div>

      </main>



      {/* Rodapé com identificação acadêmica do projeto. */}

      <footer className="rodape">

        <strong><i className="fa-solid fa-meteor" /> Multiverside</strong>

        <span>Central de gerenciamento de personagens fictícios</span>

        <span>Projeto acadêmico • IFSULDEMINAS • 2026</span>

      </footer>

    </div>

  );

}



export default App;
