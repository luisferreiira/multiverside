import { useEffect, useState } from "react";
import { personagens as personagensIniciais } from "./data/personagens";
import PersonagemCard from "./components/PersonagemCard";
import PersonagemForm from "./components/PersonagemForm";

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

  const [mostrarFavoritos, setMostrarFavoritos] =
    useState(false);

  const [nomeAbrigo, setNomeAbrigo] =
    useState(() => {
      const nomeSalvo =
        localStorage.getItem("nomeAbrigo");

      return nomeSalvo || "Multiverside";
    });

  const [temaEscuro, setTemaEscuro] =
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

  function adotar(id) {
    const novaLista = personagens.map((personagem) =>
      personagem.id === id
        ? { ...personagem, status: "Adotado" }
        : personagem
    );

    setPersonagens(novaLista);
  }

  function favoritar(id) {
    const novaLista = personagens.map((personagem) =>
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
        p.id === id ? { ...p, ...dados } : p
      )
    );

    return null;
  }

  function remover(id) {
    const personagem = personagens.find(
      (p) => p.id === id
    );

    if (window.confirm(`Remover ${personagem.nome}?`)) {
      setPersonagens(
        personagens.filter((p) => p.id !== id)
      );
    }
  }

  const totalPersonagens = personagens.length;

  const totalAdotados = personagens.filter(
    (personagem) =>
      personagem.status === "Adotado"
  ).length;

  const totalDisponiveis = personagens.filter(
    (personagem) =>
      personagem.status === "Disponível"
  ).length;

  const totalFavoritos = personagens.filter(
    (personagem) =>
      personagem.favorito === true
  ).length;

  const totalSupers = personagens.filter(
    (personagem) =>
      personagem.especie === "Super"
  ).length;

  const totalHumanos = personagens.filter(
    (personagem) =>
      personagem.especie === "Humano"
  ).length;

  const personagensFiltrados = personagens.filter(
    (personagem) => {
      const correspondeBusca =
        personagem.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

      const correspondeEspecie =
        filtroEspecie === "Todas" ||
        personagem.especie === filtroEspecie;

      const correspondePersonalidade =
        filtroPersonalidade === "Todas" ||
        personagem.personalidade ===
          filtroPersonalidade;

      const correspondeRaridade =
        filtroRaridade === "Todas" ||
        personagem.raridade === filtroRaridade;

      const correspondeFavoritos =
        !mostrarFavoritos ||
        personagem.favorito === true;

      return (
        correspondeBusca &&
        correspondeEspecie &&
        correspondePersonalidade &&
        correspondeRaridade &&
        correspondeFavoritos
      );
    }
  );

  return (
    <div
      style={{
        backgroundColor: temaEscuro
          ? "#1a1a1a"
          : "#ffffff",
        color: temaEscuro
          ? "#ffffff"
          : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>{nomeAbrigo}</h1>

      <h2>Painel do abrigo</h2>

      <p>
        👥 Total de personagens:{" "}
        {totalPersonagens}
      </p>

      <p>
        🟢 Disponíveis: {totalDisponiveis}
      </p>

      <p>
        ❤️ Adotados: {totalAdotados}
      </p>

      <p>
        ⭐ Favoritos: {totalFavoritos}
      </p>

      <p>
        🦸 Supers: {totalSupers}
      </p>

      <p>
        👤 Humanos: {totalHumanos}
      </p>

      <h2>Identidade do abrigo</h2>

      <label>
        Nome do abrigo:
        <input
          type="text"
          value={nomeAbrigo}
          onChange={(e) =>
            setNomeAbrigo(e.target.value)
          }
        />
      </label>

      <br />

      <button
        onClick={() =>
          setTemaEscuro(!temaEscuro)
        }
      >
        {temaEscuro
          ? "☀️ Tema claro"
          : "🌙 Tema escuro"}
      </button>

      <PersonagemForm
        onCadastrar={cadastrar}
      />

      <h2>Pesquisar</h2>

      <input
        type="text"
        placeholder="Buscar personagem..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />

      <h2>Filtros</h2>

      <label>
        Espécie:
        <select
          value={filtroEspecie}
          onChange={(e) =>
            setFiltroEspecie(e.target.value)
          }
        >
          <option>Todas</option>
          <option>Super</option>
          <option>Humano</option>
        </select>
      </label>

      <br />

      <label>
        Personalidade:
        <select
          value={filtroPersonalidade}
          onChange={(e) =>
            setFiltroPersonalidade(e.target.value)
          }
        >
          <option>Todas</option>
          <option>Narcisista</option>
          <option>Impulsivo</option>
          <option>Medroso</option>
        </select>
      </label>

      <br />

      <label>
        Raridade:
        <select
          value={filtroRaridade}
          onChange={(e) =>
            setFiltroRaridade(e.target.value)
          }
        >
          <option>Todas</option>
          <option>Comum</option>
          <option>Raro</option>
          <option>Épico</option>
          <option>Lendário</option>
        </select>
      </label>

      <br />

      <button
        onClick={() =>
          setMostrarFavoritos(!mostrarFavoritos)
        }
      >
        {mostrarFavoritos
          ? "❤️ Mostrar todos"
          : "🤍 Meus favoritos"}
      </button>

      <h2>Personagens</h2>

      {personagensFiltrados.length === 0 && (
        <p>Nenhum personagem encontrado.</p>
      )}

      {personagensFiltrados.map((personagem) => (
        <PersonagemCard
          key={personagem.id}
          personagem={personagem}
          onAdotar={adotar}
          onEditar={editar}
          onRemover={remover}
          onFavoritar={favoritar}
          temaEscuro={temaEscuro}
        />
      ))}
    </div>
  );
}

export default App;