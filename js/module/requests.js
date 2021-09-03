var xmlHttp
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

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var saida = Math.floor(Math.random() * (max - min)) + min
    return saida;
  }