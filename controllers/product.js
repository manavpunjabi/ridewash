const Product = require("../models/Product");

exports.add = async (req, res, next) => {
  try {
    let { name, price, image, code } = req.body;
    let errors = [];
    if (!name) {
      errors.push({ text: "Please add a name" });
    }
    if (!price) {
      errors.push({ text: "Please add a price" });
    }
    if (!image) {
      errors.push({ text: "Please add an image" });
    }
    if (!code) {
      errors.push({ text: "Please add a code" });
    }
    let product = await Product.findAll({ code });

    if (product.products) {
      errors.push({ text: "Product already exists" });
    }
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid details",
        error_code: "1308",
        data: { errors },
      });
    } else {
      product = await Product.create({
        name,
        price,
        image,
        code,
      });
      res.status(201).json({
        status: true,
        message: "Data inserted successfully",
        data: { product },
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message, data: {} });
  }
};

exports.get = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      data: { products },
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message, data: {} });
  }
};
