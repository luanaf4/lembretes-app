// lembretes e formulário
const addForm = document.querySelector('#addForm');
const lembretesContainer = document.querySelector('#lembretesContainer');

// listas de lembretes
const lembretesPorData = {};

// função para adicionar novo lembrete
function addLembrete(nome, data) {
    // verifica se a data fornecida é futura
    const agora = new Date();
    const dataLembrete = new Date(data);
    if (dataLembrete < agora) {
        alert('Por favor, escolha uma data futura para o lembrete.');
        return;
    }

    const lembrete = document.createElement('div');
    lembrete.classList.add('lembrete');

    // adiciona data e nome ao elemento
    const nomeElem = document.createElement('span');
    nomeElem.classList.add('lembrete__nome');
    nomeElem.textContent = nome;
    const dataElem = document.createElement('span');
    dataElem.classList.add('lembrete__data');
    dataElem.textContent = data;

    // botão para excluir lembrete
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('lembrete__delete');
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', () => {
        lembrete.remove();
        const lembretesParaData = lembretesPorData[data];
    if (lembretesParaData && lembretesParaData.children.length === 0) {
      lembretesParaData.parentNode.removeChild(lembretesParaData);
      delete lembretesPorData[data];
        }
    });

    lembrete.appendChild(nomeElem);
    lembrete.appendChild(dataElem);
    lembrete.appendChild(deleteButton);

    // cria uma lista nova ou adiciona o lembrete à uma lista que já existe
    let lembretesParaData = lembretesPorData[data];
    if (!lembretesParaData) {
        lembretesParaData = document.createElement('div');
        lembretesParaData.classList.add('lembretesPorData');
        const dataHeader = document.createElement('h2');
        dataHeader.textContent = data;
        lembretesParaData.appendChild(dataHeader);
        lembretesPorData[data] = lembretesParaData;
        // insere a nova lista de lembretes em ordem cronológica
        let listaExistente = lembretesContainer.firstChild;
        while (listaExistente && new Date(listaExistente.querySelector('.lembrete__data').textContent) < dataLembrete) {
            listaExistente = listaExistente.nextSibling;
        }
        lembretesContainer.insertBefore(lembretesParaData, listaExistente);
    }

    // insere o novo lembrete na lista de lembretes para a data fornecida
    lembretesParaData.appendChild(lembrete);
}


// submissão do forulário de adição de lembrete
addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = event.target.nome.value;
    const data = event.target.data.value;
    addLembrete(nome, data);
    event.target.reset();
});
