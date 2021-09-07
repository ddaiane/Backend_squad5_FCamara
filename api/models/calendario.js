const { connect } = require("../DB/db.js");


//retorna todos agendamentos FUTUROS de um determinado mes/ano em um determinado escritorio
async function listarTodosAgendamentos(req, res) {
  try {
    const { id_escritorio, mes, ano } = req.params;

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    const reservas = await db.query(
      `SELECT * FROM ${tabelaParaConsulta} WHERE
      extract(month from data) = ${mes} AND
      extract (year from data) = ${ano} AND
      data >= now()
      ORDER BY data`
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
