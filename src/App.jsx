import { useEffect, useState } from "react";
import { personagens as personagensIniciais } from "./data/personagens";
import PersonagemCard from "./components/PersonagemCard";
import PersonagemForm from "./components/PersonagemForm";
import "./App.css";

function App() {
  const [personagens, setPersonagens] = useState(() => {
    const personagensSalvos =
      localStorage.getItem("personagens");

    if (personagensSalvos) {
      return JSON.parse(personagensSalvos);
    }

    return personagensIniciais;
  });

  const [busca, setBusca] = useState("");

  const [filtroEspecie, setFiltroEspecie] =
    useState("Todas");

  const [filtroPersonalidade, setFiltroPersonalidade] =
    useState("Todas");

  const [filtroRaridade, setFiltroRaridade] =
    useState("Todas");

  const [filtroObra, setFiltroObra] =
    useState("Todas");

  const [mostrarFavoritos, setMostrarFavoritos] =
    useState(false);

  const [nomeAbrigo, setNomeAbrigo] =
    useState(() => {
      const nomeSalvo =
        localStorage.getItem("nomeAbrigo");

      return nomeSalvo || "Multiverside";
    });

  const [nomeUsuario, setNomeUsuario] =
    useState(() => {
      const nomeSalvo =
        localStorage.getItem("nomeUsuario");

      return nomeSalvo || "";
    });

  const [temaEscuro, setTemaEscuro] =
    useState(() => {
      const temaSalvo =
        localStorage.getItem("temaEscuro");

      return temaSalvo === "true";
    });

  const [painelAberto, setPainelAberto] =
    useState(false);

  const [identidadeAberta, setIdentidadeAberta] =
    useState(false);

  const [cadastroAberto, setCadastroAberto] =
    useState(false);

  const [filtrosAbertos, setFiltrosAbertos] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "personagens",
      JSON.stringify(personagens)
    );
  }, [personagens]);

  useEffect(() => {
    localStorage.setItem(
      "nomeAbrigo",
      nomeAbrigo
    );
  }, [nomeAbrigo]);

  useEffect(() => {
    localStorage.setItem(
      "nomeUsuario",
      nomeUsuario
    );
  }, [nomeUsuario]);

  useEffect(() => {
    localStorage.setItem(
      "temaEscuro",
      temaEscuro
    );
  }, [temaEscuro]);

  useEffect(() => {
    document.documentElement.dataset.tema =
      temaEscuro ? "escuro" : "claro";
  }, [temaEscuro]);

  function adotar(id) {
    const novaLista = personagens.map(
      (personagem) =>
        personagem.id === id
          ? {
            ...personagem,
            status: "Adotado",
          }
          : personagem
    );

    setPersonagens(novaLista);
  }

  function favoritar(id) {
    const novaLista = personagens.map(
      (personagem) =>
        personagem.id === id
          ? {
            ...personagem,
            favorito: !personagem.favorito,
          }
          : personagem
    );

    setPersonagens(novaLista);
  }

  function cadastrar(novo) {
    const jaExiste = personagens.some(
      (p) =>
        p.nome.toLowerCase() ===
        novo.nome.toLowerCase()
    );

    if (jaExiste) {
      return "Já existe um personagem com esse nome.";
    }

    setPersonagens([
      ...personagens,
      {
        ...novo,
        id: Date.now(),
        favorito: false,
      },
    ]);

    return null;
  }

  function editar(id, dados) {
    const jaExiste = personagens.some(
      (p) =>
        p.id !== id &&
        p.nome.toLowerCase() ===
        dados.nome.toLowerCase()
    );

    if (jaExiste) {
      return "Já existe um personagem com esse nome.";
    }

    setPersonagens(
      personagens.map((p) =>
        p.id === id
          ? { ...p, ...dados }
          : p
      )
    );

    return null;
  }

  function remover(id) {
    const personagem = personagens.find(
      (p) => p.id === id
    );

    if (
      personagem &&
      window.confirm(
        `Remover ${personagem.nome}?`
      )
    ) {
      setPersonagens(
        personagens.filter(
          (p) => p.id !== id
        )
      );
    }
  }

  const totalPersonagens =
    personagens.length;

  const totalAdotados =
    personagens.filter(
      (personagem) =>
        personagem.status === "Adotado"
    ).length;

  const totalDisponiveis =
    personagens.filter(
      (personagem) =>
        personagem.status === "Disponível"
    ).length;

  const totalFavoritos =
    personagens.filter(
      (personagem) =>
        personagem.favorito === true
    ).length;

  const totalSupers =
    personagens.filter(
      (personagem) =>
        personagem.especie === "Super"
    ).length;

  const totalHumanos =
    personagens.filter(
      (personagem) =>
        personagem.especie === "Humano"
    ).length;

  const obrasDisponiveis = [
    ...new Set(
      personagens
        .map(
          (personagem) =>
            personagem.obra
        )
        .filter(Boolean)
    ),
  ].sort();

  const personalidadesDisponiveis = [
    ...new Set(
      personagens
        .map(
          (personagem) =>
            personagem.personalidade
        )
        .filter(Boolean)
    ),
  ].sort();

  const personagensFiltrados =
    personagens.filter(
      (personagem) => {
        const correspondeBusca =
          personagem.nome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            );

        const correspondeEspecie =
          filtroEspecie === "Todas" ||
          personagem.especie ===
          filtroEspecie;

        const correspondePersonalidade =
          filtroPersonalidade ===
          "Todas" ||
          personagem.personalidade ===
          filtroPersonalidade;

        const correspondeRaridade =
          filtroRaridade === "Todas" ||
          personagem.raridade ===
          filtroRaridade;

        const correspondeObra =
          filtroObra === "Todas" ||
          personagem.obra ===
          filtroObra;

        const correspondeFavoritos =
          !mostrarFavoritos ||
          personagem.favorito === true;

        return (
          correspondeBusca &&
          correspondeEspecie &&
          correspondePersonalidade &&
          correspondeRaridade &&
          correspondeObra &&
          correspondeFavoritos
        );
      }
    );

  return (
    <div className="app">
      {/* ===== Cabeçalho ===== */}
      <header className="cabecalho">
        <div className="cabecalho-textos">
          <div className="cabecalho-boas-vindas">
            <p className="cabecalho-saudacao">
              {nomeUsuario
                ? `Bem-vindo, ${nomeUsuario}!`
                : "Bem-vindo ao Multiverside!"}
            </p>

            <h1 className="cabecalho-titulo">
              {nomeAbrigo}
            </h1>

            <p className="cabecalho-descricao">
              Central de gerenciamento de
              personagens fictícios
            </p>
          </div>
        </div>



        <nav className="menu-navegacao" aria-label="Navegação principal">
          <a href="#painel">
            <i className="fa-solid fa-chart-column"></i>
              Painel
          </a>

          <a href="#pesquisa">
            <i className="fa-solid fa-magnifying-glass"></i>
            Pesquisar
          </a>

          <a href="#personagens">
            <i className="fa-solid fa-users"></i>
            Personagens
          </a>

          <a href="#pesquisa">
            <i className="fa-solid fa-heart"></i>
            Favoritos
          </a>
          <button
            className="botao-tema"
            onClick={() =>
              setTemaEscuro(
                !temaEscuro
              )
            }
          >
            {temaEscuro ? (
              <>
                <i className="fa-solid fa-sun"></i>
                Tema claro
              </>
            ) : (
              <>
                <i className="fa-solid fa-moon"></i>
                Tema escuro
              </>
            )}
          </button>
        </nav>
      </header>

      <main id="inicio" className="conteudo">
        {/* ===== Painel do abrigo ===== */}
        <section id="painel" className="secao">
          <button
            type="button"
            className="titulo-secao"
            onClick={() =>
              setPainelAberto(
                !painelAberto
              )
            }
            aria-expanded={painelAberto}
          >
            <span>
              📊 Painel do abrigo </span>

            <span>
              {painelAberto
                ? "−"
                : "+"}
            </span>
          </button>

          {painelAberto && (
            <div className="painel-grade">
              <div className="painel-item">
                <span className="painel-icone">
                  👥
                </span>

                <span className="painel-numero">
                  {totalPersonagens}
                </span>

                <span className="painel-rotulo">
                  Total de personagens
                </span>
              </div>

              <div className="painel-item">
                <span className="painel-icone">
                  🟢
                </span>

                <span className="painel-numero">
                  {totalDisponiveis}
                </span>

                <span className="painel-rotulo">
                  Disponíveis
                </span>
              </div>

              <div className="painel-item">
                <span className="painel-icone">
                  ❤️
                </span>

                <span className="painel-numero">
                  {totalAdotados}
                </span>

                <span className="painel-rotulo">
                  Adotados
                </span>
              </div>

              <div className="painel-item">
                <span className="painel-icone">
                  ⭐
                </span>

                <span className="painel-numero">
                  {totalFavoritos}
                </span>

                <span className="painel-rotulo">
                  Favoritos
                </span>
              </div>

              <div className="painel-item">
                <span className="painel-icone">
                  🦸
                </span>

                <span className="painel-numero">
                  {totalSupers}
                </span>

                <span className="painel-rotulo">
                  Supers
                </span>
              </div>

              <div className="painel-item">
                <span className="painel-icone">
                  👤
                </span>

                <span className="painel-numero">
                  {totalHumanos}
                </span>

                <span className="painel-rotulo">
                  Humanos
                </span>
              </div>
            </div>
          )}
        </section>

        <div className="colunas">
          {/* ===== Coluna lateral ===== */}
          <aside className="coluna-lateral">
            {/* ===== Identidade ===== */}
            <section className="secao">
              <button
                type="button"
                className="titulo-secao"
                onClick={() =>
                  setIdentidadeAberta(
                    !identidadeAberta
                  )
                }
                aria-expanded={
                  identidadeAberta
                }
              >
                <span>
                  🏠 Identidade do abrigo </span>

                <span>
                  {identidadeAberta
                    ? "−"
                    : "+"}
                </span>
              </button>

              {identidadeAberta && (
                <div className="conteudo-secao">
                  <label className="campo">
                    <span>
                      Seu nome
                    </span>

                    <input
                      type="text"
                      placeholder="Ex.: Luís"
                      value={nomeUsuario}
                      onChange={(e) =>
                        setNomeUsuario(
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label className="campo">
                    <span>
                      Nome do abrigo
                    </span>

                    <input
                      type="text"
                      value={nomeAbrigo}
                      onChange={(e) =>
                        setNomeAbrigo(
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              )}
            </section>

            {/* ===== Cadastro ===== */}
            <section className="secao">
              <button
                type="button"
                className="titulo-secao"
                onClick={() =>
                  setCadastroAberto(
                    !cadastroAberto
                  )
                }
                aria-expanded={
                  cadastroAberto
                }
              >
                <span>
                  ➕ Novo personagem </span>

                <span>
                  {cadastroAberto
                    ? "−"
                    : "+"}
                </span>
              </button>

              {cadastroAberto && (
                <div className="conteudo-secao">
                  <PersonagemForm
                    onCadastrar={cadastrar}
                  />
                </div>
              )}
            </section>
          </aside>

          {/* ===== Coluna principal ===== */}
          <div className="coluna-principal">
            {/* ===== Pesquisa e filtros ===== */}
            <section id="pesquisa" className="secao">
              <button
                type="button"
                className="titulo-secao"
                onClick={() =>
                  setFiltrosAbertos(
                    !filtrosAbertos
                  )
                }
                aria-expanded={
                  filtrosAbertos
                }
              >
                <span>
                  🔎 Pesquisar e filtrar </span>

                <span>
                  {filtrosAbertos
                    ? "−"
                    : "+"}
                </span>
              </button>

              {filtrosAbertos && (
                <div className="conteudo-secao">
                  <label className="campo">
                    <span>
                      Pesquisar
                    </span>

                    <input
                      type="search"
                      placeholder="Buscar personagem..."
                      value={busca}
                      onChange={(e) =>
                        setBusca(
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <div className="filtros">
                    <label className="campo">
                      <span>
                        Obra / Universo
                      </span>

                      <select
                        value={filtroObra}
                        onChange={(e) =>
                          setFiltroObra(
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Todas
                        </option>

                        {obrasDisponiveis.map(
                          (obra) => (
                            <option
                              key={obra}
                              value={obra}
                            >
                              {obra}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label className="campo">
                      <span>
                        Espécie
                      </span>

                      <select
                        value={filtroEspecie}
                        onChange={(e) =>
                          setFiltroEspecie(
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Todas
                        </option>
                        <option>
                          Super
                        </option>
                        <option>
                          Humano
                        </option>
                      </select>
                    </label>

                    <label className="campo">
                      <span>
                        Personalidade
                      </span>

                      <select
                        value={
                          filtroPersonalidade
                        }
                        onChange={(e) =>
                          setFiltroPersonalidade(
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Todas
                        </option>

                        {personalidadesDisponiveis.map(
                          (
                            personalidade
                          ) => (
                            <option
                              key={
                                personalidade
                              }
                              value={
                                personalidade
                              }
                            >
                              {
                                personalidade
                              }
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label className="campo">
                      <span>
                        Raridade
                      </span>

                      <select
                        value={
                          filtroRaridade
                        }
                        onChange={(e) =>
                          setFiltroRaridade(
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Todas
                        </option>
                        <option>
                          Comum
                        </option>
                        <option>
                          Raro
                        </option>
                        <option>
                          Épico
                        </option>
                        <option>
                          Lendário
                        </option>
                      </select>
                    </label>
                  </div>

                  <button
                    className={
                      mostrarFavoritos
                        ? "botao-secundario ativo"
                        : "botao-secundario"
                    }
                    aria-pressed={
                      mostrarFavoritos
                    }
                    onClick={() =>
                      setMostrarFavoritos(
                        !mostrarFavoritos
                      )
                    }
                  >
                    {mostrarFavoritos
                      ? "❤️ Mostrar todos"
                      : "🤍 Meus favoritos"}
                  </button>
                </div>
              )}
            </section>

            {/* ===== Lista de personagens ===== */}
            <section id="personagens">
              <div className="lista-topo">
                <h2>
                  Personagens
                </h2>

                <span className="lista-contador">
                  {
                    personagensFiltrados.length
                  }{" "}
                  de{" "}
                  {totalPersonagens}
                </span>
              </div>

              {personagensFiltrados.length ===
                0 && (
                  <p className="mensagem-vazia">
                    Nenhum personagem
                    encontrado.
                  </p>
                )}

              <div className="grade-personagens">
                {personagensFiltrados.map(
                  (personagem) => (
                    <PersonagemCard
                      key={personagem.id}
                      personagem={
                        personagem
                      }
                      onAdotar={adotar}
                      onEditar={editar}
                      onRemover={remover}
                      onFavoritar={
                        favoritar
                      }
                    />
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="rodape">
        <strong>Multiverside</strong>

        <span>
          Central de gerenciamento de personagens fictícios
        </span>

        <span>
          Projeto por Maria e Luís • 2026
        </span>
      </footer>
    </div>
  );
}

export default App;