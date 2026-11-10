const from = document.querySelector("#from-destino");
const resposta = document.querySelector("#resposta");
const apiKey = "cv_eA_cFlWmlv_WbxYCM7cCoZmmlNdT35JSaqLNbHKi3aMUpRWRbO59fC1KunRtdHCt";
const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";

from.addEventListener("submit", async function (event) {
    event.preventDefault();
    const dados = new FormData(from);

    const destino = {
        title: dados.get("title"),
        pais: dados.get("pais"),
        tipoDestino: dados.get("tipoDestino"),
        melhorEpoca: dados.get("melhorEpoca"),
        custoMedio: dados.get("custoMedio"),
        imageUrl: dados.get("imageUrl") || null
    }
    resposta.textContent = 'Enviando destino para a API...';

    try {
        const respostaApi = await fetch (apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify(destino)
        });
        const texto = await respostaApi.text();
        let resultado;
        try {
            resultado = texto ? JSON.parse(texto) : {};
        } catch (error) {
            resultado = error;
            return;
        }

        if(respostaApi.ok){
            resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
            from.reset();
        }
    } catch (error) {
        console.error(error);
    }
})

