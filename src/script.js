const form = document.querySelector("#addForm");
const lembretesContainer = document.querySelector("#lembretesContainer");

let lembretes = [];

// objeto de lembrete
function Lembrete(nome, data) {
    this.nome = nome;
    this.data = data;
}

// valida os campos do formulário
function validarCampos(nome, data) {
    if (nome === "" || data === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }
    const dataAtual = new Date();
    const dataSelecionada = new Date(data);
    if (dataSelecionada.getTime() <= dataAtual.getTime()) {
        alert("Por favor, selecione uma data válida no futuro.");
        return false;
    }
    return true;
}

// adiciona um novo lembrete à lista de lembretes
function adicionarLembrete(nome, data) {
    const lembrete = new Lembrete(nome, data);
    lembretes.push(lembrete);
    lembretes.sort((a, b) => new Date(a.data) - new Date(b.data));
    atualizarLembretes();
}

// exclui um lembrete da lista de lembretes
function excluirLembrete(index) {
    lembretes.splice(index, 1);
    atualizarLembretes();
}

// exibe a lista de lembretes atualizada na página HTML
function atualizarLembretes() {
    // limpa o container de lembretes
    lembretesContainer.innerHTML = "";

    // itera sobre os lembretes em ordem cronológica e exibe cada um na data correspondente
    lembretes.forEach((lembrete, index) => {
        const dataFormatada = new Date(lembrete.data).toLocaleDateString();
        const container = document.createElement("div");
        container.classList.add("lembrete-container");
        const header = document.createElement("h2");
        header.innerText = dataFormatada;
        container.appendChild(header);
        const lembreteElement = document.createElement("div");
        lembreteElement.classList.add("lembrete");
        const nome = document.createElement("h3");
        nome.innerText = lembrete.nome;
        const excluirBotao = document.createElement("button");
        excluirBotao.innerText = "Excluir";
        excluirBotao.addEventListener("click", () => {
            excluirLembrete(index);
        });
        lembreteElement.appendChild(nome);
        lembreteElement.appendChild(excluirBotao);
        container.appendChild(lembreteElement);
        lembretesContainer.appendChild(container);
    });
}

// evento de envio do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const data = document.querySelector("#data").value;
    if (validarCampos(nome, data)) {
        adicionarLembrete(nome, data);
        form.reset();
    }
});
// inicializa a lista de lembretes a partir do armazenamento local
function inicializarLembretes() {
    const lembretesJSON = localStorage.getItem("lembretes");
    if (lembretesJSON !== null) {
        lembretes = JSON.parse(lembretesJSON);
        atualizarLembretes();
    }
}

// salva a lista de lembretes no armazenamento local
function salvarLembretes() {
    localStorage.setItem("lembretes", JSON.stringify(lembretes));
}

// evento de fechamento da página
window.addEventListener("beforeunload", () => {
    salvarLembretes();
});

// inicializa a lista de lembretes
inicializarLembretes();