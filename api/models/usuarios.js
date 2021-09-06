const { connect } = require("../DB/db.js");


async function selectUsuarios(req, res) {
  const db = await connect();
  const usuarios = await db.query("SELECT id, nome, email, isadmin FROM usuario");
  res.json(usuarios.rows);
}


async function selectUmUsuario(req, res) {
  const {id_usuario} = req.body;
  const db = await connect();
  const usuario = await db.query(`SELECT id, nome, email, isadmin FROM USUARIO WHERE id=${id_usuario}`);
  res.json(usuario.rows);
}




module.exports = { selectUsuarios, selectUmUsuario };