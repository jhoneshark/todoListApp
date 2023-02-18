/* 
GUIA
  [x] gerar a entrada de texto e o botão para adicionar as tarefas
  [x] adicionar os valores da entrada em um array
  [x] gerar uma lista com os elemementos do array
  [x] adicionar o botão de excluir
  [x] adicionar o botão de editar
  [ ] adicionar verificação de entrada vazia
  [ ]

REFATORAÇÃO
  [ ] Dividir os eventos em funções menores
  [ ] Usar nomes de variáveis descritivos
  [ ] Adicionar comentários explicativos
  [ ] Usar recursos de linguagem modernos: arrow functions, templates literals, spread operators e destructuring
  [ ] Implementação de TDD
        - adição
        - exclusão
        - edição
        - adição de subtarefa
        - foco no campor de entrada
  [ ] Uso de bibliotecas*
*/


const inputField = document.querySelector('input[type="text"]');
const addButton = document.querySelector('button');
const listContainer = document.querySelector('#list');
let taskArray = [];

function addTask() {
  const taskInput = inputField.value.trim();

  if (taskInput !== '') {
    taskArray.push(taskInput);
    inputField.value = '';

    const taskDiv = createTaskElement(taskInput);
    listContainer.appendChild(taskDiv);
  }
}

function createTaskElement(taskText) {
  const taskDiv = document.createElement('div');
  const taskTextSpan = document.createElement('span');
  const deleteButton = createTaskButton('Excluir', deleteTask);
  const editButton = createTaskButton('Editar', editTask);
  const addSubtaskButton = createTaskButton('Adicionar Subtarefa', addSubtask);

  taskTextSpan.textContent = taskText;

  taskDiv.appendChild(taskTextSpan);
  taskDiv.appendChild(deleteButton);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(addSubtaskButton);

  taskDiv.addEventListener('click', () => {
    inputField.focus();
  });

  return taskDiv;
}

function createTaskButton(buttonText, eventFunction) {
  const button = document.createElement('button');
  button.textContent = buttonText;
  button.addEventListener('click', eventFunction);

  return button;
}

function deleteTask() {
  const taskDiv = this.parentElement;
  const taskIndex = taskArray.indexOf(taskDiv.querySelector('span').textContent);

  taskDiv.remove();
  taskArray.splice(taskIndex, 1);
}

function editTask() {
  const taskDiv = this.parentElement;
  const taskTextSpan = taskDiv.querySelector('span');
  const newText = prompt("Digite o novo texto para o item da lista:", taskTextSpan.textContent);

  if (newText !== null) {
    taskTextSpan.textContent = newText;
    taskArray[taskArray.indexOf(taskTextSpan.textContent)] = newText;
  }
}

function addSubtask() {
  const taskDiv = this.parentElement;
  const subtaskText = prompt("Digite o texto da subtarefa:");

  if (subtaskText !== null && subtaskText.trim() !== '') {
    const subtaskSpan = document.createElement('span');
    subtaskSpan.textContent = '- ' + subtaskText;
    taskDiv.appendChild(subtaskSpan);
  }
}

addButton.addEventListener('click', addTask);

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (document.activeElement === inputField) {
      event.preventDefault();
      addButton.click();
    } else {
      inputField.focus();
    }
  }
});

document.querySelector('body').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    inputField.focus();
  }
});
