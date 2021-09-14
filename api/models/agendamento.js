const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//localhost:3000/api/agendamentos
//parametros no body. cria retorna a linha criada no banco. funcionando e com verificações ok
async function criarAgendamento(req, res) {
  try {
    const { id_escritorio, id_usuario, data } = req.body;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_usuario || !data) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const resultado = await db.query(
      `INSERT INTO agenda (id_usuario, data, id_escritorio) VALUES(${id_usuario}, '${data}', ${id_escritorio}) RETURNING *`,
      {
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).json(resultado[0]);
  } catch (err) {
    res.status(404).json({
      error: true,
      message: err.message,
    });
  }
}

//localhost:3000/api/agendamentos/:id_usuario/:id_agendamento
//parametros na url. deleta agendamento e retorna a data do agendamento cancelado. funcionando
async function excluirAgendamento(req, res) {
  try {
    const { id_agendamento, id_usuario } = req.params;  

    const resultado = await db.query(
      `DELETE FROM agenda WHERE id_agendamento=${id_agendamento} RETURNING data`,
      {
        type: QueryTypes.DELETE,
      }
    );

    res.status(200).json(resultado);
  } catch (err) {
    res.status(404).json({
      error: true,
      message: err.message,
    });
  }
}

//altera data. escritorio na url e dados no body da request. retorna nova data salva. funcionando
//localhost:3000/api/agendamentos/:id_agendamento
async function alterarAgendamento(req, res) {
  try {
    const { id_usuario, data: novaData } = req.body;
    const { id_agendamento } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_agendamento || !novaData) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const resultado = await db.query(
      `UPDATE agenda SET data = '${novaData}' WHERE id_agendamento = ${id_agendamento} RETURNING data`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(resultado[0]);
  } catch (err) {
    res.status(404).json({
      error: true,
      message: err.message,
    });
  }
}

//retorna todos os agendamentos FUTUROS do usuario em ordem de data
//localhost:3000/api/agendamentos/:id_usuario
async function listarAgendamentos(req, res) {
  try {
    const { id_usuario } = req.params;

      const query = `
      SELECT * FROM agenda where id_usuario=${id_usuario} AND data >= now()
      ORDER BY data`;

      const resultado = await db.query(query, {
        type: QueryTypes.SELECT,
      });

      res.status(200).json(resultado);
    
  } catch (err) {
    res.status(404).json({
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
