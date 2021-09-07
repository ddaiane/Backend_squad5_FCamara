const { connect } = require("../DB/db.js");

async function listarTodosAgendamentos(req, res) {
  try {
    const { id_escritorio, mes, ano } = req.body;

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    const reservas = await db.query(
      `SELECT data FROM ${tabelaParaConsulta} WHERE extract(month from data) = ${mes} and extract (year from data) = ${ano}`
    );

    if (!reservas.rows[0]) {
      return res.status(404).json({ reservas: false });
    }

    res.json(reservas.rows);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

module.exports = { listarTodosAgendamentos };
