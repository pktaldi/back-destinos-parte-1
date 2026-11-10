//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-destinos");
const modelo = document.querySelector("#modelo-destino");

const apiKey="cv_eA_cFlWmlv_WbxYCM7cCoZmmlNdT35JSaqLNbHKi3aMUpRWRbO59fC1KunRtdHCt";
const apiUrl="https://api-ds.codeverse.dev.br/api/destinos";

//Funcao que busca todos os herois da API

async function buscarDestinos() {
  resposta.textContent = "Carregando os destinos..."

  try {
    //Fazer uma requisicao GET para buscar os herois
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os destinos")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os herois e montar o heroi.

    for (const destino of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".local").textContent = destino.title;
      card.querySelector(".pais").textContent = destino.pais;
      card.querySelector(".tipo").textContent = destino.tipo_destino;
      card.querySelector(".epoca").textContent = destino.melhor_epoca;
      card.querySelector(".custo").textContent = destino.custo_medio;

      const imagem = card.querySelector("img");

      if(destino.imageUrl){
        imagem.src = destino.imageUrl;
        imagem.alt =  destino.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os destinos. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarDestinos();