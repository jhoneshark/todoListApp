// seleciona o elemento <input> do tipo texto
const input = document.querySelector('input[type="text"]');
// seleciona o botão da página bn
const button = document.querySelector('button');
// seleciona o elemento <ul> (lista não ordenada) da página
const list = document.querySelector('#list');
// cria uma matriz vazia para armazenar os itens da lista
let array = [];

// adiciona um "event listener" (ouvidor de eventos) ao botão
button.addEventListener('click', () => {

  if (input.value.trim() === '') {
    // se estiver vazio, exibe uma mensagem para o usuário
    alert('Por favor, insira um valor na entrada de texto.');
    return; // interrompe a execução do código
  } else {
  // adiciona o valor do elemento <input> à matriz de itens
  array.push(input.value);
  // limpa o valor do elemento <input>
  input.value = '';

  // cria uma nova <div> para o novo item da lista
  const div = document.createElement('div');
  
  // cria um <span> para exibir o texto do item da lista
  const span = document.createElement('span');
  span.textContent = array[array.length - 1];
  // adiciona o <span> à <div>
  div.appendChild(span);
  
  // cria um botão "Excluir" para remover o item da lista
  const buttonDelete = document.createElement('button');
  buttonDelete.textContent = 'Excluir';
  buttonDelete.addEventListener('click', () => {
      // remove a <div> do item da lista
      div.remove(); 
      // remove o item da matriz de itens
      array.splice(array.indexOf(span.textContent), 1); 
  });
  // adiciona o botão "Excluir" à <div>
  div.appendChild(buttonDelete);
  
  // cria um botão "Editar" para editar o texto do item da lista
  const buttonEdit = document.createElement('button');
  buttonEdit.textContent = 'Editar';
  buttonEdit.addEventListener('click', () => {
      // exibe um prompt para o usuário editar o texto do item da lista
      const text = prompt("Digite o novo texto para o item da lista:", span.textContent);
      // se o usuário clicar em OK e digitar um novo texto, atualiza o texto do <span> e da matriz de itens
      if (text !== null) {
        span.textContent = text;
        array[array.indexOf(span.textContent)] = text;
      }
  });
  // adiciona o botão "Editar" à <div>
  div.appendChild(buttonEdit);

  // adiciona a <div> à lista não ordenada
  list.appendChild(div);
}});

// adiciona um "event listener" (ouvidor de eventos) à entrada de texto
input.addEventListener('keydown', (event) => {
  // verifica se a tecla pressionada foi a tecla Enter
  if (event.keyCode === 13) {
    // evita que a tecla Enter seja inserida no campo de entrada
    event.preventDefault();
    // executa o mesmo código que é executado quando o botão é clicado
    button.click();
  }
});

// adiciona um event listener para o evento "keydown" no elemento <body>
document.querySelector('body').addEventListener('keydown', (event) => {
  // verifica se a tecla pressionada é a tecla "enter"
  if (event.key === 'Enter') {
    // dá o foco para o campo de texto
    input.focus();
  }
});
