const express = require("express");
const router = express.Router();
const { add, get } = require("../controllers/product");

router.route("/").get(get).post(add);
module.exports = router;
