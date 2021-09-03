var xmlHttp
//o massa de modular o js é que algumas variaveis tipo essa de requisição http
//podem ficar globais mas ficam acessivel só as funções aqui desse modulo ja que nao foi exportada!

export var json

export function fnRead() {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "server.php?op=read", true);
  xmlHttp.send();
  xmlHttp.onreadystatechange = readCallback;
}

function readCallback() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        json = JSON.parse(xmlHttp.responseText);
    }
}

export function invertejson() {
    json = [json[randomNum(0,3)], json[randomNum(0,3)], json[randomNum(0,3)], json[randomNum(0,3)]];
}


//funções que só forem necessarias pro funcionamento de funções de dentro do modulo, tipo essa aqui,
//tbm podem ficar acessiveis só dentro do modulo sem exportar!
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var saida = Math.floor(Math.random() * (max - min)) + min
    return saida;
  }