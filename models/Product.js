const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define("products", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.INTEGER,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
