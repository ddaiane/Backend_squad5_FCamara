const { Sequelize } = require("sequelize");
const database = require("../DB/db");

const Lotacao = database.define("lotacao", {
  id_escritorio: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nome_escritorio: {
      type: Sequelize.STRING,
      allowNull: false
  },
  capacidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  porcentagem_permitida: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  vagas: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = { Lotacao };