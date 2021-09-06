const { connect } = require("../db.js");


//retorna todos usuarios porem sem o campo senha
async function selectUsuarios(req, res) {
  const db = await connect();
  const usuarios = await db.query("SELECT id, nome, email, isadmin FROM usuario");
  res.json(usuarios.rows);
}

// //retorna um usuario (sem o campo senha)
// async function selectUmUsuario(req, res) {
//   const db = await connect();
//   const usuario = await db.query("SELECT id, nome, email, isadmin FROM USUARIO WHERE id=?", id);
//   res.json(usuario.rows);
// }




module.exports = { selectUsuarios };