const { connect } = require("../DB/db.js");

async function consultaCapacidadeEscritorio(req, res) {
  try {
    const { id_escritorio } = req.body;

    const db = await connect();
    const capacidadeLocal = await db.query(
      `SELECT capacidade, porcentagem_permitida FROM lotacao WHERE id_escritorio = ${id_escritorio}`
    );

    // res.json({
    //   capacidade:
    //     capacidadeLocal.rows[0].capacidade *
    //     capacidadeLocal.rows[0].porcentagem_permitida,
    // });

    res.json(capacidadeLocal.rows);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

async function alterarCapacidadeEscritorio(req, res) {
  try {
    const {
      id_escritorio,
      id_usuario,
      capacidade: novaCapacidade,
      porcentagem_permitida: novaPorcentagem,
    } = req.body;

    const db = await connect();
    const conferenciaAdmin = await db.query(
      `SELECT isAdmin FROM usuarios WHERE id_usuario = ${id_usuario}`
    );

    if (!conferenciaAdmin.rows[0].isAdmin) {
      return res.json({ message: "Acesso negado" });
    }

    if (novaCapacidade) {
      await db.query(
        `UPDATE lotacao SET capacidade = ${novaCapacidade} WHERE id_escritorio = ${id_escritorio}`
      );
    }
    if (novaPorcentagem) {
      await db.query(
        `UPDATE lotacao SET porcentagem_permitida = ${novaPorcentagem} WHERE id_escritorio = ${id_escritorio}`
      );
    }

    res.status(200).json({message: "Alterado com sucesso"});

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

module.exports = {consultaCapacidadeEscritorio, alterarCapacidadeEscritorio};
