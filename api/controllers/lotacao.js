const { connect } = require("../DB/db.js");


//funcao que entrega todos dados de lotacao do escritorio solicitado (capacidade, porcentagem permitida e vagas)
async function consultaCapacidadeEscritorio(req, res) {
  try {
    const { id_escritorio } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if(!id_escritorio){
      return res.status(400).json({message: "Campo id_escritorio obrigatório"});
    }

    const db = await connect();
    const capacidadeLocal = await db.query(
      `SELECT * FROM lotacao WHERE id_escritorio = ${id_escritorio}`
    );

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

    //Verificação se todos os campos estão presentes, mensagem para o front
    if(!id_escritorio || !id_usuario ){
      return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }
    if(!novaCapacidade && !novaPorcentagem){
      return res.status(400).json({message: "Nada a alterar"});
    }

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
