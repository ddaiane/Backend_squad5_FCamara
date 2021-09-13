const {
  QueryTypes
} = require("sequelize");
const db = require("../DB/db");

//Utilizar para as funções dos middlewares

async function buscaAgendamento(id_agendamento, tabela) {
  const resultado = await db.query(
    `SELECT COUNT(1)
    FROM ${tabela}
    WHERE id_agendamento = ${id_agendamento}`, {
      type: QueryTypes.SELECT
    }
  );
  if (resultado[0]["count"] == 0) {return false;} //false = nao tem agendamento nesse dia
  return true;
}

async function conferenciaDeReservaRepetida(id_usuario, data) {

  const santos = await verificaReservaData(id_usuario, data, "agendasantos");
  const sp = await verificaReservaData(id_usuario, data, "agendasp");
  if (!santos && !sp) {
    return false;
  }
  return true;
}

async function verificaReservaData(id_usuario, data, agenda) {
  const resultado = await db.query(
    `SELECT COUNT(1)
    FROM ${agenda}
    WHERE id_usuario = ${id_usuario} AND data = '${data}'`, {
      type: QueryTypes.SELECT
    }
  );
  if (resultado[0]["count"] == 0) {return false;} //false = nao tem agendamento nesse dia
  return true;
}

async function conferenciaDeUsuario(id_usuario) {
  const usuario = await db.query(
    `SELECT COUNT(1)
    FROM usuario
    WHERE id = ${id_usuario}`, {
      type: QueryTypes.SELECT
    }
  );
  return usuario[0]["count"] == 1 ? true : false;
}

//função verificar se escritorio é valido
async function verificaEscritorio(id_escritorio) {
  let idVerifica;
  if (typeof id_escritorio != "number") {
    idVerifica = parseInt(id_escritorio);
  } else {
    idVerifica = id_escritorio;
  }
  const numEscritorios = await db.query (`select count(*) from lotacao`,
  { type: QueryTypes.SELECT });

  if (idVerifica > 0 && idVerifica <= Number(numEscritorios[0].count)) {
    return true;
  } else {
    return false;
  }
}

async function usuarioAgendamento(id_agendamento, tabela) {
  const usuario = await db.query(
    `SELECT id_usuario
    FROM ${tabela}
    WHERE id_agendamento = ${id_agendamento}`, {
      type: QueryTypes.SELECT
    }
  );
  return usuario[0]["id_usuario"];
}

module.exports = {
  conferenciaDeReservaRepetida,
  conferenciaDeUsuario,
  buscaAgendamento,
  verificaEscritorio,
  usuarioAgendamento
};