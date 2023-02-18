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
const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button');
const list = document.querySelector('#list');
let array = [];

button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    array.push(input.value);
    input.value = '';

    const div = document.createElement('div');

    const span = document.createElement('span');
    span.textContent = array[array.length - 1];
    div.appendChild(span);

    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = 'Excluir';
    buttonDelete.addEventListener('click', () => {
      div.remove();
      array.splice(array.indexOf(span.textContent), 1);
    });
    div.appendChild(buttonDelete);

    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Editar';
    buttonEdit.addEventListener('click', () => {
      const text = prompt("Digite o novo texto para o item da lista:", span.textContent);
      if (text !== null) {
        span.textContent = text;
        array[array.indexOf(span.textContent)] = text;
      }
    });
    div.appendChild(buttonEdit);

    const buttonAddSubtask = document.createElement('button');
    buttonAddSubtask.textContent = 'Adicionar Subtarefa';
    buttonAddSubtask.addEventListener('click', () => {
      const subtaskText = prompt("Digite o texto da subtarefa:");
      if (subtaskText !== null && subtaskText.trim() !== '') {
        const subtaskSpan = document.createElement('span');
        subtaskSpan.textContent = '- ' + subtaskText;
        div.appendChild(subtaskSpan);
      }
    });
    div.appendChild(buttonAddSubtask);

    div.addEventListener('click', () => {
      input.focus();
    });

    list.appendChild(div);
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (document.activeElement === input) {
      event.preventDefault();
      button.click();
    } else {
      input.focus();
    }
  }
});
