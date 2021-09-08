//cria tabelas caso não existam no banco

const { Sequelize } = require("sequelize");
const database = require("./db");

const Usuario = database.define("usuario", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

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

const AgendaSantos = database.define("agendasantos", {
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
    defaultValue: 2,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

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

module.exports = {
  Usuario,
  AgendaSantos,
  AgendaSp,
  Lotacao
};
