import { useState } from "react";
import "./PersonagemForm.css";

function PersonagemForm({ onCadastrar }) {
  const [nome, setNome] = useState("");
  const [obra, setObra] = useState("");
  const [especie, setEspecie] = useState("Super");
  const [energia, setEnergia] = useState(50);
  const [personalidade, setPersonalidade] = useState("");
  const [raridade, setRaridade] = useState("Comum");
  const [erro, setErro] = useState("");

  /* Lógica de cadastrar: valida os campos antes de enviar ao App. */
  function enviar(e) {
    e.preventDefault();

    if (!nome.trim() || !obra.trim() || !personalidade.trim()) {
      setErro("Preencha nome, obra e personalidade.");
      return;
    }

    if (Number(energia) < 0 || Number(energia) > 100) {
      setErro("O poder deve estar entre 0 e 100.");
      return;
    }

    const erroDoApp = onCadastrar({
      nome: nome.trim(),
      obra: obra.trim(),
      especie,
      energia: Number(energia),
      personalidade: personalidade.trim(),
      raridade,
      status: "Disponível",
      imagem: "",
    });

    if (erroDoApp) {
      setErro(erroDoApp);
      return;
    }

    setErro("");
    setNome("");
    setObra("");
    setEspecie("Super");
    setPersonalidade("");
    setEnergia(50);
    setRaridade("Comum");
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2 className="formulario-titulo">Novo personagem</h2>

      <label className="formulario-campo">
        <span>Nome</span>
        <input placeholder="Ex.: Luz-Estrela" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>

      <label className="formulario-campo">
        <span>Obra / Universo</span>
        <input placeholder="Ex.: The Boys" value={obra} onChange={(e) => setObra(e.target.value)} required />
      </label>

      <div className="formulario-linha">
        <label className="formulario-campo">
          <span>Espécie</span>
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option>Super</option>
            <option>Humano</option>
            <option>Vampiro</option>
            <option>Lobisomem</option>
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
        <input type="number" min="0" max="100" value={energia} onChange={(e) => setEnergia(e.target.value)} required />
      </label>

      <label className="formulario-campo">
        <span>Personalidade</span>
        <input placeholder="Ex.: Corajosa" value={personalidade} onChange={(e) => setPersonalidade(e.target.value)} required />
      </label>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button className="formulario-botao" type="submit">Cadastrar</button>
    </form>
  );
}

export default PersonagemForm;
