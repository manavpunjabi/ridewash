const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.INTEGER,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
