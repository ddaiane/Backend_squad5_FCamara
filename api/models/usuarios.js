const { QueryTypes } = require('sequelize');
const db = require("../DB/db");


//http://localhost:3000/api/usuarios funcionando
async function selectUsuarios(req, res) {
  const usuarios = await db.query(
    "SELECT id, nome, email, isAdmin FROM usuario",
    { type: QueryTypes.SELECT }
  ); 
  res.json(usuarios);
}


//http://localhost:3000/api/usuarios/:id_usuario funcionando
async function selectUmUsuario(req, res) {
  const { id_usuario } = req.params;

  //Verificação se parametro enviado é um numero
  if (typeof id_usuario != 'number') {
    return res.status(400).json({ message: "id invalido" });
  }

  const usuario = await db.query(
    `SELECT id, nome, email, isAdmin FROM USUARIO WHERE id=${id_usuario}`,
    { type: QueryTypes.SELECT }
  );

  res.json(usuario);
}



module.exports = { selectUsuarios, selectUmUsuario };
