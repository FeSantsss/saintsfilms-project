const casamento = [
  { label: "Data do casamento", name: "data", type: "date" },
  { label: "Formato", name: "formato", type: "select", options: ["Cerimônia", "Festa", "Ambos"] },
  { label: "Convidados", name: "convidados", type: "number" },
  { label: "Descreva brevemente", name: "descricao", type: "textarea" }

];

const reels = [
  { label: "Nome da marca", name: "marca", type: "text" },
  { label: "Objetivo", name: "objetivo", type: "select", options: ["Engajamento", "Vendas", "Autoridade"] },
  { label: "Quantidade de vídeos", name: "quantidade", type: "number" },
  { label: "Descreva brevemente", name: "descricao", type: "textarea" }

];

const videoAereo = [
  { label: "Local", name: "local", type: "text" },
  { label: "Data", name: "data", type: "date" },
  { label: "Área", name: "area", type: "select", options: ["Urbana", "Rural"] },
  { label: "Descreva brevemente", name: "descricao", type: "textarea" }

];

const evento = [
  { label: "Tipo de evento", name: "tipo", type: "select", options: ["Aniversário", "Formatura", "Corporativo", "Esportivo"] },
  { label: "Data", name: "data", type: "date" },
  { label: "Duração (horas)", name: "duracao", type: "number" },
  { label: "Descreva brevemente", name: "descricao", type: "textarea" }
];

const perguntas = {
  casamento,
  reels,
  videoAereo,
  evento
};

const servicoSelect = document.getElementById("servico");
const form = document.getElementById("formulario");

let servicoAtual = "";

servicoSelect.addEventListener("change", () => {
  servicoAtual = servicoSelect.value;
  renderForm(servicoAtual);
});

function renderForm(servico) {
  form.innerHTML = "";

  if (!perguntas[servico]) return;

  perguntas[servico].forEach(campo => {
    const wrapper = document.createElement("div");
    wrapper.className = "campo";

    const label = document.createElement("label");
    label.textContent = campo.label;

    let input;

    if (campo.type === "select") {
      input = document.createElement("select");

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Selecione";
      placeholder.disabled = true;
      placeholder.selected = true;

      input.appendChild(placeholder);

      campo.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
    } else if (campo.type === "textarea") {
      input = document.createElement("textarea")
      input.type = campo.type;
    } else {
      input = document.createElement("input");
      input.type = campo.type;
    }

    input.name = campo.name;
    input.required = true;

    wrapper.append(label, input);
    form.appendChild(wrapper);
  });
}



function enviar() {
  if (!servicoAtual) {
    alert("Selecione um serviço.");
    return;
  }

  const campos = form.querySelectorAll("input, select, textarea");

  for (const campo of campos) {
    if (!campo.value) {
      campo.focus();
      return;
    }
  }

  let mensagem = `Olá! gostaria de fazer um Movimento Saints.%0A`;
  mensagem += `%0AServiço: ${servicoAtual}%0A`;

  campos.forEach(campo => {
    const label = campo.previousElementSibling.textContent;
    mensagem += `${label}: ${campo.value}%0A`;
  });

  const telefone = "5587996394734";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}


const toggleChat = document.getElementById("chat-toggle");
const chat = document.querySelector(".chat-orçamento");

toggleChat.addEventListener("click", (e) => {
  e.stopPropagation();
  chat.classList.toggle("clicked");
});

chat.addEventListener("click", (e) => {
  e.stopPropagation(); 
});

document.addEventListener("click", () => {
  if (chat.classList.contains("clicked")) {
    chat.classList.remove("clicked");
  }
});


