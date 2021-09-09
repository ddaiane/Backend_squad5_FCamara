const {
  QueryTypes
} = require("sequelize");
const db = require("../DB/db");
const {
  conferenciaDeReservaRepetida,
  conferenciaDeUsuario,
  buscaAgendamento,
  verificaEscritorio,
  usuarioAgendamento
} = require("./uteis");


//localhost:3000/api/agendamentos
//parametros no body. cria retorna a linha criada no banco. funcionando e com verificações ok
async function criarAgendamento(req, res) {
  try {
    const {
      id_escritorio,
      id_usuario,
      data
    } = req.body;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_usuario || !data) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    if (!verificaEscritorio(id_escritorio)) {
      return res.status(400).json({
        message: "id escritorio invalido",
      });
    }

    if (!await conferenciaDeUsuario(id_usuario)) {
      return res.status(404).json({
        message: "Usuario não encontrado"
      });
    }

    if (await conferenciaDeReservaRepetida(id_usuario, data, tabelaParaConsulta)) {
      return res
        .status(400)
        .json({
          mensagem: "Você já possui reserva para esse dia"
        });
    }

    const tabelaParaConsulta = id_escritorio == 1 ? "agendasp" : "agendasantos";
    const resultado = await db.query(
      `INSERT INTO ${tabelaParaConsulta} (id_usuario, data) VALUES(${id_usuario}, '${data}') RETURNING *`, {
        type: QueryTypes.INSERT
      }
    );

    res.status(201).json(resultado[0]);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//localhost:3000/api/agendamentos/:id_escritorio/:id_agendamento
//parametros na url. deleta agendamento e retorna a data do agendamento cancelado. funcionando
async function excluirAgendamento(req, res) {
  try {
    const {
      id_agendamento,
      id_escritorio
    } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_agendamento) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    if (!verificaEscritorio(id_escritorio)) {
      return res.status(400).json({
        message: "id escritorio invalido",
      });
    }

    const tabelaParaConsulta =
      id_escritorio === 1 ? "agendasp" : "agendasantos";
    
      if (!await buscaAgendamento(id_agendamento, tabelaParaConsulta)) {
        return res.status(404).json({
          message: "Agendamento não encontrado"
        });
      }

    const resultado = await db.query(
      `DELETE FROM ${tabelaParaConsulta} WHERE id_agendamento=${id_agendamento} RETURNING data`, {
        type: QueryTypes.DELETE
      }
    );

    res.json(resultado);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//altera data. escritorio na url e dados no body da request. retorna nova data salva. funcionando
//localhost:3000/api/agendamentos/:id_escritorio
async function alterarAgendamento(req, res) {
  try {
    const {
      id_agendamento,
      data: novaData
    } = req.body;
    const {
      id_escritorio
    } = req.params;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!id_escritorio || !id_agendamento || !novaData) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    if (!verificaEscritorio(id_escritorio)) {
      return res.status(400).json({
        message: "id escritorio invalido",
      });
    }


    const tabelaParaConsulta =
      id_escritorio == 1 ? "agendasp" : "agendasantos";
    
      if (!await buscaAgendamento(id_agendamento, tabelaParaConsulta)) {
        return res.status(404).json({
          message: "Agendamento não encontrado"
        });
      }

      const id_usuario = await usuarioAgendamento(id_agendamento, tabelaParaConsulta);

      //verifica se nao ta alterando pra um dia que ja tem reserva
      if (await conferenciaDeReservaRepetida(id_usuario, novaData, tabelaParaConsulta)) {
        return res
          .status(400)
          .json({
            mensagem: "Você já possui reserva para esse dia"
          });
      }

    const resultado = await db.query(
      `UPDATE ${tabelaParaConsulta} SET data = '${novaData}' WHERE id_agendamento = ${id_agendamento} RETURNING data`, {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(resultado);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}

//retorna todos os agendamentos FUTUROS do usuario em ordem de data
//localhost:3000/api/agendamentos/:id_usuario funcionando
async function listarAgendamentos(req, res) {
  try {
    const {
      id_usuario
    } = req.params;


    const query = `
    SELECT * FROM agendaSP where id_usuario=${id_usuario} AND data >= now()
    UNION
    SELECT * FROM agendasantos where id_usuario=${id_usuario} AND data >= now()
    ORDER BY data`;

    const resultado = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json(resultado);
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
}


module.exports = {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos
};