const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//localhost:3000/api/agendamentos
//parametros no body. cria retorna a linha criada no banco. funcionando
async function criarAgendamento(req, res) {
  try {
    const { id_escritorio, id_usuario, data } = req.body;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_usuario || !data) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    //Verificação se id_escritorio é valido
    if (typeof id_escritorio != "number" || typeof id_usuario != "number") {
      return res.status(400).json({
        message: "id deve ser number",
      });
    }
    if (id_escritorio < 1 || id_escritorio > 2) {
      return res.status(400).json({
        message: "id_escritorio invalido",
      });
    }

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const resultado = await db.query(
      `INSERT INTO ${tabelaParaConsulta} (id_usuario, data) VALUES(${id_usuario}, '${data}') RETURNING *`,
      { type: QueryTypes.INSERT }
    );

    res.status(201).json(resultado[0]);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//localhost:3000/api/agendamentos/
//parametros no body. deleta agendamento e retorna a data do agendamento cancelado. funcionando
async function excluirAgendamento(req, res) {
  try {
    const { id_agendamento, id_escritorio } = req.body;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_agendamento) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    //Verificação se parametros enviados sao numeros
    if (typeof id_escritorio != "number") {
      return res.status(400).json({
        message: "id deve ser number",
      });
    }

    //verifica se id_escritorio é de um escritorio valido
    if (id_escritorio < 1 || id_escritorio > 2) {
      return res.status(400).json({
        message: "id_escritorio invalido",
      });
    }

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const resultado = await db.query(
      `DELETE FROM ${tabelaParaConsulta} WHERE id_agendamento=${id_agendamento} RETURNING data`,
      { type: QueryTypes.DELETE }
    );

    res.json(resultado);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//altera data. dados no body da request. retorna nova data salva. funcionando
//localhost:3000/api/agendamentos/
async function alterarAgendamento(req, res) {
  try {
    const { id_agendamento, id_escritorio, data: novaData } = req.body;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_agendamento || !novaData) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    //Verificação se parametros enviados sao numeros
    if (typeof id_escritorio != "number") {
      return res.status(400).json({
        message: "id deve ser number",
      });
    }

    //verifica se id_escritorio é de um escritorio valido
    if (id_escritorio < 1 || id_escritorio > 2) {
      return res.status(400).json({
        message: "id_escritorio invalido",
      });
    }

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const resultado = await db.query(
      `UPDATE ${tabelaParaConsulta} SET data = '${novaData}' WHERE id_agendamento = ${id_agendamento} RETURNING data`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    res.status(200).json(resultado[0]);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//retorna todos os agendamentos FUTUROS do usuario em ordem de data
//localhost:3000/api/agendamentos/:id_usuario funcionando
async function listarAgendamentos(req, res) {
  try {
    const { id_usuario } = req.params;
    //Verificação se parametro enviado é um numero
    if (typeof id_usuario != "number") {
      return res.status(400).json({
        message: "id invalido",
      });
    }

    const query = `
    SELECT * FROM agendaSP where id_usuario=${id_usuario} AND data >= now()
    UNION
    SELECT * FROM agendasantos where id_usuario=${id_usuario} AND data >= now()
    ORDER BY data`;

    const resultado = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json(resultado);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

module.exports = {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
};
