// Selecione o elemento de input de texto
const input = document.querySelector('input[type="text"]');

// Crie um array vazio
let array = [];

// Adicione um ouvinte de eventos para o botão
document.querySelector('button').addEventListener('click', () => {
  // Adicione o valor do input ao final do array
  array.push(input.value);

  // Mostre o array no console
  console.log(array);
});
