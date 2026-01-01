const botao = document.getElementById("btnConverter");
const resultadoDiv = document.getElementById("resultado");

botao.addEventListener("click", converter);

async function converter() {
    const valor = parseFloat(document.getElementById("valor").value);
    const origem = document.getElementById("moedaOrigem").value;
    const destino = document.getElementById("moedaDestino").value;

    if (isNaN(valor) || valor <= 0) {
        resultadoDiv.innerText = "Digite um valor válido";
        return;
    }

    if (origem === destino) {
        resultadoDiv.innerText = `Resultado: ${valor.toFixed(2)} ${destino}`;
        return;
    }

    resultadoDiv.innerText = "Convertendo...";

    try {
        const response = await fetch(
            "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
        );
        const data = await response.json();

        const dolar = parseFloat(data.USDBRL.bid);
        const euro = parseFloat(data.EURBRL.bid);

        let resultado;

        // BRL -> USD / EUR
        if (origem === "BRL" && destino === "USD") {
            resultado = valor / dolar;
        } 
        else if (origem === "BRL" && destino === "EUR") {
            resultado = valor / euro;
        }
        // USD / EUR -> BRL
        else if (origem === "USD" && destino === "BRL") {
            resultado = valor * dolar;
        } 
        else if (origem === "EUR" && destino === "BRL") {
            resultado = valor * euro;
        }
        // USD <-> EUR
        else if (origem === "USD" && destino === "EUR") {
            resultado = (valor * dolar) / euro;
        } 
        else if (origem === "EUR" && destino === "USD") {
            resultado = (valor * euro) / dolar;
        }

        resultadoDiv.innerText =
            `Resultado: ${resultado.toFixed(2)} ${destino}`;

    } catch (erro) {
        resultadoDiv.innerText = "Erro ao buscar cotação 😕";
        console.error(erro);
    }
}
