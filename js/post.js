// 1 . Selecionar os elementos do html
// Que vai ser o forms
const form = document.querySelector("#form-destino");

const resposta = document.querySelector("#resposta");

// 2 . Comunicacao com a API
// Lembrete o codeverse tem APIKey ou seja senha nas req.

const apiKey = "cv_SyGFypSXJOxuZXPEh1lG01-yPI_WZS1pa4II118zaaQLMfAdh0EVvJsJlbW0F81G";

// Tem que falar o link (endpoint)
const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";

// 3. Capturar o evento de click do form

form.addEventListener("submit", async function (event) {
  
  //impede o comportamento padrao do forms, recarregar ou navegar para outra pagina automaticamente.
  event.preventDefault();

  //pegar os dados do form.

  const dados =  new FormData(form);

  //organizar esse objeto e  montar

  const destino = {
      title: dados.get("title"),
      pais: dados.get("pais"),
      tipo_destino: dados.get("tipo_destino"),
      melhor_epoca: dados.get("melhor_epoca"),
      custo_medio: dados.get("custo_medio"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando destino para a API....";

// 5 . Enviando a req para a API.

//trycatch é um bloco do js que executa alguma coisa que pode ter erros.
// caso aconteça um erro, (qq tipo) o bloco catch trata esse erro.

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },

    //enviar os dados

    body: JSON.stringify(destino),
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
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})

destino