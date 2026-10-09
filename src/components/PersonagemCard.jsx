import { useState } from "react";
import "./PersonagemCard.css";

/* Transforma valores como "Lendário" em nomes de classe CSS seguros. */
function paraClasse(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function PersonagemCard({ personagem, onAdotar, onInteragir, onEditar, onRemover, onFavoritar }) {
  const adotado = personagem.status === "Adotado";
  const [editando, setEditando] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [nome, setNome] = useState(personagem.nome);
  const [energia, setEnergia] = useState(personagem.energia);
  const [personalidade, setPersonalidade] = useState(personagem.personalidade);
  const [erro, setErro] = useState("");
  const [imagemComErro, setImagemComErro] = useState(false);

  /* Lógica de salvar a edição do card. */
  function salvar() {
    if (nome.trim() === "" || personalidade.trim() === "") {
      setErro("Preencha nome e personalidade.");
      return;
    }
    if (energia === "" || Number(energia) < 0 || Number(energia) > 100) {
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

  /* Cancela a edição e restaura os dados originais. */
  function cancelar() {
    setNome(personagem.nome);
    setEnergia(personagem.energia);
    setPersonalidade(personagem.personalidade);
    setErro("");
    setEditando(false);
  }

  if (editando) {
    return (
      <div className="card card-edicao">
        <h3 className="card-titulo">Editar personagem</h3>
        <label className="card-campo"><span>Nome</span><input value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label className="card-campo"><span>Poder (0 a 100)</span><input type="number" min="0" max="100" value={energia} onChange={(e) => setEnergia(e.target.value)} /></label>
        <label className="card-campo"><span>Personalidade</span><input value={personalidade} onChange={(e) => setPersonalidade(e.target.value)} /></label>
        {erro && <p className="mensagem-erro">{erro}</p>}
        <div className="card-acoes">
          <button onClick={salvar}><i className="fa-solid fa-check" /> Salvar</button>
          <button className="botao-secundario" onClick={cancelar}><i className="fa-solid fa-xmark" /> Cancelar</button>
        </div>
      </div>
    );
  }

  const temImagem = personagem.imagem && !imagemComErro;

  return (
    <article className={adotado ? "card card-adotado" : "card"}>
      {/* Imagem do personagem ou inicial como fallback. */}
      <div className={`card-imagem raridade-${paraClasse(personagem.raridade)}`}>
        {temImagem ? (
          <img src={personagem.imagem} alt={`Imagem de ${personagem.nome}`} onError={() => setImagemComErro(true)} />
        ) : (
          <span className="card-inicial" aria-hidden="true">{personagem.nome.charAt(0).toUpperCase()}</span>
        )}
        <span className={`selo selo-raridade raridade-${paraClasse(personagem.raridade)}`}>{personagem.raridade}</span>
      </div>

      <div className="card-corpo">
        {/* Informações principais do personagem. */}
        <div className="card-cabecalho">
          <div>
            <h3 className="card-titulo">{personagem.nome}</h3>
            <p className="card-subtitulo">{personagem.obra}</p>
          </div>
          <button
            className="botao-icone favorito"
            onClick={() => onFavoritar(personagem.id)}
            aria-label={personagem.favorito ? "Desfavoritar personagem" : "Favoritar personagem"}
            title={personagem.favorito ? "Desfavoritar" : "Favoritar"}
          >
            <i className={`fa-${personagem.favorito ? "solid" : "regular"} fa-heart`} />
          </button>
        </div>

        <span className={`selo status-${paraClasse(personagem.status)}`}>{personagem.status}</span>

        <div className="card-poder">
          <span>Poder: {personagem.energia}/100</span>
          <progress className="barra-poder" value={personagem.energia} max="100" />
        </div>

        {/* Detalhes extras ficam escondidos até o usuário solicitar. */}
        {mostrarDetalhes && (
          <div className="card-detalhes">
            <p><strong>Espécie:</strong> {personagem.especie}</p>
            <p><strong>Personalidade:</strong> {personagem.personalidade}</p>
            <p><strong>Raridade:</strong> {personagem.raridade}</p>
            <p><strong>Obra:</strong> {personagem.obra}</p>
          </div>
        )}

        {/* Ações principais do personagem. */}
        <div className="card-acoes">
          <button disabled={adotado} onClick={() => onAdotar(personagem.id)}>
            <i className="fa-solid fa-heart" /> {adotado ? "Adotado" : "Adotar"}
          </button>
          <button className="botao-secundario" onClick={() => onInteragir(personagem.id)}>
            <i className="fa-solid fa-hand" /> Interagir
          </button>
          <button className="botao-secundario" onClick={() => setMostrarDetalhes((aberto) => !aberto)}>
            <i className={`fa-solid ${mostrarDetalhes ? "fa-chevron-up" : "fa-circle-info"}`} /> {mostrarDetalhes ? "Ocultar" : "Detalhes"}
          </button>
          <button className="botao-secundario" onClick={() => setEditando(true)}>
            <i className="fa-solid fa-pen" /> Editar
          </button>
          <button className="botao-perigo" onClick={() => onRemover(personagem.id)}>
            <i className="fa-solid fa-trash" /> Remover
          </button>
        </div>
      </div>
    </article>
  );
}

export default PersonagemCard;
