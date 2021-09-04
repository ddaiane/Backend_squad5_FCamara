const { connect } = require("../db.js");

async function selectConsulters(req, res) {
  const db = await connect();
  const consultor = await db.query("SELECT * FROM usuario");
  res.json(consultor.rows);
}

module.exports = { selectConsulters };