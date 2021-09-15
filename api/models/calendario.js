const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//retorna todos agendamentos FUTUROS de um determinado mes/ano em um determinado escritorio
//localhost:3000/api/calendario/:id_escritorio/:mes/:ano
async function listarTodosAgendamentos(req, res) {
  try {
    const { id_escritorio, mes, ano } = req.params;

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
async function listarVagasPorDia(req, res) { //entrega quantas vagas estao sobrando no dia
  try {
    const { id_escritorio } = req.params;
    const { data } = req.query;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !data) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    //verifica reservas maximas permitidas no escritorio
    const capacidade = await db.query(
      `SELECT vagas FROM lotacao 
      WHERE id_escritorio = ${id_escritorio}`,
      { type: QueryTypes.SELECT }
    );

    //verifica quantos agendamentos ja tem no dia
    let agendamentos = await db.query(
      `SELECT count(*) FROM agenda WHERE id_escritorio = ${id_escritorio} AND data = '${data}'`,
      { type: QueryTypes.SELECT }
    );
    agendamentos = agendamentos[0]["count"];
    //calcula o total de vagas que sobrou
    const vagas = capacidade[0]["vagas"] - agendamentos;

    res.status(200).json({ vagas: vagas });
  } catch (err) {
    res.status(404).json({ error: true, message: err.message });
  }
}


//lista vagas em cada dia do mês (retorna vagas que estão sobrando em dias que o escritorio já tem algum agendamento)
//se a data nao estiver na lista, é pq o escritorio nao tem nenhum agendamento naquele dia
async function listarVagasRestantesMes(req, res) {
 try {
  const { id_escritorio, mes, ano } = req.params;

  const reservas = await db.query(
    `SELECT count(*) as vagas_livres, data 
    FROM agenda 
    WHERE id_escritorio = ${id_escritorio}
    AND extract(month from data) = ${mes} AND extract(year from data) = ${ano}
    GROUP BY data`,
    { type: QueryTypes.SELECT }
  );

  let vagasEscritorio = await db.query(
    `SELECT vagas FROM lotacao 
    WHERE id_escritorio = ${id_escritorio}`,
    { type: QueryTypes.SELECT }
  ); 
  vagasEscritorio = vagasEscritorio[0]["vagas"];

  reservas.forEach(item => {
    const agendamentosDia = parseInt(item["vagas_livres"]);
    const vagasLivres = vagasEscritorio - agendamentosDia;
    item["vagas_livres"] = vagasLivres;
 });
 res.status(200).json(reservas);
 } catch (error) {
  res.status(404).json({ error: true, message: err.message });
 }
}

module.exports = { listarTodosAgendamentos, listarVagasPorDia, listarVagasRestantesMes };
