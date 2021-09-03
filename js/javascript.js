import {
  fnRead,
  json,
  invertejson
} from './module/requests.js'


//eventlistener no load
window.addEventListener("load", function (event) {
  fnRead();
});
//event listeners dos botoes
document.getElementById("botao1").addEventListener('click', imprime);
document.getElementById("botao2").addEventListener('click', invertejson);


//testa se o json que ta no outro modulo ta dinamico com os botoes que invertem o json e imprime pra conferir
function imprime() {
  console.log(json);
  document.querySelector('p').innerText = json[0].email;
}

