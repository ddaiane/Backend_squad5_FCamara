const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

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

    const validaEscritorio = verificaEscritorio(id_escritorio);
    if (!validaEscritorio){
      return res.status(400).json({
        message: "id escritorio invalido",
      });
    }

    const tabelaParaConsulta =
      id_escritorio === '1' ? "agendasp" : "agendasantos";

    const reservas = await db.query(
      `SELECT * FROM ${tabelaParaConsulta} WHERE
      extract(month from data) = ${mes} AND
      extract (year from data) = ${ano} AND
      data >= now()
      ORDER BY data`,
      { type: QueryTypes.SELECT }
    );

    if (!reservas[0]) {
      return res.status(404).json({ reservas: false });
    }

    res.json(reservas);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
}

    //função de verificacao
    function verificaEscritorio(id_escritorio) {
      //Verificação se id_escritorio é valido
      let idVerifica;
      if (typeof id_escritorio != "number") {
        idVerifica = parseInt(id_escritorio);
        }
      else { idVerifica = id_escritorio;}
      
      if (idVerifica > 0 && idVerifica <= 2) {
        return true;
      }
      else {return false;}
    }

module.exports = { listarTodosAgendamentos };
