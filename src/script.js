// seleciona o formulário e o contêiner da lista de lembretes
const addForm = document.querySelector('#addForm');
const lembretesContainer = document.querySelector('#lembretesContainer');

// cria um objeto para manter as listas de lembretes por data
const lembretesPorData = {};

// adiciona um novo lembrete à lista
function addLembrete(nome, data) {
  // verifica se a data fornecida é futura
  const agora = new Date();
  const dataLembrete = new Date(data);
  if (dataLembrete < agora) {
    alert('Por favor, escolha uma data futura para o lembrete.');
    return;
  }

  // cria um novo elemento de lembrete
  const lembrete = document.createElement('div');
  lembrete.classList.add('lembrete');

  // cria os elementos de nome e data do lembrete
  const nomeElem = document.createElement('span');
  nomeElem.classList.add('lembrete__nome');
  nomeElem.textContent = nome;
  const dataElem = document.createElement('span');
  dataElem.classList.add('lembrete__data');
  dataElem.textContent = data;

  // cria o botão de exclusão do lembrete
  const deleteButton = document.createElement('span');
  deleteButton.classList.add('lembrete__delete');
  deleteButton.innerHTML = '&times;';
  deleteButton.addEventListener('click', () => {
    lembrete.remove();
  });

  // adiciona os elementos ao lembrete
  lembrete.appendChild(nomeElem);
  lembrete.appendChild(dataElem);
  lembrete.appendChild(deleteButton);

  // encontra a lista de lembretes para a data fornecida, ou cria uma nova
  let lembretesParaData = lembretesPorData[data];
  if (!lembretesParaData) {
    lembretesParaData = document.createElement('div');
    lembretesParaData.classList.add('lembretesPorData');
    const dataHeader = document.createElement('h2');
    dataHeader.textContent = data;
    lembretesParaData.appendChild(dataHeader);
    lembretesPorData[data] = lembretesParaData;
    // insere a nova lista de lembretes na ordem correta
    let listaExistente = lembretesContainer.firstChild;
    while (listaExistente && new Date(listaExistente.querySelector('.lembrete__data').textContent) < dataLembrete) {
      listaExistente = listaExistente.nextSibling;
    }
    lembretesContainer.insertBefore(lembretesParaData, listaExistente);
  }

  // insere o novo lembrete na lista de lembretes para a data fornecida
  lembretesParaData.appendChild(lembrete);
}

// lida com a submissão do formulário de adição de lembrete
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = event.target.nome.value;
  const data = event.target.data.value;
  addLembrete(nome, data);
  event.target.reset();
});
