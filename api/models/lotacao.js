const { QueryTypes } = require("sequelize");
const db = require("../DB/db");

//funcao que entrega todos dados de lotacao do escritorio solicitado (capacidade, porcentagem permitida e vagas)
//localhost:3000/api/lotacao/:id_escritorio
async function consultaCapacidadeEscritorio(req, res) {
  try {
    const { id_escritorio } = req.params;

    const capacidadeLocal = await db.query(
      `SELECT * FROM lotacao WHERE id_escritorio = ${id_escritorio}`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(capacidadeLocal[0]);

  } catch (err) {
    res.status(400).json({
      error: true,
      message: err.message,
    });
  }
}

//função para alterar a capacidade de um escritorio. id do escritorio nos parametros e o resto no body
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

    
    //verifica se usuario é admin
    const conferenciaAdmin = await db.query(
      `SELECT isAdmin FROM usuario WHERE id = ${id_usuario}`,
      { type: QueryTypes.SELECT }
    );

    if (conferenciaAdmin[0].isadmin === true) {
      if (novaCapacidade) {
        await db.query(
          `UPDATE lotacao SET capacidade = ${novaCapacidade} WHERE id_escritorio = ${id_escritorio}`
        );
        //atualiza tbm as vagas:
        await db.query(
          `update lotacao set vagas = (capacidade * porcentagem_permitida)/100
            where id_escritorio = ${id_escritorio}`
        );
      }

      if (novaPorcentagem) {
        if (novaPorcentagem <= 100 && novaPorcentagem > 0) { //verifica se é uma porcentagem entre 0 e 100
          await db.query(
            `UPDATE lotacao SET porcentagem_permitida = ${novaPorcentagem} WHERE id_escritorio = ${id_escritorio}`
          );
          //atualiza vagas
          await db.query(
            `update lotacao set vagas = (capacidade * porcentagem_permitida)/100
              where id_escritorio = ${id_escritorio}`
          );
        } else {
          return res.status(400).json({
            message: "porcentagem invalida",
          });
        }
      }
      res.status(200).json({
        message: "Alterado com sucesso",
      });

    } else { //retorno se isAdmin = false
      return res.status(400).json({
        message: "Acesso negado",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err.message,
    });
  }
}

//rota para criar um novo escritorio no banco de dados
async function criarEscritorio(req, res) {
  try {
    const { nome, capacidade, porcentagem, id_usuario } = req.body;
    const vagas = capacidade * porcentagem/100;

    //Verificação se todos os campos estão presentes, mensagem para o front
    if (!nome || !capacidade || !porcentagem || !id_usuario) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    //verifica se usuario é admin
    const conferenciaAdmin = await db.query(
      `SELECT isAdmin FROM usuario WHERE id = ${id_usuario}`,
      { type: QueryTypes.SELECT }
    );

    if (conferenciaAdmin[0].isadmin === false) {
      return res.status(400).json({
        message: "Acesso negado.",
      });
    }

    const nomeLivre = await db.query(
      `SELECT count(1) FROM lotacao WHERE nome_escritorio = '${nome}'`, {
          type: QueryTypes.SELECT
      }
  );
  if (nomeLivre[0]["count"] != 0) {
    return res.status(400).json({
      message: "Já existe escritório com esse nome",
    });
  }

  if(porcentagem <= 0 || porcentagem > 100) {
    return res.status(400).json({
      message: "Porcentagem inválida",
    });
  }

  if (conferenciaAdmin[0].isadmin === true) {
    const novoEscritorio = await db.query(
      `INSERT INTO lotacao (nome_escritorio, capacidade, porcentagem_permitida, vagas) 
  VALUES('${nome}', ${capacidade}, ${porcentagem}, ${vagas}) returning id_escritorio`, {
          type: QueryTypes.INSERT,
      }
  );
  res.status(200).json(
    novoEscritorio[0][0]
  );
  }
    
    
  } catch (err) {
    res.status(404).json({ error: true, message: err.message });
  }
  
}

module.exports = {
  consultaCapacidadeEscritorio,
  alterarCapacidadeEscritorio,
  criarEscritorio
};
