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

  list.appendChild(li);
});