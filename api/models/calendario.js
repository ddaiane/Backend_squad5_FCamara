const { connect } = require("../DB/db.js");

async function listarTodosAgendamentos(req, res) {
  try {
    const { id_escritorio, mes, ano } = req.body;

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendamento_sp" : "agendamento_sn";

    const db = await connect();
    const reservas = await db.query(
      `SELECT * FROM ${tabelaParaConsulta} WHERE colaborador = ${id_usuario} AND extract(month from data) = ${mes} and extract (year from data) = ${ano}`
    );

    if (!reservas.rows[0]) {
      return res.status(404).json({ reservas: false });
    }

    res.json(reservas.rows);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

module.exports = {listarTodosAgendamentos};
