import { useState } from "react";

function PersonagemCard({
  personagem,
  onAdotar,
  onEditar,
  onRemover,
  onFavoritar,
}) {
  const adotado = personagem.status === "Adotado";

  const [editando, setEditando] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const [nome, setNome] = useState(personagem.nome);
  const [energia, setEnergia] = useState(personagem.energia);
  const [personalidade, setPersonalidade] = useState(
    personagem.personalidade
  );

  const [erro, setErro] = useState("");

  function salvar() {
    if (nome.trim() === "" || personalidade.trim() === "") {
      setErro("Preencha nome e personalidade.");
      return;
    }

    if (energia === "" || energia < 0 || energia > 100) {
      setErro("O poder deve estar entre 0 e 100.");
      return;
    }

    const erroDoApp = onEditar(personagem.id, {
      nome: nome.trim(),
      energia: Number(energia),
      personalidade: personalidade.trim(),
    });

    if (erroDoApp) {
      setErro(erroDoApp);
      return;
    }

    setErro("");
    setEditando(false);
  }

  function cancelar() {
    setNome(personagem.nome);
    setEnergia(personagem.energia);
    setPersonalidade(personagem.personalidade);
    setErro("");
    setEditando(false);
  }

  function alternarDetalhes() {
    setMostrarDetalhes(!mostrarDetalhes);
  }

  if (editando) {
    return (
      <div className="card">
        <label>
          Nome:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Poder (0 a 100):
          <input
            type="number"
            value={energia}
            onChange={(e) => setEnergia(e.target.value)}
          />
        </label>

        <label>
          Personalidade:
          <input
            value={personalidade}
            onChange={(e) => setPersonalidade(e.target.value)}
          />
        </label>

        {erro && (
          <p style={{ color: "red" }}>
            {erro}
          </p>
        )}

        <button onClick={salvar}>
          Salvar
        </button>

        <button onClick={cancelar}>
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{personagem.nome}</h3>

      <p>
        {personagem.especie} | {personagem.personalidade}
      </p>

      <p>Poder: {personagem.energia}</p>

      <p>Raridade: {personagem.raridade}</p>

      <p>Status: {personagem.status}</p>

      <button onClick={alternarDetalhes}>
        {mostrarDetalhes ? "Ocultar detalhes" : "Ver detalhes"}
      </button>

      {mostrarDetalhes && (
        <div className="detalhes">
          <h4>Detalhes do personagem</h4>

          <p>
            <strong>Nome:</strong> {personagem.nome}
          </p>

          <p>
            <strong>Obra:</strong> {personagem.obra}
          </p>

          <p>
            <strong>Espécie:</strong> {personagem.especie}
          </p>

          <p>
            <strong>Poder:</strong> {personagem.energia}
          </p>

          <p>
            <strong>Personalidade:</strong> {personagem.personalidade}
          </p>

          <p>
            <strong>Raridade:</strong> {personagem.raridade}
          </p>

          <p>
            <strong>Status:</strong> {personagem.status}
          </p>
        </div>
      )}

      <button
        onClick={() => onFavoritar(personagem.id)}
      >
        {personagem.favorito ? "❤️ Favorito" : "🤍 Favoritar"}
      </button>

      <button
        disabled={adotado}
        onClick={() => onAdotar(personagem.id)}
      >
        {adotado ? "Já adotado" : "Adotar"}
      </button>

      <button onClick={() => setEditando(true)}>
        Editar
      </button>

      <button onClick={() => onRemover(personagem.id)}>
        Remover
      </button>
    </div>
  );
}

export default PersonagemCard;