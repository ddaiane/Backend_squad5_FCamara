const { Sequelize } = require("sequelize");

//postgres://usuario:senha@servidor:porta/banco
const sequelize = new Sequelize(
  "link_banco",
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
