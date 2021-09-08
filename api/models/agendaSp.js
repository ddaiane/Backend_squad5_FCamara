const { Sequelize } = require("sequelize");
const database = require("../DB/db");

const AgendaSp = database.define("agendasp", {
  id_agendamento: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  },
  id_escritorio: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = { AgendaSp };