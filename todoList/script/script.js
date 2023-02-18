/* 
GUIA
  [x] gerar a entrada de texto e o botão para adicionar as tarefas
  [x] adicionar os valores da entrada em um array
  [x] gerar uma lista com os elemementos do array
  [x] adicionar o botão de excluir
  [x] adicionar o botão de editar
  [ ] adicionar verificação de entrada vazia
  [ ]
*/

// seleciona o elemento <input> do tipo texto
const input = document.querySelector('input[type="text"]');
// seleciona o botão da página
const button = document.querySelector('button');
// seleciona o elemento <ul> (lista não ordenada) da página
const list = document.querySelector('#list');
// cria uma matriz vazia para armazenar os itens da lista
let array = [];

// adiciona um "event listener" (ouvidor de eventos) ao botão
button.addEventListener('click', () => {
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
});
