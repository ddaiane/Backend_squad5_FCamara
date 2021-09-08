const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//funcao que entrega todos dados de lotacao do escritorio solicitado (capacidade, porcentagem permitida e vagas)
//localhost:3000/api/lotacao/:id_escritorio
async function consultaCapacidadeEscritorio(req, res) {
  try {
    const { id_escritorio } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio) {
      return res
        .status(400)
        .json({ message: "Campo id_escritorio obrigatório" });
    }

    const capacidadeLocal = await db.query(
      `SELECT * FROM lotacao WHERE id_escritorio = ${id_escritorio}`,
      { type: QueryTypes.SELECT }
    );

    res.json(capacidadeLocal);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

//localhost:3000/api/lotacao/:id_escritorio
async function alterarCapacidadeEscritorio(req, res) {
  try {
    const {
      id_usuario,
      capacidade: novaCapacidade,
      porcentagem_permitida: novaPorcentagem,
    } = req.body;
    const { id_escritorio } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_usuario) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }
    if (!novaCapacidade && !novaPorcentagem) {
      return res.status(400).json({ message: "Nada a alterar" });
    }

    const conferenciaAdmin = await db.query(
      `SELECT isAdmin FROM usuario WHERE id = ${id_usuario}`,
      { type: QueryTypes.SELECT }
    );

    if (!conferenciaAdmin[0].isadmin) {
      return res.json({ message: "Acesso negado" });
    }

    if (novaCapacidade) {
      await db.query(
        `UPDATE lotacao SET capacidade = ${novaCapacidade} WHERE id_escritorio = ${id_escritorio}`,
        { type: QueryTypes.UPDATE }
      );
    }
    if (novaPorcentagem) {
      await db.query(
        `UPDATE lotacao SET porcentagem_permitida = ${novaPorcentagem} WHERE id_escritorio = ${id_escritorio}`,
        { type: QueryTypes.UPDATE }
      );
    }

    res.status(200).json({ message: "Alterado com sucesso" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

module.exports = { consultaCapacidadeEscritorio, alterarCapacidadeEscritorio };
