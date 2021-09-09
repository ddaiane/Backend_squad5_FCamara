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



module.exports = {
  selectUsuarios,
  selectUmUsuario
};