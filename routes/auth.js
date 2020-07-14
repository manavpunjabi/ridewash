const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { load, register, login } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.use(auth).route("/").get(load);
module.exports = router;
