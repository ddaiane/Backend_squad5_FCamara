// import {
//   json,
//   getUsuarios
// } from './module/requests.js'
///organizar depois as requisições em modulos separados do js pra ficar mais organizado

var json
var xmlHttp

//retorna json com todos usuario
function getUsuarios() {
    xmlHttp = new XMLHttpRequest();
    var url = "http://localhost:3000/consultores";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = usuarioCallback;
}
function usuarioCallback() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        json = JSON.parse(xmlHttp.responseText);
        console.log(json);
    }
}


///bobagenzinhas só pra testar a saída dos dados
window.addEventListener("load", function(event) {
  getUsuarios(); //arranja um json no load da pagina
});

function imprime() {
  document.querySelector('p').innerText = json[1].nome;
}

var botao1 = document.getElementById("botao1");
botao1.addEventListener('click', imprime);





