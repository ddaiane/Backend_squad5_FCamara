const { QueryTypes } = require("sequelize");
const db = require("../DB/db");
const { verificaEscritorio } = require("./uteis");

//retorna todos agendamentos FUTUROS de um determinado mes/ano em um determinado escritorio
//localhost:3000/api/calendario/:id_escritorio/:mes/:ano
async function listarTodosAgendamentos(req, res) {
  try {
    const { id_escritorio, mes, ano } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !mes || !ano) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const reservas = await db.query(
      `SELECT * FROM agenda WHERE
      id_escritorio = ${id_escritorio} AND
      extract(month from data) = ${mes} AND
      extract (year from data) = ${ano} AND
      data >= now()
      ORDER BY data`,
      { type: QueryTypes.SELECT }
    );

    if (!reservas[0]) {
      return res.status(404).json({ reservas: false });
    }

    res.status(200).json(reservas);
  } catch (err) {
    res.status(404).json({ error: true, message: err.message });
  }
}
//localhost:3000/api/calendario/:id_escritorio?data=2021-09-12
async function listarVagasPorDia(req, res) {
  try {
    const { id_escritorio } = req.params;
    const { data } = req.query;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !data) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const capacidade = await db.query(
      `SELECT capacidade, vagas FROM lotacao 
      WHERE id_escritorio = ${id_escritorio}`,
      { type: QueryTypes.SELECT }
    );

    const agendamentos = await db.query(
      `SELECT count(*) FROM agenda WHERE id_escritorio = ${id_escritorio} AND data = '${data}' GROUP BY data`,
      { type: QueryTypes.SELECT }
    );
    
    const numeroAgendamentos = agendamentos[0] ? Number(agendamentos[0].count) : 0;

    const vagas = capacidade[0].vagas - numeroAgendamentos;

    res.status(200).json({ vagas: vagas });
  } catch (err) {
    res.status(404).json({ error: true, message: err.message });
  }
}

module.exports = { listarTodosAgendamentos, listarVagasPorDia };
