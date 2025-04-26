import { useState } from "react";
import './index.css'; // Importa o CSS

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const calcularIMC = () => {
    setErro("");

    if (!peso || !altura) {
      setErro("Por favor, preencha todos os campos.");
      setResultado(null);
      return;
    }

    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setErro("Insira valores numéricos válidos.");
      setResultado(null);
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      setErro("Peso e altura devem ser maiores que zero.");
      setResultado(null);
      return;
    }

    const alturaEmMetros = alturaNum >= 3 ? alturaNum / 100 : alturaNum;
    const imc = pesoNum / (alturaEmMetros * alturaEmMetros);
    setResultado(parseFloat(imc.toFixed(2)));
  };

  // NOVA função para limpar tudo
  const limparCampos = () => {
    setPeso("");
    setAltura("");
    setResultado(null);
    setErro("");
  };

  const getClassificacaoIMC = (imc) => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau 1";
    if (imc < 40) return "Obesidade grau 2";
    return "Obesidade grau 3";
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>

      <label>Peso (kg):</label>
      <input
        type="text"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <label>Altura (m ou cm):</label>
      <input
        type="text"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />

      {/* Botão novo para limpar */}
      <div className="botoes">
  <button onClick={calcularIMC} className="botao-calcular">
    Calcular IMC
  </button>

  <button onClick={limparCampos} className="botao-limpar">
    Limpar
  </button>
</div>

      {erro && <p className="erro">{erro}</p>}

      {resultado !== null && (
  <div className="resultado fade-in">
    <p>Seu IMC é: <strong>{resultado}</strong></p>
    <p>Classificação: <strong>{getClassificacaoIMC(resultado)}</strong></p>
  </div>
)}
    </div>
  );
}
