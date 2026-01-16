const fluxos = {
  casamento: [
    { label: "Data do casamento:", name: "data", type: "date" },
    { label: "Formato:", name: "formato", type: "select", options: ["Cerimônia", "Festa", "Ambos"] },
    { label: "Convidados:", name: "convidados", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ],
  reels: [
    { label: "Nome da marca:", name: "marca", type: "text" },
    { label: "Objetivo:", name: "objetivo", type: "select", options: ["Engajamento", "Vendas", "Autoridade"] },
    { label: "Quantidade de vídeos:", name: "quantidade", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ],
  Aereo: [
    { label: "Local:", name: "local", type: "text" },
    { label: "Data:", name: "data", type: "date" },
    { label: "Área:", name: "area", type: "select", options: ["Urbana", "Rural"] },
    { label: "Descreva brevemente::", name: "descricao", type: "textarea" }
  ],
  evento: [
    { label: "Tipo de evento:", name: "tipo", type: "select", options: ["Aniversário", "Formatura", "Corporativo", "Esportivo"] },
    { label: "Data:", name: "data", type: "date" },
    { label: "Duração (horas):", name: "duracao", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {

  const mensagens = document.getElementById("mensagens");
  const inputArea = document.getElementById("input-area");


  let servico = null;
  let passo = 0;
  const respostas = {};


  function perguntarServico() {
    botMsg("Qual serviço você deseja contratar?");

    const select = document.createElement("select");
    select.innerHTML = `
      <option value="">Selecione</option>
      <option value="casamento">Casamento</option>
      <option value="reels">Produção de Reels</option>
      <option value="Aereo">Vídeo Aéreo</option>
      <option value="evento">Evento</option>
    `;

    const btn = document.createElement("button");
    btn.innerText = "Continuar";

    btn.onclick = () => {
      if (!select.value) return;
      servico = select.value;
      userMsg(select.options[select.selectedIndex].text);
      inputArea.innerHTML = "";
      passo = 0;
      proximaPergunta();
    };

    inputArea.innerHTML = "";
    inputArea.append(select, btn);
  }


  //delay de mensagem

  function botMsg(texto, delay = 600) {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "msg bot";
      div.innerText = texto;
      mensagens.appendChild(div);
      mensagens.scrollTop = mensagens.scrollHeight;
    }, delay);
  }

  function userMsg(texto) {
    const div = document.createElement("div");
    div.className = "msg user";
    div.innerText = texto;
    mensagens.appendChild(div);
    mensagens.scrollTop = mensagens.scrollHeight;
  }

  //funcionamento de perguntas

  function proximaPergunta() {
    const pergunta = fluxos[servico][passo];
    if (!pergunta) return finalizar();

    botMsg(pergunta.label);
    renderInput(pergunta);
  }


  //inputs dinamicos

  function renderInput(campo) {
    inputArea.innerHTML = "";

    let input;

    if (campo.type === "select") {
      input = document.createElement("select");
      campo.options.forEach(options => {
        const o = document.createElement("option");
        o.value = options;
        o.innerText = options;
        input.appendChild(o);
      });
    } else if (campo.type === "textarea") {
      input = document.createElement("textarea");
    } else {
      input = document.createElement("input");
      input.type = campo.type;
    }

    const btn = document.createElement("button");
    btn.innerText = "Enviar";

    btn.onclick = () => {
      if (!input.value) return;

      respostas[campo.label] = input.value;
      userMsg(input.value);
      passo++;
      inputArea.innerHTML = "";
      proximaPergunta();
    };

    inputArea.append(input, btn);
  }


  //envio para whatsapp

  function finalizar() {
    const numero_enviar = "5587996394734";
    let texto = "Olá! Quero contratar um serviço Saints:%0A";
    texto += `%0AServiço: ${servico}%0A`;

    for (const k in respostas) {
      texto += `${k} ${respostas[k]}%0A`;
    }

    window.open(
      `https://wa.me/${numero_enviar}?text=${texto}`,
      "_blank"
    );
  }


  //abrir e fechar o chat

  const toggleChat = document.getElementById("chat-toggle");
  const chat = document.querySelector(".chat-atendimento");
  const closeChat = document.getElementById("close-chat");


  toggleChat.addEventListener("click", () => {
    chat.classList.toggle("open");


    if (chat.classList.contains("open") && mensagens.children.length === 0) {
      botMsg("Olá! Bem-vindo ao atendimento da Saints");
      perguntarServico();
    }
    closeChat.onclick = () => chat.classList.remove("open");
  });



});

