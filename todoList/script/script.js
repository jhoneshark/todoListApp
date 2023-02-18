/** 
             uma preguiça do karai de comentar tudo isso kkkkkk, mas no resumo..
        
             o primeiro bloco eu estou referenciando os elementos da DOM no JS
             
             o segundo bloco eu adiciono um evento ouvinte no botão e quando ele é clicado chama uma função anonima q:
                - pega o valor da entrada de texto e joga no final do array
                - limpa o texto na entrada de texto
                
             o terceiro bloco cria uma LI, 
             depois pega o ultimo valor do array e através do método "textContent" adiciona na LI 
             e por ultimo, adiciono a LI gerada no UL que é referenciado pelo id="lista"
            **/
const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button');
const list = document.querySelector('#list');
let array = [];

button.addEventListener('click', () => {
  array.push(input.value);
  input.value = '';

  const li = document.createElement('li');
  li.textContent = array[array.length - 1];

  let imgDelete = document.createElement('img');
  imgDelete.src = 'imgs/delete.png'

  let imgEdit = document.createElement('img');
  imgEdit.src = 'imgs/edit.png'

    // Adiciona um botão ao elemento li para permitir a exclusão
    const button = document.createElement('button');
    button.textContent = 'Excluir';
    button.addEventListener('click', () => {
        li.remove(); // Remove o elemento li correspondente
        array.splice(array.indexOf(li.textContent), 1); // Remove o valor do array correspondente
    });

  list.appendChild(li);
  list.appendChild(imgDelete);
  list.appendChild(imgEdit);
});