const { connect } = require("../DB/db.js");

async function criarAgendamento(req, res) {
  try {
    const { id_escritorio, id_usuario, data } = req.body;

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    await db.query(
      `INSERT INTO ${tabelaParaConsulta} (id_usuario, data) VALUES(${id_usuario}, ${data}`
    );

    res.status(201).json({ mensagem: true });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

async function excluirAgendamento(req, res) {
  try {
    const { id_agendamento, id_escritorio } = req.body;
    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    await db.query(
      `DELETE FROM ${tabelaParaConsulta} WHERE id_agendamento=${id_agendamento}`
    );

    res.status(200).json({ mensagem: true });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

async function alterarAgendamento(req, res) {
  try {
    const { id_agendamento, id_escritorio, data: novaData } = req.body;
    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    await db.query(
      `UPDATE ${tabelaParaConsulta} SET data = ${novaData} WHERE id_agendamento = ${id_agendamento}`
    );

    res.status(200).json({ mensagem: true });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

async function listarAgendamentosEsc(id_usuario, id_escritorio) {
  try {
    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";

    const db = await connect();
    const reservas = await db.query(
      `SELECT * FROM ${tabelaParaConsulta} WHERE id_usuario = ${id_usuario}`
    );
    return reservas.rows;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

async function listarAgendamentos(req, res) {
  try {
    const { id_usuario } = req.body;
    const agendamentosSp = listarAgendamentosEsc(id_usuario, 1);
    const agendamentosSn = listarAgendamentosEsc(id_usuario, 2);

    res
      .status(200)
      .json({ escritorioSp: agendamentosSp, escritorioSn: agendamentosSn });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

module.exports = { criarAgendamento, excluirAgendamento, alterarAgendamento, listarAgendamentos };
