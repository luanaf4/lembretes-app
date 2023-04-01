// seleciona o formulário e o contêiner da lista de lembretes
const addForm = document.querySelector('#addForm');
const lembretesContainer = document.querySelector('#lembretesContainer');

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

  // encontra o primeiro lembrete com data maior ou igual à do novo lembrete
  let lembreteExistente = lembretesContainer.firstChild;
  while (lembreteExistente && new Date(lembreteExistente.querySelector('.lembrete__data').textContent) < dataLembrete) {
    lembreteExistente = lembreteExistente.nextSibling;
  }

  // insere o novo lembrete antes do lembreteExistente (ou no final, se não houver nenhum lembrete com data maior ou igual)
  lembretesContainer.insertBefore(lembrete, lembreteExistente);
}

// lida com a submissão do formulário de adição de lembrete
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = event.target.nome.value;
  const data = event.target.data.value;
  addLembrete(nome, data);
  event.target.reset();
});
