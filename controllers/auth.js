const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    let { name, email, mobile, password } = req.body;
    let errors = [];
    if (!name) {
      errors.push({ text: "Please add a name" });
    }
    const emailRegex = new RegExp("[^@]+@[^.]+..+");
    if (!email || !emailRegex.test(email)) {
      errors.push({ text: "Please add an valid email" });
    }
    if (!mobile) {
      errors.push({ text: "Please add a mobile number" });
    }
    if (!password) {
      errors.push({ text: "Please add a password" });
    }
    let [user] = await User.findAll({ where: { mobile } });
    if (user) {
      errors.push({ text: "User already exists" });
    }
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid details",
        error_code: "1308",
        data: { errors },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      user = await User.create({
        name,
        email,
        mobile,
        password,
      });
      const payload = {
        user: {
          mobile: user.mobile,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            status: true,
            message: "Data inserted successfully",
            data: { token },
          });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message, data: {} });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    let errors = [];
    if (!mobile) {
      errors.push({ text: "Please add a mobile number" });
    }
    if (!password) {
      errors.push({ text: "Please add a password" });
    }
    let [user] = await User.findAll({ where: { mobile } });
    if (!user) {
      errors.push({ text: "Invalid credentials" });
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.push({ text: "Invalid credentials" });
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid details",
        data: { errors },
      });
    } else {
      const payload = {
        user: {
          mobile: user.mobile,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            message: "-",
            data: { token },
          });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message, data: {} });
  }
};
