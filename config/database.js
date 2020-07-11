const Sequalize = require("sequelize");
module.exports = new Sequalize("ridewash", "root", "root1234", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
