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

// seleciona o <input>
const inputField = document.querySelector('input[type="text"]');
//seleciona o <button> "adicionar"
const addButton = document.querySelector('button');
// seleciona a <ul>
const listContainer = document.querySelector('#list');
// cria uma matriz vazia para armazenar as tarefas
let taskArray = [];

// Declara uma função chamada addTask que adiciona uma nova tarefa ao array de tarefas (taskArray) e cria um novo elemento de tarefa na lista
function addTask() {
  // seleciona o valor de entrada de texto, eliminando quaisquer espaço em branco antes e depois do texto
  const taskInput = inputField.value.trim();

  // verifica se o valor da entrada de texto não é vazio
  if (taskInput !== '') {
    // adiciona a tarefa à matriz de tarefas (taskArray)
    taskArray.push(taskInput);
    // redefine o valor de entrada de texto como vazio
    inputField.value = '';

    // Cria um novo elemento de tarefa (taskDiv) usando a função createTaskElement e adiciona o elemento à lista de tarefas (listContainer)
    const taskDiv = createTaskElement(taskInput);
    listContainer.appendChild(taskDiv);
  }
}

// Declara uma função chamada createTaskElement que cria um novo elemento de tarefa com um texto de tarefa e três botões (Excluir, Editar e Adicionar Subtarefa)
function createTaskElement(taskText) {
  // Cria um novo elemento de div para a tarefa
  const taskDiv = document.createElement('div');

  // Cria um novo elemento de span para o texto da tarefa e atribui o texto passado como parâmetro a ele
  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;

  // Cria três botões de tarefa usando a função createTaskButton e passando o texto do botão e a função de retorno de chamada para cada botão
  const deleteButton = createTaskButton('Excluir', deleteTask);
  const editButton = createTaskButton('Editar', editTask);
  const addSubtaskButton = createTaskButton('Adicionar Subtarefa', addSubtask);

  // Adiciona o texto da tarefa e os botões à div da tarefa
  taskDiv.appendChild(taskTextSpan);
  taskDiv.appendChild(deleteButton);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(addSubtaskButton);

  // Adiciona um ouvinte de evento de clique à div da tarefa para definir o foco no campo de entrada de texto
  taskDiv.addEventListener('click', () => {
    inputField.focus();
  });

  // Retorna a div da tarefa criada
  return taskDiv;
}

// Declara uma função chamada createTaskButton que cria um novo elemento de botão com um texto de botão e uma função de retorno de chamada para o evento de clique
function createTaskButton(buttonText, eventFunction) {
  // Cria um novo elemento de botão e atribui o texto do botão passado como parâmetro a ele
  const button = document.createElement('button');
  button.textContent = buttonText;

  // Adiciona um ouvinte de evento de clique ao botão e passa a função de retorno de chamada passada como parâmetro
  button.addEventListener('click', eventFunction);

  // Retorna o botão criado
  return button;
}

// Declara uma função chamada deleteTask que remove a tarefa correspondente ao botão de exclusão clicado da lista de tarefas e do array de tarefas
function deleteTask() {
  // Obtém a div da tarefa pai do botão de exclusão clicado e o índice da tarefa no array de tarefas
  const taskDiv = this.parentElement;
  const taskIndex = taskArray.indexOf(taskDiv.querySelector('span').textContent);

  // Remove a div da tarefa da lista de tarefas
  taskDiv.remove();

  // Remove a tarefa correspondente do array de tarefas usando o índice obtido acima
  taskArray.splice(taskIndex, 1);
}
 
// Declara uma função chamada editTask que permite ao usuário editar o texto da tarefa clicada e atualiza a lista de tarefas e o array de tarefas com o novo texto da tarefa
function editTask() {
  // Obtém a div da tarefa pai do botão de edição clicado e o elemento de texto da tarefa
  const taskDiv = this.parentElement;
  const taskTextSpan = taskDiv.querySelector('span');

  // Pede ao usuário para inserir o novo texto da tarefa por meio de uma caixa de diálogo e atualiza o texto da tarefa e o array de tarefas com o novo texto, se o usuário clicar em OK
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

    const subtaskEditButton = createSubtaskButton('Editar', editSubtask);
    const subtaskDeleteButton = createSubtaskButton('Excluir', deleteSubtask);

    const subtaskDiv = document.createElement('div');
    subtaskDiv.appendChild(subtaskSpan);
    subtaskDiv.appendChild(subtaskEditButton);
    subtaskDiv.appendChild(subtaskDeleteButton);

    taskDiv.appendChild(subtaskDiv);
  }
}

// Adiciona um evento de clique ao botão 'Adicionar', para que a função addTask seja chamada quando o botão for clicado
addButton.addEventListener('click', addTask);

// Adiciona um evento de tecla ao campo de entrada de texto, para que a função addTask seja chamada quando a tecla 'Enter' for pressionada
inputField.addEventListener('keydown', (event) => {
  // Verifica se a tecla pressionada é a tecla 'Enter'
  if (event.key === 'Enter') {
    // Verifica se o elemento ativo no momento é o campo de entrada de texto
    if (document.activeElement === inputField) {
      // Impede que a tecla 'Enter' seja inserida no campo de entrada de texto
      event.preventDefault();
      // Chama a função addTask quando a tecla 'Enter' é pressionada enquanto o campo de entrada de texto está ativo
      addButton.click();
    } else {
      // Move o foco de volta para o campo de entrada de texto se a tecla 'Enter' for pressionada em outro lugar
      inputField.focus();
    }
  }
});

// Adiciona um evento de teclado ao elemento body da página
document.querySelector('body').addEventListener('keydown', (event) => {
  // Verifica se a tecla pressionada é a tecla "Enter"
  if (event.key === 'Enter') {
    // Move o foco para o campo de entrada de texto
    inputField.focus();
  }
});


function createSubtaskButton(buttonText, eventFunction) {
  const button = document.createElement('button');
  button.textContent = buttonText;
  button.addEventListener('click', eventFunction);

  return button;
}

function editSubtask() {
  const subtaskDiv = this.parentElement;
  const subtaskTextSpan = subtaskDiv.querySelector('span');
  const newText = prompt("Digite o novo texto para a subtarefa:", subtaskTextSpan.textContent);

  if (newText !== null) {
    subtaskTextSpan.textContent = '- ' + newText;
  }
}

function deleteSubtask() {
  const subtaskDiv = this.parentElement;
  subtaskDiv.remove();
}