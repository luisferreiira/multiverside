import { useState } from "react";
import "./PersonagemForm.css";

function PersonagemForm({ onCadastrar }) {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("Super");
  const [energia, setEnergia] = useState(50);
  const [personalidade, setPersonalidade] = useState("");
  const [raridade, setRaridade] = useState("Comum");
  const [erro, setErro] = useState("");

  function enviar(e) {
    e.preventDefault();

    if (nome.trim() === "" || personalidade.trim() === "") {
      setErro("Preencha nome e personalidade.");
      return;
    }
    if (energia < 0 || energia > 100) {
      setErro("O poder deve estar entre 0 e 100.");
      return;
    }

    const erroDoApp = onCadastrar({
      nome: nome.trim(),
      especie,
      energia: Number(energia),
      personalidade: personalidade.trim(),
      raridade,
      status: "Disponível",
      imagem: "",
      obra: "The Boys",
    });

    if (erroDoApp) {
      setErro(erroDoApp);
      return;
    }

    setErro("");
    setNome("");
    setPersonalidade("");
    setEnergia(50);
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2 className="formulario-titulo">Novo personagem</h2>

      <label className="formulario-campo">
        <span>Nome</span>
        <input
          placeholder="Ex.: Starlight"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <div className="formulario-linha">
        <label className="formulario-campo">
          <span>Espécie</span>
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option>Super</option>
            <option>Humano</option>
          </select>
        </label>

        <label className="formulario-campo">
          <span>Raridade</span>
          <select value={raridade} onChange={(e) => setRaridade(e.target.value)}>
            <option>Comum</option>
            <option>Raro</option>
            <option>Épico</option>
            <option>Lendário</option>
          </select>
        </label>
      </div>

      <label className="formulario-campo">
        <span>Poder (0 a 100)</span>
        <input
          type="number"
          value={energia}
          onChange={(e) => setEnergia(e.target.value)}
        />
      </label>

      <label className="formulario-campo">
        <span>Personalidade</span>
        <input
          placeholder="Ex.: Corajosa"
          value={personalidade}
          onChange={(e) => setPersonalidade(e.target.value)}
        />
      </label>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button className="formulario-botao" type="submit">
        Cadastrar
      </button>
    </form>
  );
}

export default PersonagemForm;