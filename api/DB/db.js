const { Sequelize } = require("sequelize");

//postgres://usuario:senha@servidor:porta/banco
const sequelize = new Sequelize(
  "postgres://hesjocpg:2eQObwu3fdrP-i_NsrVkMaXfuOeIZCh2@kesavan.db.elephantsql.com:5432/hesjocpg",
  { dialect: "postgres" }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
