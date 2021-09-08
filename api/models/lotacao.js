const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//funcao que entrega todos dados de lotacao do escritorio solicitado (capacidade, porcentagem permitida e vagas)
//localhost:3000/api/lotacao/:id_escritorio
async function consultaCapacidadeEscritorio(req, res) {
  try {
    const {
      id_escritorio
    } = req.params;

    //verifica se é um escritorio que existe
    const idVerifica = parseInt(id_escritorio);
    if (idVerifica < 1 || idVerifica > 2) {
      return res.status(400).json({
        message: "id_escritorio invalido"
      });
    }

    const capacidadeLocal = await db.query(
      `SELECT * FROM lotacao WHERE id_escritorio = ${id_escritorio}`,
      { type: QueryTypes.SELECT }
    );

    res.json(capacidadeLocal);
  } catch (err) {
    res.json({
      error: true,
      message: err.message
    });
  }
}

//função para alterar a capacidade de um escritorio
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

      //Verificação se id_escritorio é valido
      const verificaEscritorio = parseInt(id_escritorio);
      if (verificaEscritorio < 1 || verificaEscritorio > 2) {
        return res.status(400).json({
          message: "id_escritorio invalido"
        });
      }
    const conferenciaAdmin = await db.query(
      `SELECT isAdmin FROM usuario WHERE id = ${id_usuario}`,
      { type: QueryTypes.SELECT }
    );


      if (conferenciaAdmin[0].isadmin === true) {
        if (novaCapacidade) {
          await db.query(
            `UPDATE lotacao SET capacidade = ${novaCapacidade} WHERE id_escritorio = ${id_escritorio}`
          );
        }

        if (novaPorcentagem) {
          if (novaPorcentagem <= 100 && novaPorcentagem > 0) {
            await db.query(
              `UPDATE lotacao SET porcentagem_permitida = ${novaPorcentagem} WHERE id_escritorio = ${id_escritorio}`
            );
          } else {
            return res.status(400).json({
              message: "porcentagem invalida"
            });
          }
        }

          res.status(200).json({
            message: "Alterado com sucesso"
          });
        } else {
          return res.json({
            message: "Acesso negado"
          });
        }


      } catch (err) {
        res.json({
          error: true,
          message: err.message
        });
      }
    }

    module.exports = {
      consultaCapacidadeEscritorio,
      alterarCapacidadeEscritorio
    };