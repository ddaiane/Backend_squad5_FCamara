const { Usuario } = require("../DB/init");
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const database = require("../DB/db");

async function selectUsuarios(req, res) {
  const usuarios = await database.query(
    "SELECT id, nome, email, isAdmin FROM usuario",
    { type: QueryTypes.SELECT }
  );
  // const usuarios = await Usuario.findAll();
  // const usuarios = await db.query(
  //   "SELECT id, nome, email, isAdmin FROM usuario"
  // );
  res.json(usuarios);
}

async function selectUmUsuario(req, res) {
  const { id_usuario } = req.params;

  //Verificação se todos os campos estão presentes, mensagem para o front
  if (!id_usuario) {
    return res.status(400).json({ message: "id_usuario obrigatório" });
  }

  const db = await connect();
  const usuario = await db.query(
    `SELECT id, nome, email, isAdmin FROM USUARIO WHERE id=${id_usuario}`
  );
  res.json(usuario.rows);
}

module.exports = { selectUsuarios, selectUmUsuario };
