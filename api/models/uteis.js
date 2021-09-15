const {
  QueryTypes
} = require("sequelize");
const db = require("../DB/db");

//Utilizadas nos middlewares

async function buscaAgendamento(id_agendamento) { //verifica se determinado agendamento existe
  const resultado = await db.query(
    `SELECT COUNT(1)
    FROM agenda
    WHERE id_agendamento = ${id_agendamento}`, {
      type: QueryTypes.SELECT
    }
  );
  if (resultado[0]["count"] == 0) {return false;}
  return true;
}

async function conferenciaDeDataNaoRepetida(id_usuario, data) { //verifica se o usuario ja tem reserva nesse dia
  const resultado = await db.query(
    `SELECT COUNT(1)
    FROM agenda
    WHERE id_usuario = ${id_usuario} AND data = '${data}'`, {
      type: QueryTypes.SELECT
    }
  );
  if (resultado[0]["count"] == 0) {return true;}
  return false;
}


async function conferenciaDeUsuario(id_usuario) { //verifica se usuario existe
  const usuario = await db.query(
    `SELECT COUNT(1)
    FROM usuario
    WHERE id = ${id_usuario}`, {
      type: QueryTypes.SELECT
    }
  );
  return usuario[0]["count"] == 1 ? true : false;
}

async function verificaEscritorio(id_escritorio) { //verifica se o id de escritorio passado é de um escritorio que existe no BD
  let idVerifica;
  if (typeof id_escritorio != "number") {
    idVerifica = parseInt(id_escritorio);
  } else {
    idVerifica = id_escritorio;
  }
  let numEscritorios = await db.query (`select count(*) from lotacao`,
  { type: QueryTypes.SELECT });
  numEscritorios = parseInt(numEscritorios[0]["count"]);
 
  if (idVerifica > 0 && idVerifica <= numEscritorios) {
    return true;
  } else {
    return false;
  }
}

async function usuarioAgendamento(id_agendamento) { //verifica quem é o usuario de um id de agendamento
  const usuario = await db.query(
    `SELECT id_usuario
    FROM agenda
    WHERE id_agendamento = ${id_agendamento}`, {
      type: QueryTypes.SELECT
    }
  );
  return usuario[0]["id_usuario"]; //retorna o id do usuario
}

async function verificaVagaLivre(id_escritorio, data) { //verifica se tem vaga livre
  //verifica reservas maximas permitidas no escritorio
  const capacidade = await db.query(
    `SELECT vagas FROM lotacao 
    WHERE id_escritorio = ${id_escritorio}`,
    { type: QueryTypes.SELECT }
  );

    //verifica quantos agendamentos ja tem no dia
    let agendamentos = await db.query(
      `SELECT count(*) FROM agenda WHERE id_escritorio = ${id_escritorio} AND data = '${data}'`,
      { type: QueryTypes.SELECT }
    );
    agendamentos = agendamentos[0]["count"];
    //calcula o total de vagas que sobrou
    const vagas = capacidade[0]["vagas"] - agendamentos;
      
    return  vagas >= 1 ? true : false;
}

async function verificaDiadeSemana(data) { //verifica se é dia de semana
  let dataVerifica = new Date(data);
  console.log(dataVerifica);

  if(!(dataVerifica.getDay() % 6)) {return false;}
  else {return true;}

}

module.exports = {
  conferenciaDeDataNaoRepetida,
  conferenciaDeUsuario,
  buscaAgendamento,
  verificaEscritorio,
  usuarioAgendamento,
  verificaVagaLivre,
  verificaDiadeSemana
};