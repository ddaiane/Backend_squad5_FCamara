const {
  QueryTypes
} = require('sequelize');
const db = require("../DB/db");


//http://localhost:3000/api/usuarios funcionando
async function selectUsuarios(req, res) {
  try {
    
    const usuarios = await db.query(
      "SELECT id, nome, email, isAdmin FROM usuario", {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).json(usuarios);
  }
  catch (err) {
    res.status(404).json({
      error: true,
      message: err.message
    });
  }

}


//http://localhost:3000/api/usuarios/:id_usuario funcionando
async function selectUmUsuario(req, res) {
  try {
    const {
      id_usuario
    } = req.params;

    const usuario = await db.query(
      `SELECT id, nome, email, isAdmin FROM USUARIO WHERE id=${id_usuario}`, {
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json(usuario);
  } catch (err) {
    res.status(404).json({
      error: true,
      message: err.message
    });
  }
}

async function criarUsuario (req, res) { //cria um novo usuario
  try {
    let {nome, email, senha, isAdmin} = req.body;
if (!isAdmin) { isAdmin = false;}

const jaCadastrado = await db.query(
  `SELECT count(1) FROM usuario WHERE email = '${email}'`, {
      type: QueryTypes.SELECT
  }
);
if (jaCadastrado[0]["count"] == 0) {
  const cadastro = await db.query(
    `INSERT INTO usuario (nome, email, senha, isAdmin) 
VALUES('${nome}', '${email}', '${senha}', ${isAdmin}) returning id, nome, email`, {
        type: QueryTypes.INSERT,
    }
);
res.status(200).json(cadastro[0][0]);
}
else {
  res.status(400).json({mensagem: "email já cadastrado"});
}
  } catch (error) {
    res.status(404).json({
      error: true,
      message: err.message
    });
  }
}



module.exports = {
  selectUsuarios,
  selectUmUsuario,
  criarUsuario
};