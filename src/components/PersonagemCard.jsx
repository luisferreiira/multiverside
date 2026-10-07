import { useState } from "react";
import "./PersonagemCard.css";

// Transforma um texto em nome de classe CSS:
// "Lendário" -> "lendario", "Disponível" -> "disponivel"
function paraClasse(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

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

  // Controla se a imagem falhou ao carregar
  // (arquivo inexistente ou caminho vazio).
  const [imagemComErro, setImagemComErro] = useState(false);

  const temImagem = personagem.imagem && !imagemComErro;

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
      <div className="card card-edicao">
        <h3 className="card-titulo">Editar personagem</h3>

        <label className="card-campo">
          <span>Nome</span>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label className="card-campo">
          <span>Poder (0 a 100)</span>
          <input
            type="number"
            value={energia}
            onChange={(e) => setEnergia(e.target.value)}
          />
        </label>

        <label className="card-campo">
          <span>Personalidade</span>
          <input
            value={personalidade}
            onChange={(e) => setPersonalidade(e.target.value)}
          />
        </label>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="card-acoes">
          <button onClick={salvar}>
            Salvar
          </button>

          <button
            className="botao-secundario"
            onClick={cancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={adotado ? "card card-adotado" : "card"}>
      {/* ===== Imagem (ou placeholder com a inicial) ===== */}
      <div
        className={`card-imagem raridade-${paraClasse(
          personagem.raridade
        )}`}
      >
        {temImagem ? (
          <img
            src={personagem.imagem}
            alt={personagem.nome}
            onError={() => setImagemComErro(true)}
          />
        ) : (
          <span className="card-inicial" aria-hidden="true">
            {personagem.nome.charAt(0).toUpperCase()}
          </span>
        )}

        <span
          className={`selo selo-raridade raridade-${paraClasse(
            personagem.raridade
          )}`}
        >
          {personagem.raridade}
        </span>
      </div>

      {/* ===== Informações principais ===== */}
      <div className="card-corpo">
        <div className="card-cabecalho">
          <h3 className="card-titulo">{personagem.nome}</h3>

          <span
            className={`selo selo-status status-${paraClasse(
              personagem.status
            )}`}
          >
            {personagem.status}
          </span>
        </div>

        <p className="card-subtitulo">
          {personagem.especie} | {personagem.personalidade}
        </p>

        <div className="card-poder">
          <span>Poder: {personagem.energia}</span>
          <progress
            className="barra-poder"
            max="100"
            value={personagem.energia}
          >
            {personagem.energia}%
          </progress>
        </div>

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

        {/* ===== Ações ===== */}
        <div className="card-acoes">
          <button
            className="botao-adotar"
            disabled={adotado}
            onClick={() => onAdotar(personagem.id)}
          >
            {adotado ? "Já adotado" : "Adotar"}
          </button>

          <button
            className="botao-secundario"
            onClick={alternarDetalhes}
          >
            {mostrarDetalhes ? "Ocultar detalhes" : "Ver detalhes"}
          </button>

          <button
            className={
              personagem.favorito
                ? "botao-secundario ativo"
                : "botao-secundario"
            }
            aria-pressed={personagem.favorito === true}
            onClick={() => onFavoritar(personagem.id)}
          >
            {personagem.favorito ? "❤️ Favorito" : "🤍 Favoritar"}
          </button>

          <button
            className="botao-secundario"
            onClick={() => setEditando(true)}
          >
            Editar
          </button>

          <button
            className="botao-perigo"
            onClick={() => onRemover(personagem.id)}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonagemCard;